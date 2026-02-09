import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { getSupabaseServer } from '@/lib/supabase';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

const isAuthorized = (req: Request) => {
  const header = req.headers.get('x-admin-password') || '';
  const secret = process.env.ADMIN_PASSWORD || '';
  if (!header || !secret) return false;
  const headerBuf = Buffer.from(header);
  const secretBuf = Buffer.from(secret);
  if (headerBuf.length !== secretBuf.length) return false;
  return timingSafeEqual(headerBuf, secretBuf);
};

const getConfigError = () => {
  const missing: string[] = [];
  if (!process.env.ADMIN_PASSWORD) missing.push('ADMIN_PASSWORD');
  if (!process.env.SUPABASE_URL) missing.push('SUPABASE_URL');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');

  if (missing.length === 0) return null;
  return `Missing env: ${missing.join(', ')}`;
};

const getStoragePathFromPublicUrl = (url: string) => {
  const marker = '/storage/v1/object/public/popups/';
  const index = url.indexOf(marker);
  if (index === -1) return null;
  const path = url.slice(index + marker.length).trim();
  return path.length > 0 ? path : null;
};

const removePopupStorageFiles = async (
  supabase: ReturnType<typeof getSupabaseServer>,
  imageUrls: string[]
) => {
  const fromUrls = imageUrls
    .map((url) => getStoragePathFromPublicUrl(url))
    .filter((path): path is string => Boolean(path));

  const { data: listedFiles, error: listError } = await supabase.storage
    .from('popups')
    .list('popups', { limit: 1000, sortBy: { column: 'name', order: 'asc' } });

  if (listError) {
    throw new Error(`Storage list failed: ${listError.message}`);
  }

  const fromBucket = (listedFiles || [])
    .map((file) => file.name)
    .filter((name): name is string => typeof name === 'string' && name.length > 0)
    .map((name) => `popups/${name}`);

  const paths = Array.from(
    new Set(
      [...fromUrls, ...fromBucket]
    )
  );

  if (paths.length === 0) return;

  const { error } = await supabase.storage
    .from('popups')
    .remove(paths);

  if (error) {
    throw new Error(`Storage delete failed: ${error.message}`);
  }
};

export async function GET(req: Request) {
  const configError = getConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 500 });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`admin:popup:get:${ip}`, 20, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('popups')
      .select('id,title,body,image_url,link_url,popup_size,enabled,start_at,end_at,updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ popup: data || null }, { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/popup failed:', error);
    const message = error instanceof Error && error.message ? error.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const configError = getConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 500 });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`admin:popup:post:${ip}`, 10, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      id,
      title,
      body: text,
      image_url,
      link_url,
      popup_size,
      enabled,
      start_at,
      end_at,
    } = body || {};

    if (title && typeof title !== 'string') {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
    }
    if (text && typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }
    if (image_url && typeof image_url !== 'string') {
      return NextResponse.json({ error: 'Invalid image_url' }, { status: 400 });
    }
    if (link_url && typeof link_url !== 'string') {
      return NextResponse.json({ error: 'Invalid link_url' }, { status: 400 });
    }
    if (popup_size && typeof popup_size !== 'string') {
      return NextResponse.json({ error: 'Invalid popup_size' }, { status: 400 });
    }

    const supabase = getSupabaseServer();

    let resolvedImageUrl = image_url ? image_url.slice(0, 500) : null;
    if (!resolvedImageUrl && id) {
      const { data: existing } = await supabase
        .from('popups')
        .select('image_url')
        .eq('id', id)
        .maybeSingle();
      if (existing?.image_url) {
        resolvedImageUrl = existing.image_url;
      }
    }

    const payload = {
      title: title ? title.slice(0, 120) : null,
      body: text ? text.slice(0, 500) : null,
      image_url: resolvedImageUrl,
      link_url: link_url ? link_url.slice(0, 500) : null,
      popup_size: popup_size === 'lg' || popup_size === 'md' || popup_size === 'sm' ? popup_size : 'md',
      enabled: Boolean(enabled),
      start_at: start_at || null,
      end_at: end_at || null,
    };

    let data;
    let error;

    if (id) {
      ({ data, error } = await supabase.from('popups').update(payload).eq('id', id).select().single());
    } else {
      const { data: existing } = await supabase
        .from('popups')
        .select('id')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existing?.id) {
        ({ data, error } = await supabase
          .from('popups')
          .update(payload)
          .eq('id', existing.id)
          .select()
          .single());
      } else {
        ({ data, error } = await supabase.from('popups').insert(payload).select().single());
      }
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ popup: data }, { status: 200 });
  } catch (error) {
    console.error('POST /api/admin/popup failed:', error);
    const message = error instanceof Error && error.message ? error.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const configError = getConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 500 });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`admin:popup:delete:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServer();
    const { data: rows, error: readError } = await supabase
      .from('popups')
      .select('id,image_url');

    if (readError) {
      return NextResponse.json({ error: readError.message }, { status: 500 });
    }

    const ids = (rows || [])
      .map((row) => row.id)
      .filter((id): id is string => typeof id === 'string' && id.length > 0);

    const imageUrls = (rows || [])
      .map((row) => row.image_url)
      .filter((url): url is string => typeof url === 'string' && url.length > 0);

    await removePopupStorageFiles(supabase, imageUrls);

    if (ids.length === 0) {
      return NextResponse.json({ deleted: 0 }, { status: 200 });
    }

    const { error: deleteError } = await supabase
      .from('popups')
      .delete()
      .in('id', ids);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ deleted: ids.length }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/popup failed:', error);
    const message = error instanceof Error && error.message ? error.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
