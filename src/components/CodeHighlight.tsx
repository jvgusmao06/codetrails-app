"use client";

import React from "react";

// ponytail: lightweight client-side tokenizer (zero external deps, works offline in Capacitor)
const TOKEN_REGEX =
  /(\/\/.*$|#.*$|--.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:import|from|export|default|const|let|var|function|return|async|await|if|else|for|while|switch|case|break|try|catch|finally|throw|new|class|interface|type|extends|implements|public|private|protected|static|void|record|def|elif|with|as|in|is|not|and|or|None|True|False|package|func|go|chan|defer|range|struct|map|fn|mut|pub|impl|match|use|mod|enum|Some|None|Ok|Err|SELECT|FROM|WHERE|JOIN|INNER|LEFT|ON|GROUP|BY|HAVING|ORDER|ASC|DESC|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|BEGIN|COMMIT|ROLLBACK|PRIMARY|KEY|NULL|NOT|AND|OR)\b|\b\d+(?:\.\d+)?\b|@[A-Za-z_]\w*|#\[[^\]]+\])/gm;

const KEYWORDS = new Set([
  "import", "from", "export", "default", "const", "let", "var", "function",
  "return", "async", "await", "if", "else", "for", "while", "switch", "case",
  "break", "try", "catch", "finally", "throw", "new", "class", "interface",
  "type", "extends", "implements", "public", "private", "protected", "static",
  "void", "record", "def", "elif", "with", "as", "in", "is", "not", "and", "or",
  "package", "func", "go", "chan", "defer", "range", "struct", "map", "fn",
  "mut", "pub", "impl", "match", "use", "mod", "enum", "SELECT", "FROM",
  "WHERE", "JOIN", "INNER", "LEFT", "ON", "GROUP", "BY", "HAVING", "ORDER",
  "ASC", "DESC", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE",
  "CREATE", "TABLE", "INDEX", "BEGIN", "COMMIT", "ROLLBACK", "PRIMARY", "KEY",
  "NOT", "AND", "OR",
]);

const LITERALS = new Set(["None", "True", "False", "Some", "Ok", "Err", "NULL"]);

export function CodeHighlight({
  code,
  className = "",
}: {
  code: string;
  className?: string;
}) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of code.matchAll(TOKEN_REGEX)) {
    const idx = match.index ?? 0;
    if (idx > lastIndex) {
      parts.push(code.slice(lastIndex, idx));
    }

    const token = match[0];
    let cls = "text-zinc-200";

    if (token.startsWith("//") || token.startsWith("# ") || token.startsWith("--")) {
      cls = "text-zinc-500 italic";
    } else if (
      token.startsWith('"') ||
      token.startsWith("'") ||
      token.startsWith("`")
    ) {
      cls = "text-emerald-300";
    } else if (token.startsWith("@") || token.startsWith("#[")) {
      cls = "text-amber-300";
    } else if (KEYWORDS.has(token)) {
      cls = "text-indigo-300 font-semibold";
    } else if (LITERALS.has(token)) {
      cls = "text-cyan-300";
    } else if (/^\d/.test(token)) {
      cls = "text-amber-300";
    }

    parts.push(
      <span key={idx} className={cls}>
        {token}
      </span>
    );
    lastIndex = idx + token.length;
  }

  if (lastIndex < code.length) {
    parts.push(code.slice(lastIndex));
  }

  return <span className={className}>{parts}</span>;
}
