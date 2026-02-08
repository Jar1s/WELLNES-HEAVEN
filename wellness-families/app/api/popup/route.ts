import { NextResponse } from 'next/server';
import { getSupabasePublic } from '@/lib/supabase';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit(`popup:${ip}`, 60, 60_000);
    if (!limit.ok) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const supabase = getSupabasePublic();
    const { data, error } = await supabase
      .from('popups')
      .select('id,title,body,image_url,link_url,popup_size,enabled,start_at,end_at,updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ popup: null }, { status: 200 });
    }

    const nowMs = Date.now();
    const startMs = data.start_at ? Date.parse(data.start_at) : null;
    const endMs = data.end_at ? Date.parse(data.end_at) : null;

    const isWithinWindow =
      (startMs === null || startMs <= nowMs) &&
      (endMs === null || endMs >= nowMs);

    const popup = data.enabled && isWithinWindow ? data : null;
    return NextResponse.json({ popup }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
