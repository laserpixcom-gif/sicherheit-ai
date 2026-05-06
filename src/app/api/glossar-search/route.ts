import { NextRequest, NextResponse } from 'next/server';
import { GLOSSARY_TERMS } from '@/lib/glossary';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.toLowerCase().trim() ?? '';

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = GLOSSARY_TERMS.filter(t =>
    t.term.toLowerCase().includes(q) ||
    t.abbr?.toLowerCase().includes(q) ||
    t.def.toLowerCase().includes(q)
  ).map(t => ({
    id: t.id,
    term: t.term,
    abbr: t.abbr,
    def: t.def,
    category: t.category,
  }));

  return NextResponse.json({ results }, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
  });
}
