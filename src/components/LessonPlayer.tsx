"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  X,
  Cpu,
  CheckCircle2,
  XCircle,
  Terminal,
  Zap,
  RotateCcw,
  Play,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Dumbbell,
  ListOrdered,
  Bug,
} from "lucide-react";
import type { Lesson } from "@/lib/schema";
import { CodeHighlight } from "./CodeHighlight";
import { CodeEditor } from "./CodeEditor";
import { ConfettiBurst } from "./ConfettiBurst";
import {
  completeLessonProgress,
  triggerFeedbackEffect,
  useUserProgress,
} from "@/lib/progress";

export function LessonPlayer({
  trackId,
  trackTitle,
  languageId,
  moduleTitle,
  lesson,
}: {
  trackId: string;
  trackTitle: string;
  languageId?: string;
  moduleTitle: string;
  lesson: Lesson;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { progress, t } = useUserProgress();

  const isMasteredTrack = progress.masteredTracks.includes(trackId);
  const urlPracticeMode = searchParams?.get("mode") === "practice";

  const [practiceOnly, setPracticeOnly] = useState(
    urlPracticeMode || isMasteredTrack
  );

  // Sync if user mastered status loads from localStorage or URL changes
  useEffect(() => {
    if (urlPracticeMode || isMasteredTrack) {
      setPracticeOnly(true);
    }
  }, [urlPracticeMode, isMasteredTrack]);

  // Filter out theory steps when in Direct Practice Mode
  const activeSteps = useMemo(() => {
    if (!practiceOnly) return lesson.steps;
    const withoutTheory = lesson.steps.filter((s) => s.type !== "theory");
    return withoutTheory.length > 0 ? withoutTheory : lesson.steps;
  }, [lesson.steps, practiceOnly]);

  const [stepIdx, setStepIdx] = useState(0);
  const [energy, setEnergy] = useState(5);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [blankAnswers, setBlankAnswers] = useState<string[]>([]);
  const [activeBlankIdx, setActiveBlankIdx] = useState(0);
  const [orderedIndices, setOrderedIndices] = useState<number[]>([]);
  const [selectedBugLine, setSelectedBugLine] = useState<number | null>(null);
  const [writtenCode, setWrittenCode] = useState<string>("");
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [isFinished, setIsFinished] = useState(false);

  const safeStepIdx = Math.min(stepIdx, Math.max(0, activeSteps.length - 1));
  const currentStep = activeSteps[safeStepIdx];

  useEffect(() => {
    if (currentStep?.type === "write_code") {
      setWrittenCode(currentStep.starterCode ?? "");
      setShowHint(false);
    }
  }, [safeStepIdx, currentStep]);

  const expectedBlanksCount =
    currentStep?.type === "fill_in_blank" ? currentStep.blanks.length : 0;

  const currentBlanks = useMemo(() => {
    if (currentStep?.type !== "fill_in_blank") return [];
    return Array.from(
      { length: expectedBlanksCount },
      (_, i) => blankAnswers[i] ?? ""
    );
  }, [currentStep, expectedBlanksCount, blankAnswers]);

  const canVerify = useMemo(() => {
    if (!currentStep) return false;
    if (currentStep.type === "multiple_choice") {
      return selectedOption !== null;
    }
    if (currentStep.type === "fill_in_blank") {
      return currentBlanks.every((val) => val.trim().length > 0);
    }
    if (currentStep.type === "order_code") {
      return orderedIndices.length === currentStep.blocks.length;
    }
    if (currentStep.type === "spot_the_bug") {
      return selectedBugLine !== null;
    }
    if (currentStep.type === "write_code") {
      return writtenCode.trim().length > 0;
    }
    return false;
  }, [
    currentStep,
    selectedOption,
    currentBlanks,
    orderedIndices.length,
    selectedBugLine,
    writtenCode,
  ]);

  function handleCheckAnswer() {
    if (!currentStep || status !== "idle") return;

    let isCorrect = false;
    if (currentStep.type === "multiple_choice") {
      isCorrect = selectedOption === currentStep.correctIndex;
    } else if (currentStep.type === "fill_in_blank") {
      isCorrect = currentStep.blanks.every(
        (b, i) => currentBlanks[i]?.trim() === b.answer.trim()
      );
    } else if (currentStep.type === "order_code") {
      isCorrect = currentStep.correctOrder.every(
        (expectedIdx, pos) => orderedIndices[pos] === expectedIdx
      );
    } else if (currentStep.type === "spot_the_bug") {
      isCorrect = selectedBugLine === currentStep.buggyLineIndex;
    } else if (currentStep.type === "write_code") {
      const normalized = writtenCode.toLowerCase();
      isCorrect = currentStep.requiredTokens.every((tok) =>
        normalized.includes(tok.toLowerCase())
      );
    }

    if (isCorrect) {
      setStatus("correct");
      triggerFeedbackEffect("success");
    } else {
      setStatus("wrong");
      setEnergy((e) => Math.max(0, e - 1));
      triggerFeedbackEffect("error");
    }
  }

  function handleNext() {
    const nextIdx = safeStepIdx + 1;
    if (nextIdx >= activeSteps.length) {
      completeLessonProgress(lesson.id, lesson.xp);
      triggerFeedbackEffect("complete");
      setIsFinished(true);
      return;
    }

    setStepIdx(nextIdx);
    setSelectedOption(null);
    setBlankAnswers([]);
    setActiveBlankIdx(0);
    setOrderedIndices([]);
    setSelectedBugLine(null);
    setWrittenCode("");
    setShowHint(false);
    setStatus("idle");
  }

  function handleWordBankSelect(word: string) {
    if (status !== "idle" || currentStep?.type !== "fill_in_blank") return;
    const next = [...currentBlanks];
    const targetIdx =
      activeBlankIdx < expectedBlanksCount ? activeBlankIdx : 0;
    next[targetIdx] = word;
    setBlankAnswers(next);

    const nextEmpty = next.findIndex((v, i) => i > targetIdx && !v);
    if (nextEmpty !== -1) {
      setActiveBlankIdx(nextEmpty);
    } else if (targetIdx + 1 < expectedBlanksCount) {
      setActiveBlankIdx(targetIdx + 1);
    }
  }

  // Keyboard shortcuts: 1-4 for multiple choice, Enter to check or continue
  useEffect(() => {
    if (isFinished || !currentStep) return;

    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if (
        currentStep.type === "multiple_choice" &&
        status === "idle" &&
        !isInput &&
        ["1", "2", "3", "4"].includes(e.key)
      ) {
        const idx = Number(e.key) - 1;
        if (idx < currentStep.options.length) {
          setSelectedOption(idx);
        }
      }

      if (e.key === "Enter") {
        const isTextarea = target?.tagName === "TEXTAREA";
        if (isTextarea && status === "idle" && !(e.ctrlKey || e.metaKey)) {
          return; // Allow normal multiline Enter inside write_code editor
        }
        if (currentStep.type === "theory") {
          e.preventDefault();
          triggerFeedbackEffect("success");
          handleNext();
        } else if (status !== "idle") {
          e.preventDefault();
          handleNext();
        } else if (canVerify) {
          e.preventDefault();
          handleCheckAnswer();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (isFinished) {
    return (
      <div className="min-h-dvh bg-[#090d16] text-slate-100 flex flex-col items-center justify-center p-6">
        <ConfettiBurst />
        <div className="w-full max-w-md rounded-2xl border border-emerald-500/35 bg-slate-900/85 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 font-mono text-xs text-zinc-400">
            <span className="flex items-center gap-2 text-emerald-400">
              <Terminal className="w-4 h-4" /> build: PASS
            </span>
            <span>{lesson.id}</span>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-indigo-400">
              {trackTitle}
            </span>
            <h1 className="text-2xl font-bold text-white">
              {t.player.moduleCompiled}
            </h1>
            <p className="text-sm text-zinc-400">
              {t.player.completedChecks}{" "}
              <strong className="text-zinc-200">{lesson.title}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3.5">
              <p className="text-[11px] uppercase text-indigo-300">
                {t.player.reward}
              </p>
              <p className="text-xl font-bold text-white flex items-center gap-1.5 mt-1">
                <Zap className="w-4 h-4 text-indigo-400" /> +{lesson.xp} XP
              </p>
            </div>
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3.5">
              <p className="text-[11px] uppercase text-cyan-300">
                {t.player.integrity}
              </p>
              <p className="text-xl font-bold text-white flex items-center gap-1.5 mt-1">
                <Cpu className="w-4 h-4 text-cyan-400" /> {energy}/5
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {t.player.backToRoadmap} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const templateParts =
    currentStep.type === "fill_in_blank"
      ? currentStep.codeTemplate.split("{{blank}}")
      : [];

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 flex flex-col justify-between">
      {/* Top IDE-style Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/90 px-4 py-3">
        <div className="max-w-3xl w-full mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition"
              aria-label="Voltar ao roadmap"
            >
              <X className="w-4 h-4" />
            </Link>
            <div className="truncate">
              <span className="font-mono text-xs text-zinc-400 block truncate">
                {trackId} / {lesson.id}
              </span>
            </div>
          </div>

          {/* Segmented Step Bar */}
          <div className="flex items-center gap-1.5 flex-1 max-w-xs">
            {activeSteps.map((s, idx) => (
              <div
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  idx < safeStepIdx
                    ? "bg-emerald-500"
                    : idx === safeStepIdx
                    ? s.type === "theory"
                      ? "bg-cyan-400"
                      : "bg-indigo-500"
                    : "bg-zinc-800"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Toggle between Practice Only (no theory) and Full Guided Mode */}
            <button
              type="button"
              onClick={() => {
                setPracticeOnly((p) => !p);
                setStepIdx(0);
                setStatus("idle");
              }}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] border transition cursor-pointer ${
                practiceOnly
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
              title="Alternar entre Modo Guiado (com Teoria) e Modo Só Prática"
            >
              <Dumbbell className="w-3 h-3" />
              <span>
                {practiceOnly
                  ? t.player.practiceModeBadge
                  : t.player.skipTheory}
              </span>
            </button>

            <div className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-cyan-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>{energy}/5</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 flex flex-col justify-center space-y-6">
        {/* THEORY STEP PRESENTATION */}
        {currentStep.type === "theory" && (
          <div className="rounded-2xl border border-cyan-500/30 bg-zinc-900/50 p-6 space-y-5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 font-mono text-xs font-semibold text-cyan-300">
                <BookOpen className="w-3.5 h-3.5" />
                {t.player.theoryBadge}
              </span>
              <span className="font-mono text-xs text-zinc-400">
                {t.player.step} {safeStepIdx + 1}/{activeSteps.length}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {currentStep.title}
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {currentStep.content}
              </p>
            </div>

            {currentStep.codeExample && (
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="font-mono text-[11px] text-zinc-400 ml-1">
                    exemplo.code
                  </span>
                </div>
                <pre className="p-4 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed">
                  <code>
                    <CodeHighlight code={currentStep.codeExample} />
                  </code>
                </pre>
              </div>
            )}

            {currentStep.keyTakeaways &&
              currentStep.keyTakeaways.length > 0 && (
                <div className="rounded-xl border border-indigo-500/25 bg-indigo-950/20 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-indigo-300">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>{t.player.keyTakeaways}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
                    {currentStep.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-indigo-400 mt-0.5">
                          →
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}

        {/* PRACTICAL EXERCISE HEADER */}
        {currentStep.type !== "theory" && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 flex-wrap">
              <span>{moduleTitle}</span>
              <span>•</span>
              <span>
                {t.player.step} {safeStepIdx + 1}/{activeSteps.length}
              </span>
              {practiceOnly && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px]">
                  <Dumbbell className="w-3 h-3" /> {t.player.practiceModeBadge}
                </span>
              )}
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentStep.prompt}
            </h1>
          </div>
        )}

        {/* Multiple Choice Step */}
        {currentStep.type === "multiple_choice" && (
          <div className="space-y-4">
            {currentStep.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/90">
                <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="font-mono text-[11px] text-zinc-400 ml-1">
                    snippet
                  </span>
                </div>
                <pre className="p-4 font-mono text-sm text-zinc-200 overflow-x-auto">
                  <code>
                    <CodeHighlight code={currentStep.codeSnippet} />
                  </code>
                </pre>
              </div>
            )}

            <div className="grid gap-2.5">
              {currentStep.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={status !== "idle"}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border font-mono text-sm transition flex items-center gap-3.5 cursor-pointer ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500/15 text-white"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-900 hover:border-zinc-700"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs font-mono shrink-0 ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-600 text-white"
                          : "border-zinc-700 bg-zinc-950 text-zinc-400"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="break-words">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Fill in the Blank Step */}
        {currentStep.type === "fill_in_blank" && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/90">
              <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="font-mono text-[11px] text-zinc-400 ml-1">
                    editor
                  </span>
                </div>
                <button
                  type="button"
                  disabled={status !== "idle"}
                  onClick={() => {
                    setBlankAnswers([]);
                    setActiveBlankIdx(0);
                  }}
                  className="font-mono text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> reset
                </button>
              </div>

              <div className="p-5 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {templateParts.map((part, i) => (
                  <span key={i}>
                    <span className="text-zinc-200">{part}</span>
                    {i < currentStep.blanks.length && (
                      <input
                        type="text"
                        disabled={status !== "idle"}
                        value={currentBlanks[i] ?? ""}
                        onFocus={() => setActiveBlankIdx(i)}
                        onChange={(e) => {
                          const next = [...currentBlanks];
                          next[i] = e.target.value;
                          setBlankAnswers(next);
                        }}
                        placeholder={
                          currentStep.blanks[i].placeholder ?? "___"
                        }
                        className={`mx-1 px-2.5 py-0.5 rounded-md border font-mono font-semibold text-center transition focus:outline-none ${
                          activeBlankIdx === i
                            ? "border-indigo-400 bg-indigo-500/20 text-white"
                            : "border-zinc-700 bg-zinc-950 text-cyan-300"
                        }`}
                        style={{
                          width: `${Math.max(
                            6,
                            (currentStep.blanks[i].answer.length || 5) + 3
                          )}ch`,
                        }}
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>

            {currentStep.options && currentStep.options.length > 0 && (
              <div className="space-y-2">
                <span className="font-mono text-xs text-zinc-400 block">
                  {t.player.suggestedTokens}
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentStep.options.map((word, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={status !== "idle"}
                      onClick={() => handleWordBankSelect(word)}
                      className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-indigo-400 text-zinc-100 font-mono text-xs transition cursor-pointer"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Order Code Step (Parson's Puzzle) */}
        {currentStep.type === "order_code" && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/90">
              <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-[11px] text-zinc-300">
                    parsons-buffer ({orderedIndices.length}/{currentStep.blocks.length})
                  </span>
                </div>
                <button
                  type="button"
                  disabled={status !== "idle" || orderedIndices.length === 0}
                  onClick={() => setOrderedIndices([])}
                  className="font-mono text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 cursor-pointer disabled:opacity-40"
                >
                  <RotateCcw className="w-3 h-3" /> reset
                </button>
              </div>

              <div className="p-4 space-y-2 min-h-[120px]">
                {orderedIndices.length === 0 ? (
                  <p className="font-mono text-xs text-zinc-500 py-6 text-center">
                    // {t.player.suggestedTokens}
                  </p>
                ) : (
                  orderedIndices.map((itemIdx, pos) => (
                    <button
                      key={`ordered-${pos}-${itemIdx}`}
                      type="button"
                      disabled={status !== "idle"}
                      onClick={() =>
                        setOrderedIndices((prev) =>
                          prev.filter((_, idx) => idx !== pos)
                        )
                      }
                      className="w-full text-left px-3.5 py-2.5 rounded-lg border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-cyan-200 font-mono text-xs sm:text-sm flex items-center gap-3 transition cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded bg-indigo-500/30 text-indigo-300 flex items-center justify-center text-[11px] shrink-0">
                        {pos + 1}
                      </span>
                      <code className="break-all">
                        <CodeHighlight code={currentStep.blocks[itemIdx]} />
                      </code>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-zinc-400 block">
                {t.player.suggestedTokens}
              </span>
              <div className="grid gap-2">
                {currentStep.blocks.map((line, idx) => {
                  const isUsed = orderedIndices.includes(idx);
                  return (
                    <button
                      key={`pool-${idx}`}
                      type="button"
                      disabled={status !== "idle" || isUsed}
                      onClick={() =>
                        setOrderedIndices((prev) => [...prev, idx])
                      }
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg border font-mono text-xs sm:text-sm transition flex items-center gap-3 ${
                        isUsed
                          ? "border-zinc-800/50 bg-zinc-950 text-zinc-600 opacity-40 cursor-not-allowed"
                          : "border-zinc-800 bg-zinc-900 hover:border-cyan-500/50 text-zinc-200 cursor-pointer"
                      }`}
                    >
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                        +
                      </span>
                      <code className="break-all">
                        <CodeHighlight code={line} />
                      </code>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Spot the Bug Step */}
        {currentStep.type === "spot_the_bug" && (
          <div className="space-y-3">
            <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/90">
              <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="font-mono text-[11px] text-zinc-400 ml-1">
                    debugger-inspector
                  </span>
                </div>
                <span className="font-mono text-[11px] text-rose-400 flex items-center gap-1">
                  <Bug className="w-3.5 h-3.5" /> breakpoint
                </span>
              </div>
              <div className="divide-y divide-zinc-800/60">
                {currentStep.lines.map((line, idx) => {
                  const isSelected = selectedBugLine === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={status !== "idle"}
                      onClick={() => setSelectedBugLine(idx)}
                      className={`w-full text-left px-4 py-2.5 font-mono text-xs sm:text-sm flex items-center gap-3.5 transition cursor-pointer ${
                        isSelected
                          ? "bg-rose-500/15 text-rose-200 border-l-2 border-l-rose-500"
                          : "hover:bg-zinc-800/60 text-zinc-300"
                      }`}
                    >
                      <span
                        className={`w-6 text-right text-[11px] select-none shrink-0 ${
                          isSelected ? "text-rose-400 font-bold" : "text-zinc-500"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <code className="whitespace-pre-wrap break-all flex-1">
                        <CodeHighlight code={line} />
                      </code>
                      {isSelected && (
                        <Bug className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Write Code From Scratch Step */}
        {currentStep.type === "write_code" && (
          <div className="space-y-3">
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/90">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="font-mono text-[11px] text-emerald-400 ml-1">
                    scratchpad-editor (Ctrl+Enter)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {currentStep.hint && (
                    <button
                      type="button"
                      onClick={() => setShowHint((h) => !h)}
                      className="font-mono text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Lightbulb className="w-3 h-3" /> dica
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={status !== "idle"}
                    onClick={() => setWrittenCode(currentStep.starterCode ?? "")}
                    className="font-mono text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> reset
                  </button>
                </div>
              </div>

              {showHint && currentStep.hint && (
                <div className="px-4 py-2.5 bg-amber-950/30 border-b border-amber-500/30 font-mono text-xs text-amber-200 flex items-center justify-between gap-2">
                  <span>💡 {currentStep.hint}</span>
                  <button
                    type="button"
                    onClick={() => setWrittenCode(currentStep.sampleSolution)}
                    className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] shrink-0 cursor-pointer"
                  >
                    Ver solução
                  </button>
                </div>
              )}

              <CodeEditor
                value={writtenCode}
                onChange={setWrittenCode}
                languageId={languageId}
                disabled={status !== "idle"}
                placeholder="// Escreva seu código do zero aqui..."
              />

              <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
                <span className="font-mono text-[11px] text-slate-400">
                  Tokens esperados:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentStep.requiredTokens.map((tok, i) => {
                    const hasTok = writtenCode
                      .toLowerCase()
                      .includes(tok.toLowerCase());
                    return (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded font-mono text-[11px] border transition ${
                          hasTok
                            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        {hasTok ? "✓ " : ""}
                        {tok}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {status !== "idle" && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-1.5">
                <span className="font-mono text-[11px] text-slate-400 block">
                  Solução de referência:
                </span>
                <pre className="font-mono text-xs text-slate-200 overflow-x-auto">
                  <code>
                    <CodeHighlight code={currentStep.sampleSolution} />
                  </code>
                </pre>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Terminal Console / Action Bar */}
      <footer
        className={`border-t transition-colors px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] ${
          status === "correct"
            ? "bg-emerald-950/40 border-emerald-500/50"
            : status === "wrong"
            ? "bg-rose-950/40 border-rose-500/50"
            : "bg-zinc-950 border-zinc-800"
        }`}
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            {status === "correct" && currentStep.type !== "theory" && (
              <div className="flex items-start gap-3 text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-400">
                    {t.player.testPassed}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-200 mt-0.5">
                    {currentStep.explanation}
                  </p>
                </div>
              </div>
            )}

            {status === "wrong" && currentStep.type !== "theory" && (
              <div className="flex items-start gap-3 text-rose-300">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono font-bold text-xs uppercase tracking-wider text-rose-400">
                    {t.player.testFailed}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-200 mt-0.5">
                    {currentStep.explanation}
                  </p>
                </div>
              </div>
            )}

            {status === "idle" && (
              <p className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                {currentStep.type === "theory"
                  ? t.player.theoryBadge
                  : t.player.waitingExecution}
              </p>
            )}
          </div>

          {currentStep.type === "theory" ? (
            <button
              type="button"
              onClick={() => {
                triggerFeedbackEffect("success");
                handleNext();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {t.player.gotItContinue} <ArrowRight className="w-4 h-4" />
            </button>
          ) : status === "idle" ? (
            <button
              type="button"
              disabled={!canVerify}
              onClick={handleCheckAnswer}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                canVerify
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" /> {t.player.runTest}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-mono font-semibold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 transition cursor-pointer ${
                status === "correct"
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : "bg-rose-600 hover:bg-rose-500"
              }`}
            >
              {t.player.nextStep} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
