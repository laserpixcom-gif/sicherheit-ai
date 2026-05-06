import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    // If Supabase is configured, save to DB
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('newsletter_subscribers')
        .upsert({ email, subscribed_at: new Date().toISOString() }, { onConflict: 'email' });

      if (error && error.code !== '23505') {
        console.error('Newsletter DB error:', error);
        return NextResponse.json({ error: 'Fehler beim Speichern.' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
