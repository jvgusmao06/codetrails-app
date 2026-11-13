"use client";

import { useState, useMemo } from "react";
import {
  GitPullRequest,
  Copy,
  Check,
  Terminal,
  FileJson,
  ShieldCheck,
  Download,
  FolderPlus,
  Wrench,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import type { LoadedTrack } from "@/lib/schema";
import { LessonSchema, TrackMetaSchema } from "@/lib/schema";
import { useUserProgress } from "@/lib/progress";
import { localizeTracks } from "@/lib/track-i18n";

type StudioMode = "improve" | "new-track";
type PracticeType =
  | "fill_in_blank"
  | "multiple_choice"
  | "order_code"
  | "spot_the_bug"
  | "write_code";

export function TrackStudio({ tracks }: { tracks: LoadedTrack[] }) {
  const { progress, t } = useUserProgress();
  const localizedTracks = localizeTracks(tracks, progress.locale);

  const baseLanguages = localizedTracks.filter(
    (tr) => tr.category === "language" || tr.category === "concept"
  );

  const [mode, setMode] = useState<StudioMode>("improve");
  const [selectedTrackId, setSelectedTrackId] = useState(
    localizedTracks[0]?.id ?? "python-basics"
  );

  const selectedTrack =
    localizedTracks.find((tr) => tr.id === selectedTrackId) ??
    localizedTracks[0];

  const [selectedModuleId, setSelectedModuleId] = useState(
    selectedTrack?.modules[0]?.id ?? "mod-01"
  );

  // Lesson fields
  const [lessonFileSlug, setLessonFileSlug] = useState("lesson-nova-01");
  const [lessonId, setLessonId] = useState("nova-licao-01");
  const [title, setTitle] = useState("Closures em JavaScript");
  const [theoryTitle, setTheoryTitle] = useState("O que é uma Closure?");
  const [theoryContent, setTheoryContent] = useState(
    "Uma closure ocorre quando uma função interna lembra do escopo léxico da função externa mesmo depois que ela retornou."
  );
  const [codeExample, setCodeExample] = useState(
    "const incrementar = criarContador();\nconsole.log(incrementar()); // 1"
  );
  const [takeaway, setTakeaway] = useState(
    "Funções internas preservam acesso às variáveis da função pai."
  );

  // Practical step selector
  const [practiceType, setPracticeType] =
    useState<PracticeType>("fill_in_blank");
  const [prompt, setPrompt] = useState(
    "Complete a função interna para incrementar a variável do escopo externo:"
  );
  const [codeTemplate, setCodeTemplate] = useState(
    "function criarContador() {\n  let total = 0;\n  return function() {\n    return ++{{blank}};\n  };\n}"
  );
  const [answer, setAnswer] = useState("total");
  const [mcOptionsRaw, setMcOptionsRaw] = useState(
    "Preserva o escopo léxico\nApaga a variável imediatamente\nGera erro de sintaxe"
  );
  const [mcCorrectIdx, setMcCorrectIdx] = useState(0);
  const [orderBlocksRaw, setOrderBlocksRaw] = useState(
    "function criar() {\n  let n = 0;\n  return () => ++n;\n}"
  );
  const [bugLinesRaw, setBugLinesRaw] = useState(
    "const taxa = 10;\ntaxa = 20;\nconsole.log(taxa);"
  );
  const [bugLineIdx, setBugLineIdx] = useState(1);
  const [sampleSolution, setSampleSolution] = useState(
    "function somar(a, b) {\n  return a + b;\n}"
  );
  const [requiredTokensRaw, setRequiredTokensRaw] = useState(
    "function, return, +"
  );
  const [explanation, setExplanation] = useState(
    "Explicação didática exibida após o usuário verificar a resposta."
  );

  // New track fields
  const [newTrackId, setNewTrackId] = useState("docker-containers");
  const [newTrackTitle, setNewTrackTitle] = useState("Docker & Containers");
  const [newTrackDesc, setNewTrackDesc] = useState(
    "Empacote aplicações de forma reprodutível com Dockerfile e Docker Compose."
  );
  const [newTrackCategory, setNewTrackCategory] = useState<
    "language" | "framework" | "library" | "tool" | "concept"
  >("tool");
  const [newTrackLangId, setNewTrackLangId] = useState("git-github-workflow");
  const [newTrackAuthor, setNewTrackAuthor] = useState("@seu-github");

  const [copied, setCopied] = useState(false);

  const activeModule =
    selectedTrack?.modules.find((m) => m.id === selectedModuleId) ??
    selectedTrack?.modules[0];

  // Build lesson object
  const lessonObj = useMemo(() => {
    const practicalStep =
      practiceType === "fill_in_blank"
        ? {
            type: "fill_in_blank" as const,
            prompt,
            codeTemplate,
            blanks: [{ answer, placeholder: "código" }],
            options: [answer, "null", "undefined", "error"],
            explanation,
          }
        : practiceType === "multiple_choice"
        ? {
            type: "multiple_choice" as const,
            prompt,
            options: mcOptionsRaw
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean),
            correctIndex: mcCorrectIdx,
            explanation,
          }
        : practiceType === "order_code"
        ? (() => {
            const blocks = orderBlocksRaw
              .split("\n")
              .map((s) => s.trimEnd())
              .filter(Boolean);
            return {
              type: "order_code" as const,
              prompt,
              blocks,
              correctOrder: blocks.map((_, i) => i),
              explanation,
            };
          })()
        : practiceType === "spot_the_bug"
        ? {
            type: "spot_the_bug" as const,
            prompt,
            lines: bugLinesRaw.split("\n"),
            buggyLineIndex: bugLineIdx,
            explanation,
          }
        : {
            type: "write_code" as const,
            prompt,
            requiredTokens: requiredTokensRaw
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
            sampleSolution,
            explanation,
          };

    return {
      id: lessonId,
      title,
      xp: 25,
      steps: [
        {
          type: "theory" as const,
          title: theoryTitle,
          content: theoryContent,
          codeExample,
          keyTakeaways: takeaway.trim() ? [takeaway.trim()] : [],
        },
        practicalStep,
      ],
    };
  }, [
    lessonId,
    title,
    theoryTitle,
    theoryContent,
    codeExample,
    takeaway,
    practiceType,
    prompt,
    codeTemplate,
    answer,
    mcOptionsRaw,
    mcCorrectIdx,
    orderBlocksRaw,
    bugLinesRaw,
    bugLineIdx,
    sampleSolution,
    requiredTokensRaw,
    explanation,
  ]);

  const newTrackObj = useMemo(
    () => ({
      id: newTrackId,
      title: newTrackTitle,
      description: newTrackDesc,
      category: newTrackCategory,
      ...(newTrackCategory !== "language" && newTrackCategory !== "concept"
        ? { languageId: newTrackLangId, prerequisites: [newTrackLangId] }
        : {}),
      color: "#10B981",
      icon: "📦",
      author: newTrackAuthor,
      modules: [
        {
          id: "mod-01-fundamentos",
          title: "Módulo 1: Primeiros Passos",
          description: "Conceitos essenciais e prática guiada.",
          lessons: [lessonFileSlug],
        },
      ],
    }),
    [
      newTrackId,
      newTrackTitle,
      newTrackDesc,
      newTrackCategory,
      newTrackLangId,
      newTrackAuthor,
      lessonFileSlug,
    ]
  );

  const validation = useMemo(() => {
    if (mode === "improve") {
      const res = LessonSchema.safeParse(lessonObj);
      if (!res.success) {
        return {
          ok: false,
          error: res.error.issues[0]?.message ?? "Erro de schema",
        };
      }
      if (practiceType === "fill_in_blank") {
        const placeholders = (codeTemplate.match(/\{\{blank\}\}/g) ?? []).length;
        if (placeholders !== 1) {
          return {
            ok: false,
            error: `Template tem ${placeholders} {{blank}}, mas deve ter 1.`,
          };
        }
      }
      return { ok: true, error: null };
    } else {
      const res = TrackMetaSchema.safeParse(newTrackObj);
      return res.success
        ? { ok: true, error: null }
        : {
            ok: false,
            error: res.error.issues[0]?.message ?? "Erro no track.json",
          };
    }
  }, [mode, lessonObj, newTrackObj, practiceType, codeTemplate]);

  const targetFilePath =
    mode === "improve"
      ? `content/tracks/${selectedTrack?.id}/${activeModule?.id}/${lessonFileSlug}.json`
      : `content/tracks/${newTrackId}/track.json`;

  const outputJson = JSON.stringify(
    mode === "improve" ? lessonObj : newTrackObj,
    null,
    2
  );

  function copyJson() {
    navigator.clipboard.writeText(outputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadJson() {
    const blob = new Blob([outputJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      mode === "improve" ? `${lessonFileSlug}.json` : "track.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 font-mono text-xs font-semibold">
          <GitPullRequest className="w-4 h-4" /> {t.community.badge}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {t.community.title}
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          {t.community.description}
        </p>
      </div>

      {/* 3-Step Workflow */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5">
          <FileJson className="w-5 h-5 text-sky-400" />
          <h2 className="font-bold text-white text-sm">
            {t.community.step1Title}
          </h2>
          <p className="text-xs text-slate-400">{t.community.step1Desc}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5">
          <Terminal className="w-5 h-5 text-amber-400" />
          <h2 className="font-bold text-white text-sm">
            {t.community.step2Title}
          </h2>
          <p className="text-xs text-slate-400">{t.community.step2Desc}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="font-bold text-white text-sm">
            {t.community.step3Title}
          </h2>
          <p className="text-xs text-slate-400">{t.community.step3Desc}</p>
        </div>
      </div>

      {/* Studio Mode Switcher */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">
              {t.community.generatorTitle}
            </h2>
            <p className="text-xs text-slate-400">
              Escolha se deseja adicionar uma lição em uma trilha existente ou criar uma nova trilha.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start">
            <button
              type="button"
              onClick={() => setMode("improve")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5 transition cursor-pointer ${
                mode === "improve"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Wrench className="w-3.5 h-3.5" /> Melhorar Trilha
            </button>
            <button
              type="button"
              onClick={() => setMode("new-track")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5 transition cursor-pointer ${
                mode === "new-track"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FolderPlus className="w-3.5 h-3.5" /> Nova Trilha
            </button>
          </div>
        </div>

        {mode === "improve" ? (
          <div className="space-y-4">
            {/* Existing Track & Module Picker */}
            <div className="grid sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div>
                <label className="block font-mono text-[11px] text-emerald-400 mb-1">
                  1. Trilha Existente
                </label>
                <select
                  value={selectedTrackId}
                  onChange={(e) => {
                    const nextId = e.target.value;
                    setSelectedTrackId(nextId);
                    const nextTr = localizedTracks.find((x) => x.id === nextId);
                    if (nextTr?.modules[0]) {
                      setSelectedModuleId(nextTr.modules[0].id);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  {localizedTracks.map((tr) => (
                    <option key={tr.id} value={tr.id}>
                      {tr.icon} {tr.title} ({tr.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-emerald-400 mb-1">
                  2. Módulo Alvo
                </label>
                <select
                  value={activeModule?.id ?? ""}
                  onChange={(e) => setSelectedModuleId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  {selectedTrack?.modules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-emerald-400 mb-1">
                  3. Nome do Arquivo (.json)
                </label>
                <input
                  type="text"
                  value={lessonFileSlug}
                  onChange={(e) =>
                    setLessonFileSlug(
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Lesson Title + Theory */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1">
                  ID da Lição
                </label>
                <input
                  type="text"
                  value={lessonId}
                  onChange={(e) => setLessonId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1">
                  Título da Lição
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-sky-400 mb-1">
                  Título da Teoria (step 1)
                </label>
                <input
                  type="text"
                  value={theoryTitle}
                  onChange={(e) => setTheoryTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-xs text-sky-400 mb-1">
                  Explicação Teórica
                </label>
                <textarea
                  rows={3}
                  value={theoryContent}
                  onChange={(e) => setTheoryContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-sky-400 mb-1">
                  Exemplo de Código + Dica Chave
                </label>
                <textarea
                  rows={2}
                  value={codeExample}
                  onChange={(e) => setCodeExample(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 focus:border-sky-500 focus:outline-none mb-2"
                />
                <input
                  type="text"
                  value={takeaway}
                  onChange={(e) => setTakeaway(e.target.value)}
                  placeholder="Ponto-chave para lembrar..."
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Practical Step Builder */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-mono text-xs text-emerald-400 font-semibold">
                  Step 2: Desafio Prático
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      ["fill_in_blank", "Lacunas ({{blank}})"],
                      ["multiple_choice", "Múltipla Escolha"],
                      ["order_code", "Ordenar Código"],
                      ["spot_the_bug", "Caçar Bug"],
                      ["write_code", "Escrever Código"],
                    ] as const
                  ).map(([typeKey, label]) => (
                    <button
                      key={typeKey}
                      type="button"
                      onClick={() => setPracticeType(typeKey)}
                      className={`px-2.5 py-1 rounded-md font-mono text-[11px] border transition cursor-pointer ${
                        practiceType === typeKey
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enunciado do desafio..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />

              {practiceType === "fill_in_blank" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <textarea
                    rows={3}
                    value={codeTemplate}
                    onChange={(e) => setCodeTemplate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 focus:outline-none"
                  />
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Resposta exata do {{blank}}"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Explicação pós-resposta"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {practiceType === "multiple_choice" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <textarea
                    rows={3}
                    value={mcOptionsRaw}
                    onChange={(e) => setMcOptionsRaw(e.target.value)}
                    placeholder="Uma opção por linha"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none"
                  />
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] text-slate-400">
                      Índice da opção correta (0 = primeira linha)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={mcCorrectIdx}
                      onChange={(e) => setMcCorrectIdx(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Explicação pós-resposta"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {practiceType === "order_code" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <textarea
                    rows={4}
                    value={orderBlocksRaw}
                    onChange={(e) => setOrderBlocksRaw(e.target.value)}
                    placeholder="Um bloco de código por linha na ordem correta"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Explicação pós-resposta"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 self-start focus:outline-none"
                  />
                </div>
              )}

              {practiceType === "spot_the_bug" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <textarea
                    rows={3}
                    value={bugLinesRaw}
                    onChange={(e) => setBugLinesRaw(e.target.value)}
                    placeholder="Uma linha de código por linha"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-rose-300 focus:outline-none"
                  />
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] text-slate-400">
                      Índice da linha com bug (0 = linha 1)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={bugLineIdx}
                      onChange={(e) => setBugLineIdx(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Explicação do bug"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {practiceType === "write_code" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <textarea
                    rows={4}
                    value={sampleSolution}
                    onChange={(e) => setSampleSolution(e.target.value)}
                    placeholder="Solução completa de referência"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 focus:outline-none"
                  />
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] text-slate-400">
                      Tokens obrigatórios separados por vírgula
                    </label>
                    <input
                      type="text"
                      value={requiredTokensRaw}
                      onChange={(e) => setRequiredTokensRaw(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Explicação pós-resposta"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* New Track Metadata Mode */
          <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div>
              <label className="block font-mono text-xs text-slate-400 mb-1">
                ID da Nova Trilha (pasta)
              </label>
              <input
                type="text"
                value={newTrackId}
                onChange={(e) =>
                  setNewTrackId(
                    e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")
                  )
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-white"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-slate-400 mb-1">
                Título
              </label>
              <input
                type="text"
                value={newTrackTitle}
                onChange={(e) => setNewTrackTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-slate-400 mb-1">
                Categoria
              </label>
              <select
                value={newTrackCategory}
                onChange={(e) =>
                  setNewTrackCategory(
                    e.target.value as
                      | "language"
                      | "framework"
                      | "library"
                      | "tool"
                      | "concept"
                  )
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              >
                <option value="language">Linguagem Base</option>
                <option value="framework">Framework</option>
                <option value="library">Biblioteca</option>
                <option value="tool">Ferramenta</option>
                <option value="concept">Conceito CS</option>
              </select>
            </div>
            {newTrackCategory !== "language" && newTrackCategory !== "concept" && (
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1">
                  Linguagem Pai (Pré-requisito)
                </label>
                <select
                  value={newTrackLangId}
                  onChange={(e) => setNewTrackLangId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  {baseLanguages.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.icon} {l.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="sm:col-span-2 grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newTrackDesc}
                onChange={(e) => setNewTrackDesc(e.target.value)}
                placeholder="Descrição curta..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                value={newTrackAuthor}
                onChange={(e) => setNewTrackAuthor(e.target.value)}
                placeholder="Seu @github"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* Live Zod Status + Target Path + Output */}
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400 truncate max-w-xs sm:max-w-md">
                {targetFilePath}
              </span>
              {validation.ok ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[11px]">
                  <CheckCircle2 className="w-3 h-3" /> Zod OK
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[11px]">
                  <AlertTriangle className="w-3 h-3" /> {validation.error}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={downloadJson}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 font-mono text-xs text-slate-200 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Baixar .json
              </button>
              <button
                type="button"
                onClick={copyJson}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-mono text-xs text-white transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    {t.community.copied}
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    {t.community.copyJson}
                  </>
                )}
              </button>
            </div>
          </div>

          {mode === "improve" && (
            <div className="px-4 py-2 bg-emerald-950/20 border-b border-slate-800/80 font-mono text-[11px] text-emerald-300">
              Depois de salvar o arquivo acima, adicione{" "}
              <code className="text-white">&quot;{lessonFileSlug}&quot;</code>{" "}
              no array <code className="text-white">lessons</code> do módulo{" "}
              <code className="text-white">{activeModule?.id}</code> em{" "}
              <code className="text-white">
                content/tracks/{selectedTrack?.id}/track.json
              </code>{" "}
              e rode <code className="text-white">npm run validate:tracks</code>.
            </div>
          )}

          <pre className="p-4 font-mono text-xs text-emerald-300 overflow-x-auto max-h-80">
            <code>{outputJson}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
