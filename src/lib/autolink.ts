import { GLOSSARY_TERMS } from './glossary';

/**
 * Automatically links glossary terms in HTML content.
 * Rules:
 * - Only first occurrence of each term
 * - Skips content inside <a>, <code>, <pre>, <h1-h6> tags
 * - Matches full words only (word boundaries)
 * - Checks both full term name and abbreviation
 */
export function autolinkGlossary(html: string, locale: string = 'de'): string {
  // Build list of patterns to replace: sorted longest first to avoid partial matches
  const entries: { pattern: string; id: string; display: string }[] = [];

  for (const term of GLOSSARY_TERMS) {
    entries.push({ pattern: term.term, id: term.id, display: term.term });
    if (term.abbr) {
      entries.push({ pattern: term.abbr, id: term.id, display: term.abbr });
    }
  }

  // Sort by length descending — match "SQL-Injection" before "SQL"
  entries.sort((a, b) => b.pattern.length - a.pattern.length);

  // We need to:
  // 1. Split the HTML into "safe zones" (inside tags / code blocks) and "text zones"
  // 2. Only replace in text zones
  // 3. Track which term IDs have already been linked

  const linkedIds = new Set<string>();

  // Tokenize: split into tag tokens and text tokens
  // Regex matches: full tags, or text between tags
  const TOKEN_RE = /(<(?:pre|code)[^>]*>[\s\S]*?<\/(?:pre|code)>|<a[^>]*>[\s\S]*?<\/a>|<[^>]+>|[^<]+)/gi;

  const tokens = html.match(TOKEN_RE) ?? [];

  const result = tokens.map(token => {
    // If it starts with < it's a tag or protected block — skip
    if (token.startsWith('<')) return token;

    // It's a text node — apply replacements
    let text = token;

    for (const entry of entries) {
      if (linkedIds.has(entry.id)) continue;

      // Escape special regex chars in the pattern
      const escaped = entry.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Word boundary — use (?<!\w) and (?!\w) for unicode safety
      const re = new RegExp(`(?<![\\w-])(${escaped})(?![\\w-])`, 'i');

      if (re.test(text)) {
        linkedIds.add(entry.id);
        text = text.replace(re, (match) =>
          `<a href="/${locale}/glossar#term-${entry.id}" ` +
          `class="glossar-autolink" ` +
          `title="Glossar: ${entry.display}" ` +
          `style="color:var(--cyan);text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px;text-decoration-color:currentColor;cursor:help;"` +
          `>${match}</a>`
        );
      }
    }

    return text;
  });

  return result.join('');
}
