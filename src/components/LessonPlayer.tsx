"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  X,
  Flame,
  Target,
  Sparkles,
  CheckCircle2,
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
import { hasWriteCodeContent, matchRequiredTokens } from "@/lib/code-validation";

export function LessonPlayer({
  trackId,
  trackTitle,
  languageId,
  moduleTitle,
  lesson,
  nextLessonId,
}: {
  trackId: string;
  trackTitle: string;
  languageId?: string;
  moduleTitle: string;
  lesson: Lesson;
  nextLessonId?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { progress, t } = useUserProgress();

  const isMasteredTrack = progress.masteredTracks.includes(trackId);
  const urlPracticeMode = searchParams?.get("mode") === "practice";

  const [practiceOverride, setPracticeOverride] = useState<boolean | null>(null);
  const practiceOnly = practiceOverride ?? (urlPracticeMode || isMasteredTrack);

  // Filter out theory steps when in Direct Practice Mode
  const activeSteps = useMemo(() => {
    if (!practiceOnly) return lesson.steps;
    const withoutTheory = lesson.steps.filter((s) => s.type !== "theory");
    return withoutTheory.length > 0 ? withoutTheory : lesson.steps;
  }, [lesson.steps, practiceOnly]);

  const [stepIdx, setStepIdx] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [blankAnswers, setBlankAnswers] = useState<string[]>([]);
  const [activeBlankIdx, setActiveBlankIdx] = useState(0);
  const [orderedIndices, setOrderedIndices] = useState<number[]>([]);
  const [selectedBugLine, setSelectedBugLine] = useState<number | null>(null);
  const [writtenCodeOverride, setWrittenCodeOverride] = useState<string | null>(
    null
  );
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [isFinished, setIsFinished] = useState(false);

  const totalSteps = activeSteps.length;
  const safeStepIdx = Math.min(stepIdx, Math.max(0, activeSteps.length - 1));
  const currentStep = activeSteps[safeStepIdx];
  const runCmdLabel = languageId === "rust-systems" ? "$ cargo run" : "$ output";
  const writtenCode =
    writtenCodeOverride ??
    (currentStep?.type === "write_code" ? currentStep.starterCode ?? "" : "");

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
      return hasWriteCodeContent(writtenCode, languageId, trackId);
    }
    return false;
  }, [
    currentStep,
    selectedOption,
    currentBlanks,
    orderedIndices.length,
    selectedBugLine,
    writtenCode,
    languageId,
    trackId,
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
      isCorrect = matchRequiredTokens(
        writtenCode,
        currentStep.requiredTokens,
        languageId,
        trackId
      ).passed;
    }

    if (isCorrect) {
      setStatus("correct");
      setCombo((c) => {
        const next = c + 1;
        setBestCombo((b) => Math.max(b, next));
        return next;
      });
      triggerFeedbackEffect("success");
    } else {
      setStatus("wrong");
      setCombo(0);
      triggerFeedbackEffect("error");
    }
  }

  function handleRetry() {
    setStatus("idle");
    if (currentStep?.type === "fill_in_blank") {
      // Keep correct blanks filled and only clear the ones that need adjustment
      const kept = currentStep.blanks.map((b, i) =>
        currentBlanks[i]?.trim() === b.answer.trim() ? currentBlanks[i] : ""
      );
      setBlankAnswers(kept);
      const firstWrong = kept.findIndex((v) => !v);
      setActiveBlankIdx(firstWrong !== -1 ? firstWrong : 0);
      return;
    }
    if (currentStep?.type === "order_code") {
      // Keep the longest valid prefix so the learner only fixes the misplaced tail
      let validPrefix = 0;
      while (
        validPrefix < orderedIndices.length &&
        orderedIndices[validPrefix] === currentStep.correctOrder[validPrefix]
      ) {
        validPrefix++;
      }
      setOrderedIndices(orderedIndices.slice(0, validPrefix));
      return;
    }
    if (currentStep?.type !== "write_code") {
      setSelectedOption(null);
      setSelectedBugLine(null);
    }
  }

  function handleRevealOneBlank() {
    if (status !== "idle" || currentStep?.type !== "fill_in_blank") return;
    const targetIdx =
      activeBlankIdx < expectedBlanksCount &&
      currentBlanks[activeBlankIdx]?.trim() !==
        currentStep.blanks[activeBlankIdx].answer.trim()
        ? activeBlankIdx
        : currentStep.blanks.findIndex(
            (b, i) => currentBlanks[i]?.trim() !== b.answer.trim()
          );
    if (targetIdx === -1) return;
    const next = [...currentBlanks];
    next[targetIdx] = currentStep.blanks[targetIdx].answer;
    setBlankAnswers(next);
    const nextEmpty = next.findIndex((v) => !v.trim());
    if (nextEmpty !== -1) setActiveBlankIdx(nextEmpty);
  }

  function handlePlaceNextOrderBlock() {
    if (status !== "idle" || currentStep?.type !== "order_code") return;
    // Keep any valid prefix, then append the next expected block
    let validPrefix = 0;
    while (
      validPrefix < orderedIndices.length &&
      orderedIndices[validPrefix] === currentStep.correctOrder[validPrefix]
    ) {
      validPrefix++;
    }
    if (validPrefix >= currentStep.correctOrder.length) return;
    setOrderedIndices([
      ...orderedIndices.slice(0, validPrefix),
      currentStep.correctOrder[validPrefix],
    ]);
  }

  function handleNext() {
    const nextIdx = stepIdx + 1;
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
    setWrittenCodeOverride(null);
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
      if (e.isComposing) return;
      const target = e.target as HTMLElement | null;
      const isEditor =
        target?.tagName === "TEXTAREA" ||
        Boolean(target?.isContentEditable) ||
        Boolean(target?.closest?.(".cm-editor"));
      const isInput = target?.tagName === "INPUT" || isEditor;

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
        if (target?.closest?.("button, a")) {
          return;
        }
        if (
          (isEditor || currentStep.type === "write_code") &&
          status === "idle" &&
          !(e.ctrlKey || e.metaKey)
        ) {
          return; // Allow normal multiline Enter inside write_code editor
        }
        if (currentStep.type === "theory") {
          e.preventDefault();
          triggerFeedbackEffect("success");
          handleNext();
        } else if (status === "correct") {
          e.preventDefault();
          handleNext();
        } else if (status === "wrong") {
          e.preventDefault();
          handleRetry();
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
      <div className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center p-6">
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
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5">
              <p className="text-[11px] uppercase text-amber-300">
                {t.player.integrity}
              </p>
              <p className="text-xl font-bold text-white flex items-center gap-1.5 mt-1">
                <Flame className="w-4 h-4 text-amber-400" /> {bestCombo}x
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {nextLessonId && (
              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/lesson/${trackId}/${nextLessonId}${
                      practiceOnly ? "?mode=practice" : ""
                    }`
                  )
                }
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                Próxima Lição <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => router.push("/")}
              className={`w-full py-3 rounded-xl font-mono font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                nextLessonId
                  ? "border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
            >
              {t.player.backToRoadmap} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const templateParts =
    currentStep.type === "fill_in_blank"
      ? currentStep.codeTemplate.split("{{blank}}")
      : [];

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col justify-between">
      {/* Top IDE-style Header */}
      <header className="border-b border-border/80 bg-background/90 px-4 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 sm:py-3">
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
                  idx < stepIdx
                    ? "bg-emerald-500"
                    : idx === stepIdx
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
                setPracticeOverride(!practiceOnly);
                setStepIdx(0);
                setWrittenCodeOverride(null);
                setShowHint(false);
                setStatus("idle");
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] border transition cursor-pointer ${
                practiceOnly
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
              aria-label={t.common.toggleModeTitle}
              title={t.common.toggleModeTitle}
            >
              <Dumbbell className="w-3 h-3" />
              <span className="sr-only sm:not-sr-only">
                {practiceOnly
                  ? t.player.practiceModeBadge
                  : t.player.skipTheory}
              </span>
            </button>

            <div
              className={`flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md border transition ${
                combo >= 2
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                  : combo === 1
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400"
              }`}
              title="Combo de acertos seguidos (errar não tira vidas!)"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{combo}x</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 flex flex-col justify-center space-y-5">
        {lesson.mission && (
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-xs sm:text-sm text-indigo-200">
            <Target className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{lesson.mission}</span>
          </div>
        )}

        {/* THEORY STEP PRESENTATION */}
        {currentStep.type === "theory" && (
          <div className="rounded-2xl border border-cyan-500/30 bg-zinc-900/50 p-6 space-y-5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 font-mono text-xs font-semibold text-cyan-300">
                <BookOpen className="w-3.5 h-3.5" />
                {t.player.theoryBadge}
              </span>
              <span className="font-mono text-xs text-zinc-400">
                {t.player.step} {stepIdx + 1}/{totalSteps}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {currentStep.title}
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line">
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
                    {languageId === "rust-systems" ? "main.rs" : "exemplo.code"}
                  </span>
                </div>
                <pre className="p-4 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed">
                  <code>
                    <CodeHighlight code={currentStep.codeExample} />
                  </code>
                </pre>
                {currentStep.expectedOutput && (
                  <div className="px-4 py-3 bg-emerald-950/25 border-t border-zinc-800 font-mono text-xs space-y-1">
                    <span className="text-zinc-500 block">{runCmdLabel}</span>
                    <pre className="text-emerald-300 whitespace-pre-wrap">
                      {currentStep.expectedOutput}
                    </pre>
                  </div>
                )}
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
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 flex-wrap">
                <span>{moduleTitle}</span>
                <span>•</span>
                <span>
                  {t.player.step} {stepIdx + 1}/{totalSteps}
                </span>
                {currentStep.type === "multiple_choice" &&
                  currentStep.kind === "predict_output" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px]">
                      <Terminal className="w-3 h-3" /> Preveja a saída
                    </span>
                  )}
                {practiceOnly && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px]">
                    <Dumbbell className="w-3 h-3" /> {t.player.practiceModeBadge}
                  </span>
                )}
              </div>

              {currentStep.type !== "write_code" && currentStep.hint && (
                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-amber-500/35 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-mono text-[11px] transition cursor-pointer"
                >
                  <Lightbulb className="w-3 h-3" /> {t.common.hint}
                </button>
              )}
            </div>

            <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentStep.prompt}
            </h1>

            {currentStep.type !== "write_code" && showHint && currentStep.hint && (
              <div className="px-3.5 py-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 font-mono text-xs text-amber-200">
                💡 {currentStep.hint}
              </div>
            )}
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
                const isRightOption =
                  status !== "idle" && idx === currentStep.correctIndex;
                const isWrongPick =
                  status === "wrong" &&
                  isSelected &&
                  idx !== currentStep.correctIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={status !== "idle"}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border font-mono text-sm transition flex items-center gap-3.5 cursor-pointer ${
                      isRightOption
                        ? "border-emerald-500/70 bg-emerald-500/15 text-emerald-100"
                        : isWrongPick
                        ? "border-amber-500/70 bg-amber-500/15 text-amber-100"
                        : isSelected
                        ? "border-indigo-500 bg-indigo-500/15 text-white"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-900 hover:border-zinc-700"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs font-mono shrink-0 ${
                        isRightOption
                          ? "border-emerald-400 bg-emerald-600 text-white"
                          : isWrongPick
                          ? "border-amber-400 bg-amber-600 text-white"
                          : isSelected
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
              <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="font-mono text-[11px] text-zinc-400 ml-1">
                    {languageId === "rust-systems" ? "main.rs" : "editor"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {status === "idle" && (
                    <button
                      type="button"
                      onClick={handleRevealOneBlank}
                      className="font-mono text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> Revelar 1 lacuna
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={status !== "idle"}
                    onClick={() => {
                      setBlankAnswers([]);
                      setActiveBlankIdx(0);
                    }}
                    className="font-mono text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <RotateCcw className="w-3 h-3" /> {t.common.reset}
                  </button>
                </div>
              </div>

              <div className="p-5 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {templateParts.map((part, i) => {
                  const blankDef = currentStep.blanks[i];
                  const isBlankCorrect =
                    blankDef &&
                    currentBlanks[i]?.trim() === blankDef.answer.trim();
                  return (
                    <span key={i}>
                      <span className="text-zinc-200">{part}</span>
                      {i < currentStep.blanks.length && (
                        <input
                          type="text"
                          autoCapitalize="none"
                          autoCorrect="off"
                          autoComplete="off"
                          spellCheck={false}
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
                          className={`mx-1 px-2.5 py-0.5 rounded-md border font-mono text-base sm:text-inherit font-semibold text-center transition focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 ${
                            status === "correct" ||
                            (status === "wrong" && isBlankCorrect)
                              ? "border-emerald-500 bg-emerald-500/15 text-emerald-200"
                              : status === "wrong"
                              ? "border-amber-400 bg-amber-500/15 text-amber-200"
                              : activeBlankIdx === i
                              ? "border-indigo-400 bg-indigo-500/20 text-white"
                              : "border-zinc-700 bg-surface-inset text-cyan-300"
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
                  );
                })}
              </div>

              {status === "wrong" && (
                <div className="px-4 py-2.5 bg-amber-950/25 border-t border-amber-500/30 font-mono text-xs text-amber-200 flex items-center gap-2 flex-wrap">
                  <span className="text-amber-300 font-semibold">
                    {t.common.referenceSolution}:
                  </span>
                  {currentStep.blanks.map((b, i) => (
                    <code
                      key={i}
                      className="px-2 py-0.5 rounded bg-surface-inset border border-emerald-500/40 text-emerald-300"
                    >
                      {b.answer}
                    </code>
                  ))}
                </div>
              )}
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
              <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-[11px] text-zinc-300">
                    montagem ({orderedIndices.length}/{currentStep.blocks.length})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {status === "idle" &&
                    orderedIndices.length < currentStep.blocks.length && (
                      <button
                        type="button"
                        onClick={handlePlaceNextOrderBlock}
                        className="font-mono text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" /> Próximo bloco
                      </button>
                    )}
                  <button
                    type="button"
                    disabled={status !== "idle" || orderedIndices.length === 0}
                    onClick={() => setOrderedIndices([])}
                    className="font-mono text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <RotateCcw className="w-3 h-3" /> {t.common.reset}
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2 min-h-[120px]">
                {orderedIndices.length === 0 ? (
                  <p className="font-mono text-xs text-zinc-500 py-6 text-center">
                    {"// Toque nos blocos abaixo na ordem correta"}
                  </p>
                ) : (
                  orderedIndices.map((itemIdx, pos) => {
                    const isPosRight =
                      status !== "idle" &&
                      currentStep.correctOrder[pos] === itemIdx;
                    const isPosWrong =
                      status === "wrong" &&
                      currentStep.correctOrder[pos] !== itemIdx;
                    return (
                      <button
                        key={`ordered-${pos}-${itemIdx}`}
                        type="button"
                        disabled={status !== "idle"}
                        onClick={() =>
                          setOrderedIndices((prev) =>
                            prev.filter((_, idx) => idx !== pos)
                          )
                        }
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border font-mono text-xs sm:text-sm flex items-center gap-3 transition cursor-pointer ${
                          isPosRight
                            ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-200"
                            : isPosWrong
                            ? "border-amber-500/50 bg-amber-500/15 text-amber-200"
                            : "border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-cyan-200"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded flex items-center justify-center text-[11px] shrink-0 ${
                            isPosRight
                              ? "bg-emerald-500/30 text-emerald-200"
                              : isPosWrong
                              ? "bg-amber-500/30 text-amber-200"
                              : "bg-indigo-500/30 text-indigo-300"
                          }`}
                        >
                          {isPosRight ? "✓" : pos + 1}
                        </span>
                        <code className="break-all">
                          <CodeHighlight code={currentStep.blocks[itemIdx]} />
                        </code>
                      </button>
                    );
                  })
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
                    {languageId === "rust-systems" ? "main.rs" : "debugger-inspector"}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-amber-400 flex items-center gap-1">
                  <Bug className="w-3.5 h-3.5" /> toque na linha com bug
                </span>
              </div>
              <div className="divide-y divide-zinc-800/60">
                {currentStep.lines.map((line, idx) => {
                  const isSelected = selectedBugLine === idx;
                  const isBugLine =
                    status !== "idle" && idx === currentStep.buggyLineIndex;
                  const isWrongPick =
                    status === "wrong" &&
                    isSelected &&
                    idx !== currentStep.buggyLineIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={status !== "idle"}
                      onClick={() => setSelectedBugLine(idx)}
                      className={`w-full text-left px-4 py-2.5 font-mono text-xs sm:text-sm flex items-center gap-3.5 transition cursor-pointer ${
                        isBugLine
                          ? "bg-emerald-500/15 text-emerald-200 border-l-2 border-l-emerald-500"
                          : isWrongPick
                          ? "bg-amber-500/15 text-amber-200 border-l-2 border-l-amber-400"
                          : status === "idle" && isSelected
                          ? "bg-indigo-500/15 text-indigo-100 border-l-2 border-l-indigo-400"
                          : "hover:bg-zinc-800/60 text-zinc-300"
                      }`}
                    >
                      <span
                        className={`w-6 text-right text-[11px] select-none shrink-0 ${
                          isBugLine
                            ? "text-emerald-400 font-bold"
                            : isWrongPick
                            ? "text-amber-400 font-bold"
                            : status === "idle" && isSelected
                            ? "text-indigo-300 font-bold"
                            : "text-zinc-500"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <code className="whitespace-pre-wrap break-all flex-1">
                        <CodeHighlight code={line} />
                      </code>
                      {(isBugLine || isSelected) && (
                        <Bug
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isBugLine
                              ? "text-emerald-400"
                              : isWrongPick
                              ? "text-amber-400"
                              : "text-indigo-400"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Write Code Step */}
        {currentStep.type === "write_code" && (
          <div className="space-y-3">
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/90">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="font-mono text-[11px] text-emerald-400 ml-1">
                    {languageId === "rust-systems" ? "main.rs" : "editor"} (Ctrl+Enter)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {currentStep.hint && (
                    <button
                      type="button"
                      onClick={() => setShowHint((h) => !h)}
                      className="font-mono text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Lightbulb className="w-3 h-3" /> {t.common.hint}
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={status !== "idle"}
                    onClick={() => setWrittenCodeOverride(null)}
                    className="font-mono text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <RotateCcw className="w-3 h-3" /> {t.common.reset}
                  </button>
                </div>
              </div>

              {showHint && currentStep.hint && (
                <div className="px-4 py-2.5 bg-amber-950/30 border-b border-amber-500/30 font-mono text-xs text-amber-200 flex items-center justify-between gap-2 flex-wrap">
                  <span>💡 {currentStep.hint}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setWrittenCodeOverride(currentStep.sampleSolution);
                      if (status === "wrong") setStatus("idle");
                    }}
                    className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-[11px] shrink-0 cursor-pointer"
                  >
                    Resolver junto
                  </button>
                </div>
              )}

              <CodeEditor
                value={writtenCode}
                onChange={setWrittenCodeOverride}
                languageId={languageId}
                disabled={status !== "idle"}
                placeholder={t.common.editorPlaceholder}
              />

              {/* Live goal checklist while typing so there is zero guesswork */}
              <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
                <span className="font-mono text-[11px] text-slate-400">
                  Objetivos:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(() => {
                    const { matched } = matchRequiredTokens(
                      writtenCode,
                      currentStep.requiredTokens,
                      languageId,
                      trackId
                    );
                    return currentStep.requiredTokens.map((tok, i) => {
                      const hasTok = matched[i];
                      return (
                        <span
                          key={i}
                          className={`px-2 py-0.5 rounded font-mono text-[11px] border transition ${
                            hasTok
                              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                              : status === "wrong"
                              ? "bg-amber-950/60 border-amber-500/40 text-amber-300"
                              : "bg-slate-950 border-slate-700 text-slate-400"
                          }`}
                        >
                          {hasTok ? "✓ " : "○ "}
                          {tok}
                        </span>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>

            {status !== "idle" && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-1.5">
                <span className="font-mono text-[11px] text-slate-400 block">
                  {t.common.referenceSolution}
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

        {/* Simulated Terminal Output on Success */}
        {currentStep.type !== "theory" &&
          status === "correct" &&
          currentStep.expectedOutput && (
            <div className="rounded-xl overflow-hidden border border-emerald-500/40 bg-emerald-950/25 font-mono text-xs">
              <div className="px-3.5 py-1.5 bg-emerald-950/50 border-b border-emerald-500/25 flex items-center justify-between text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> {runCmdLabel}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400">
                  ok
                </span>
              </div>
              <pre className="p-3.5 text-emerald-200 whitespace-pre-wrap leading-relaxed">
                {currentStep.expectedOutput}
              </pre>
            </div>
          )}
      </main>

      {/* Bottom Terminal Console / Action Bar */}
      <footer
        className={`border-t transition-colors px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] ${
          status === "correct"
            ? "bg-emerald-950/40 border-emerald-500/50"
            : status === "wrong"
            ? "bg-amber-950/35 border-amber-500/45"
            : "bg-zinc-950 border-zinc-800"
        }`}
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            {status === "correct" && currentStep.type !== "theory" && (
              <div className="flex items-start gap-3 text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <span>{t.player.testPassed}</span>
                    {combo >= 2 && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                        🔥 {combo}x combo
                      </span>
                    )}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-200 mt-0.5">
                    {currentStep.explanation}
                  </p>
                </div>
              </div>
            )}

            {status === "wrong" && currentStep.type !== "theory" && (
              <div className="flex items-start gap-3 text-amber-200">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono font-bold text-xs uppercase tracking-wider text-amber-300">
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              {status === "wrong" ? (
                <>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Ajustar Resposta
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    Pular por agora <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  {t.player.nextStep} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
