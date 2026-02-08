import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import sharp from 'sharp';
import { getSupabaseServer } from '@/lib/supabase';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const isAuthorized = (req: Request) => {
  const header = req.headers.get('x-admin-password') || '';
  const secret = process.env.ADMIN_PASSWORD || '';
  if (!header || !secret) return false;
  const headerBuf = Buffer.from(header);
  const secretBuf = Buffer.from(secret);
  if (headerBuf.length !== secretBuf.length) return false;
  return timingSafeEqual(headerBuf, secretBuf);
};

const ensureBucket = async (supabase: ReturnType<typeof getSupabaseServer>) => {
  const { data, error } = await supabase.storage.getBucket('popups');
  if (data && !error) {
    return;
  }
  await supabase.storage.createBucket('popups', { public: true });
};

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`admin:upload:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    const processed = await sharp(inputBuffer)
      .resize({ width: 520, height: 900, fit: 'inside' })
      .jpeg({ quality: 82 })
      .toBuffer();

    const supabase = getSupabaseServer();
    await ensureBucket(supabase);

    const filename = `popup-${Date.now()}.jpg`;
    const path = `popups/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from('popups')
      .upload(path, processed, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data } = supabase.storage.from('popups').getPublicUrl(path);

    return NextResponse.json({ url: data.publicUrl }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
