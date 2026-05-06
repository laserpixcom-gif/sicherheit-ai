import { NextRequest, NextResponse } from 'next/server';

// Server-side HTTP security header checker
// Browser can't do cross-origin HEAD requests — we proxy here
// Based on OWASP Secure Headers Project

export const runtime = 'edge';

const SECURITY_HEADERS = [
  {
    key: 'content-security-policy',
    label: 'Content-Security-Policy',
    description: 'Verhindert XSS und Daten-Injection-Angriffe',
    critical: true,
  },
  {
    key: 'strict-transport-security',
    label: 'Strict-Transport-Security',
    description: 'Erzwingt HTTPS-Verbindungen (HSTS)',
    critical: true,
  },
  {
    key: 'x-frame-options',
    label: 'X-Frame-Options',
    description: 'Schützt vor Clickjacking-Angriffen',
    critical: true,
  },
  {
    key: 'x-content-type-options',
    label: 'X-Content-Type-Options',
    description: 'Verhindert MIME-Type-Sniffing',
    critical: false,
  },
  {
    key: 'referrer-policy',
    label: 'Referrer-Policy',
    description: 'Kontrolliert welche Referrer-Infos weitergegeben werden',
    critical: false,
  },
  {
    key: 'permissions-policy',
    label: 'Permissions-Policy',
    description: 'Schränkt Browser-Features (Kamera, Mikrofon, GPS) ein',
    critical: false,
  },
];

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get('url');

  if (!rawUrl) {
    return NextResponse.json({ error: 'URL fehlt' }, { status: 400 });
  }

  // Normalize: add https:// if missing
  let targetUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  // Basic validation — only allow http/https
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
  } catch {
    return NextResponse.json({ error: 'Ungültige URL' }, { status: 400 });
  }

  // Block internal addresses (SSRF protection)
  const hostname = parsedUrl.hostname.toLowerCase();
  const blocked = ['localhost', '127.0.0.1', '0.0.0.0', '::1', '169.254', '10.', '192.168.', '172.'];
  if (blocked.some((b) => hostname === b || hostname.startsWith(b))) {
    return NextResponse.json({ error: 'Interne Adressen nicht erlaubt' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(parsedUrl.origin, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'sicherheit.ai/1.0 Security Header Check' },
    });

    clearTimeout(timeout);

    const responseHeaders: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      responseHeaders[key.toLowerCase()] = value;
    });

    const results = SECURITY_HEADERS.map((h) => {
      const present = h.key in responseHeaders;
      const value = responseHeaders[h.key] ?? null;
      return {
        key: h.key,
        label: h.label,
        description: h.description,
        critical: h.critical,
        present,
        value,
      };
    });

    const presentCount = results.filter((r) => r.present).length;
    const criticalPresent = results.filter((r) => r.critical && r.present).length;
    const criticalTotal = results.filter((r) => r.critical).length;

    // Score: 0-100
    const score = Math.round(
      (criticalPresent / criticalTotal) * 70 + (presentCount / SECURITY_HEADERS.length) * 30
    );

    let grade: string;
    if (score >= 90) grade = 'A+';
    else if (score >= 75) grade = 'A';
    else if (score >= 60) grade = 'B';
    else if (score >= 45) grade = 'C';
    else if (score >= 30) grade = 'D';
    else grade = 'F';

    // Flat map for easy lookup in the client (header-name → value | null)
    const headersMap: Record<string, string | null> = {};
    SECURITY_HEADERS.forEach((h) => {
      headersMap[h.key] = responseHeaders[h.key] ?? null;
    });

    return NextResponse.json(
      {
        url: parsedUrl.origin,
        status: res.status,
        score,
        grade,
        headers: headersMap,
        details: results,
        checkedAt: new Date().toISOString(),
      },
      { headers: { 'Cache-Control': 'public, max-age=300' } }
    );
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return NextResponse.json({ error: 'Timeout — Server antwortet nicht' }, { status: 504 });
    }
    console.error('Header check error:', err);
    return NextResponse.json({ error: 'Verbindung fehlgeschlagen' }, { status: 502 });
  }
}
