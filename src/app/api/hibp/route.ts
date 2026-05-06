import { NextRequest, NextResponse } from 'next/server';

// HIBP free API — no key required for basic breach lookup by email
// Docs: https://haveibeenpwned.com/API/v3
// Rate limit: 1 req / 1500ms per user agent

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
      {
        headers: {
          'User-Agent': 'sicherheit.ai/1.0',
          'hibp-api-key': process.env.HIBP_API_KEY ?? '',
        },
      }
    );

    if (res.status === 404) {
      // Not found = no breaches
      return NextResponse.json({ breaches: [] });
    }

    if (res.status === 401) {
      // No API key — fallback response
      return NextResponse.json(
        { error: 'HIBP API key required for email lookup', needsKey: true },
        { status: 402 }
      );
    }

    if (res.status === 429) {
      return NextResponse.json({ error: 'Rate limit — bitte kurz warten' }, { status: 429 });
    }

    if (!res.ok) {
      throw new Error(`HIBP ${res.status}`);
    }

    const data = await res.json();

    // Map to minimal breach objects
    const breaches = (data as HibpBreach[]).map((b) => ({
      name: b.Name,
      domain: b.Domain,
      date: b.BreachDate,
      count: b.PwnCount,
      dataClasses: b.DataClasses,
      description: b.Description?.replace(/<[^>]*>/g, '').slice(0, 200) ?? '',
    }));

    return NextResponse.json(
      { breaches },
      { headers: { 'Cache-Control': 'private, max-age=300' } }
    );
  } catch (err) {
    console.error('HIBP error:', err);
    return NextResponse.json({ error: 'Lookup fehlgeschlagen' }, { status: 500 });
  }
}

interface HibpBreach {
  Name: string;
  Domain: string;
  BreachDate: string;
  PwnCount: number;
  DataClasses: string[];
  Description?: string;
}
