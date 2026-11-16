const HASH_COMMENT_LANGUAGES = new Set([
  "python-basics",
  "algorithms-data-structures",
  "git-github-workflow",
  "cmake-build-system",
]);

const RUST_CHAR_LITERAL_RE =
  /^'(\\(?:u\{[0-9a-fA-F]+\}|x[0-9a-fA-F]{2}|.)|[^'\\\r\n])'/;

/**
 * Removes language-appropriate comments from user-written code while
 * preserving string/char literals and Rust lifetimes so commented code
 * cannot satisfy `write_code` token checks.
 */
export function stripCodeComments(
  code: string,
  languageId?: string,
  trackId?: string
): string {
  const isHashLang =
    trackId === "redis-caching" ||
    (languageId !== undefined && HASH_COMMENT_LANGUAGES.has(languageId));
  const isSqlLang =
    languageId === "sql-databases" && trackId !== "redis-caching";
  const isRustOrCpp =
    languageId === "rust-systems" || languageId === "c-cpp-systems";
  const allowSlash = !isHashLang && !isSqlLang;
  const allowBlock = !isHashLang;
  const allowHtml =
    trackId === "blazor-csharp" || languageId === "typescript-javascript";

  let out = "";
  let i = 0;

  while (i < code.length) {
    const ch = code[i];
    const next = code[i + 1];

    // Triple-quoted strings in Python
    if (
      isHashLang &&
      (code.startsWith('"""', i) || code.startsWith("'''", i))
    ) {
      const quote = code.slice(i, i + 3);
      const end = code.indexOf(quote, i + 3);
      if (end === -1) {
        out += code.slice(i);
        break;
      }
      out += code.slice(i, end + 3);
      i = end + 3;
      continue;
    }

    // Double-quoted or template string literals
    if (ch === '"' || (ch === "`" && !isSqlLang)) {
      const quote = ch;
      out += ch;
      i++;
      while (i < code.length) {
        const c = code[i];
        out += c;
        if (c === "\\" && i + 1 < code.length) {
          i++;
          out += code[i];
          i++;
          continue;
        }
        i++;
        if (c === quote) break;
      }
      continue;
    }

    // Single-quoted char/string literals (preserve Rust lifetimes like 'a)
    if (ch === "'") {
      if (isRustOrCpp) {
        const match = code.slice(i).match(RUST_CHAR_LITERAL_RE);
        if (match) {
          out += match[0];
          i += match[0].length;
          continue;
        }
        out += ch;
        i++;
        continue;
      }

      out += ch;
      i++;
      while (i < code.length) {
        const c = code[i];
        out += c;
        if (c === "\\" && i + 1 < code.length) {
          i++;
          out += code[i];
          i++;
          continue;
        }
        i++;
        if (c === "'") break;
      }
      continue;
    }

    // Line comments
    if (
      (allowSlash && ch === "/" && next === "/") ||
      (isHashLang && ch === "#") ||
      (isSqlLang && ch === "-" && next === "-")
    ) {
      while (i < code.length && code[i] !== "\n") {
        i++;
      }
      continue;
    }

    // Block comments /* ... */
    if (allowBlock && ch === "/" && next === "*") {
      const end = code.indexOf("*/", i + 2);
      if (end === -1) break;
      out += " ";
      i = end + 2;
      continue;
    }

    // HTML / Razor / JSX comments <!-- ... -->
    if (allowHtml && code.startsWith("<!--", i)) {
      const end = code.indexOf("-->", i + 4);
      if (end === -1) break;
      out += " ";
      i = end + 3;
      continue;
    }

    out += ch;
    i++;
  }

  return out;
}

export function hasWriteCodeContent(
  code: string,
  languageId?: string,
  trackId?: string
): boolean {
  return stripCodeComments(code, languageId, trackId).trim().length > 0;
}

export function matchRequiredTokens(
  code: string,
  requiredTokens: string[],
  languageId?: string,
  trackId?: string
): { passed: boolean; matched: boolean[] } {
  const normalized = stripCodeComments(code, languageId, trackId).toLowerCase();
  const matched = requiredTokens.map((tok) =>
    normalized.includes(tok.toLowerCase())
  );
  return {
    passed: matched.every(Boolean),
    matched,
  };
}
