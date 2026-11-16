"use client";

import { useMemo, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { go } from "@codemirror/lang-go";
import { sql } from "@codemirror/lang-sql";
import { css } from "@codemirror/lang-css";

function getLanguageExtension(languageId?: string) {
  switch (languageId) {
    case "python-basics":
      return python();
    case "rust-systems":
      return rust();
    case "c-cpp-systems":
      return cpp();
    case "java-basics":
      return java();
    case "golang-cloud":
      return go();
    case "sql-databases":
      return sql();
    case "css":
      return css();
    case "typescript-javascript":
    default:
      return javascript({ typescript: true, jsx: true });
  }
}

const mobileTouchTheme = EditorView.theme({
  "&": {
    fontSize: "14px",
    backgroundColor: "#020617", // slate-950
  },
  ".cm-scroller": {
    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
    lineHeight: "1.6",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  ".cm-gutters": {
    backgroundColor: "#020617",
    borderRight: "1px solid #1e293b",
    color: "#475569",
    minWidth: "36px",
  },
  ".cm-content": {
    caretColor: "#34d399",
    paddingRight: "12px",
  },
  "&.cm-focused": {
    outline: "none",
  },
});

const MOBILE_SYMBOLS: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Tab", value: "  " },
  { label: "(", value: "(" },
  { label: ")", value: ")" },
  { label: "{", value: "{" },
  { label: "}", value: "}" },
  { label: "[", value: "[" },
  { label: "]", value: "]" },
  { label: "=", value: "=" },
  { label: "=>", value: " => " },
  { label: ";", value: ";" },
  { label: '"', value: '"' },
  { label: "'", value: "'" },
  { label: ":", value: ":" },
  { label: ".", value: "." },
];

export function CodeEditor({
  value,
  onChange,
  languageId,
  disabled = false,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  languageId?: string;
  disabled?: boolean;
  placeholder?: string;
}) {
  const viewRef = useRef<EditorView | null>(null);

  const extensions = useMemo(
    () => [getLanguageExtension(languageId), EditorView.lineWrapping, mobileTouchTheme],
    [languageId]
  );

  function insertSnippet(snippet: string) {
    const view = viewRef.current;
    if (!view || disabled) return;
    view.dispatch(view.state.replaceSelection(snippet));
    view.focus();
  }

  return (
    <div>
      <CodeMirror
        value={value}
        onChange={onChange}
        onCreateEditor={(view) => {
          viewRef.current = view;
        }}
        theme={oneDark}
        extensions={extensions}
        editable={!disabled}
        readOnly={disabled}
        placeholder={placeholder}
        minHeight="170px"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: false,
          autocompletion: true,
          closeBrackets: true,
          bracketMatching: true,
          indentOnInput: true,
          tabSize: 2,
        }}
      />

      {!disabled && (
        <div
          role="toolbar"
          aria-label="Símbolos rápidos de código"
          className="md:hidden flex items-center gap-1.5 px-2.5 py-2 border-t border-border/80 bg-surface overflow-x-auto no-scrollbar"
        >
          {MOBILE_SYMBOLS.map((sym) => (
            <button
              key={sym.label}
              type="button"
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => insertSnippet(sym.value)}
              className="h-8 min-w-[34px] px-2.5 rounded-lg bg-surface-card border border-border font-mono text-xs text-slate-200 active:bg-emerald-500/20 active:border-accent/60 shrink-0 transition cursor-pointer"
            >
              {sym.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
