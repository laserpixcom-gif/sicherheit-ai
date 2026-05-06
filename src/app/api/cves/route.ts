import { NextResponse } from 'next/server';

// NVD API v2 — kostenlos, kein API-Key für ~5 req/30s
// Doku: https://nvd.nist.gov/developers/vulnerabilities
const NVD_API = 'https://services.nvd.nist.gov/rest/json/cves/2.0';

export const revalidate = 1800; // 30 Minuten Cache

export async function GET() {
  try {
    // Kritische CVEs der letzten 30 Tage, absteigend nach CVSS sortiert
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .replace(/\.\d{3}Z$/, '.000Z');

    const url = new URL(NVD_API);
    url.searchParams.set('pubStartDate', thirtyDaysAgo);
    url.searchParams.set('pubEndDate', new Date().toISOString().replace(/\.\d{3}Z$/, '.000Z'));
    url.searchParams.set('cvssV3Severity', 'CRITICAL');
    url.searchParams.set('resultsPerPage', '10');

    const res = await fetch(url.toString(), {
      headers: { 'User-Agent': 'sicherheit.ai/1.0 (https://sicherheit.ai)' },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      throw new Error(`NVD API ${res.status}`);
    }

    const json = await res.json();

    const cves = (json.vulnerabilities ?? []).map((v: NvdCve) => {
      const cve = v.cve;
      const metrics = cve.metrics?.cvssMetricV31?.[0] ?? cve.metrics?.cvssMetricV30?.[0];
      const score = metrics?.cvssData?.baseScore ?? null;
      const severity = metrics?.cvssData?.baseSeverity ?? 'UNKNOWN';
      const description =
        cve.descriptions?.find((d: { lang: string; value: string }) => d.lang === 'en')?.value ??
        cve.descriptions?.[0]?.value ??
        'Keine Beschreibung verfügbar.';
      const refs = cve.references?.slice(0, 2).map((r: { url: string }) => r.url) ?? [];
      const published = cve.published ?? '';
      const modified = cve.lastModified ?? '';

      return {
        id: cve.id,
        score,
        severity,
        description: description.slice(0, 280) + (description.length > 280 ? '…' : ''),
        published,
        modified,
        refs,
      };
    });

    // Sort by score descending
    cves.sort((a: CveItem, b: CveItem) => (b.score ?? 0) - (a.score ?? 0));

    return NextResponse.json(
      { cves, fetchedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (err) {
    console.error('CVE fetch error:', err);
    // Fallback: bekannte echte kritische CVEs als statischer Notfall-Datensatz
    return NextResponse.json(
      {
        cves: FALLBACK_CVES,
        fetchedAt: new Date().toISOString(),
        fallback: true,
      },
      {
        headers: { 'Cache-Control': 'public, s-maxage=300' },
      }
    );
  }
}

// Typen
interface NvdCve {
  cve: {
    id: string;
    published: string;
    lastModified: string;
    descriptions: { lang: string; value: string }[];
    metrics?: {
      cvssMetricV31?: { cvssData: { baseScore: number; baseSeverity: string } }[];
      cvssMetricV30?: { cvssData: { baseScore: number; baseSeverity: string } }[];
    };
    references: { url: string }[];
  };
}

interface CveItem {
  id: string;
  score: number | null;
  severity: string;
}

// Echte, dokumentierte kritische CVEs als Fallback (Stand 2024)
const FALLBACK_CVES = [
  {
    id: 'CVE-2024-3400',
    score: 10.0,
    severity: 'CRITICAL',
    description: 'Command injection vulnerability in Palo Alto Networks PAN-OS GlobalProtect. Unauthenticated remote attackers can execute arbitrary code. Actively exploited in the wild.',
    published: '2024-04-12T00:00:00.000Z',
    refs: ['https://security.paloaltonetworks.com/CVE-2024-3400'],
  },
  {
    id: 'CVE-2024-21762',
    score: 9.8,
    severity: 'CRITICAL',
    description: 'Fortinet FortiOS out-of-bounds write in SSL VPN. Unauthenticated remote code execution. CISA added to KEV catalog.',
    published: '2024-02-08T00:00:00.000Z',
    refs: ['https://www.fortiguard.com/psirt/FG-IR-24-015'],
  },
  {
    id: 'CVE-2024-1709',
    score: 10.0,
    severity: 'CRITICAL',
    description: 'ConnectWise ScreenConnect authentication bypass vulnerability. Mass exploitation observed within 48 hours of disclosure. Allows full system takeover.',
    published: '2024-02-19T00:00:00.000Z',
    refs: ['https://nvd.nist.gov/vuln/detail/CVE-2024-1709'],
  },
  {
    id: 'CVE-2023-34362',
    score: 9.8,
    severity: 'CRITICAL',
    description: 'SQL injection in Progress MOVEit Transfer. Exploited as Zero-Day by Cl0p ransomware group affecting 2,600+ organizations worldwide.',
    published: '2023-06-02T00:00:00.000Z',
    refs: ['https://nvd.nist.gov/vuln/detail/CVE-2023-34362'],
  },
  {
    id: 'CVE-2021-44228',
    score: 10.0,
    severity: 'CRITICAL',
    description: 'Log4Shell — Remote code execution in Apache Log4j 2. JNDI lookup injection affects millions of Java applications globally. BSI Warnstufe 4.',
    published: '2021-12-10T00:00:00.000Z',
    refs: ['https://nvd.nist.gov/vuln/detail/CVE-2021-44228'],
  },
];
