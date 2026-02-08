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
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('popups')
      .select('id,title,body,image_url,link_url,popup_size,enabled,start_at,end_at,updated_at')
      .eq('enabled', true)
      .or(`start_at.is.null,start_at.lte.${now}`)
      .or(`end_at.is.null,end_at.gte.${now}`)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ popup: data || null }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
