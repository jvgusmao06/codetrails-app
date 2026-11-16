"use client";

import Link from "next/link";
import {
  Check,
  Lock,
  Play,
  GitCommitHorizontal,
  FolderGit2,
  ArrowUpRight,
  BookOpen,
  Layers,
  CornerDownRight,
  ArrowLeft,
  FastForward,
  Sparkles,
  Dumbbell,
  RotateCcw,
} from "lucide-react";
import type { LoadedTrack } from "@/lib/schema";
import { useUserProgress } from "@/lib/progress";
import { localizeTracks } from "@/lib/track-i18n";
import { getWhyLearn } from "@/lib/track-why";

export function isTrackSatisfied(
  track: LoadedTrack,
  completedLessons: string[],
  masteredTracks: string[]
) {
  if (masteredTracks.includes(track.id)) return true;
  const allIds = track.modules.flatMap((m) => m.lessons.map((l) => l.id));
  return (
    allIds.length > 0 && allIds.every((id) => completedLessons.includes(id))
  );
}

export function SkillTree({ tracks }: { tracks: LoadedTrack[] }) {
  const { progress, setActiveTrack, toggleMasteredTrack, t } =
    useUserProgress();

  const localizedTracks = localizeTracks(tracks, progress.locale);

  // Top-level base languages and universal CS concepts (avoids dumping all frameworks of all languages together)
  const baseLanguages = localizedTracks.filter(
    (tr) => tr.category === "language" || tr.category === "concept"
  );

  const currentTrack =
    localizedTracks.find((tr) => tr.id === progress.activeTrackId) ||
    baseLanguages[0] ||
    localizedTracks[0];

  if (!currentTrack) {
    return (
      <div className="p-8 text-center rounded-xl border border-zinc-800 bg-zinc-900">
        Nenhuma trilha encontrada em <code>content/tracks</code>.
      </div>
    );
  }

  const activeLanguageId =
    currentTrack.category === "language" || currentTrack.category === "concept"
      ? currentTrack.id
      : currentTrack.languageId ?? baseLanguages[0]?.id;

  const activeBaseLanguage = localizedTracks.find(
    (tr) => tr.id === activeLanguageId
  );

  const ecosystemTracks = localizedTracks.filter(
    (tr) =>
      tr.category !== "language" &&
      tr.category !== "concept" &&
      tr.languageId === activeLanguageId
  );

  const allLessonsOrdered = currentTrack.modules.flatMap((m) =>
    m.lessons.map((l) => l.id)
  );

  const firstUncompletedId =
    allLessonsOrdered.find(
      (id) => !progress.completedLessons.includes(id)
    ) ?? allLessonsOrdered[allLessonsOrdered.length - 1];

  const nextLessonObj = currentTrack.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.id === firstUncompletedId);
  const nextLessonNumber = firstUncompletedId
    ? allLessonsOrdered.indexOf(firstUncompletedId) + 1
    : 0;

  const isCurrentMastered = progress.masteredTracks.includes(currentTrack.id);

  const completedInTrack = isCurrentMastered
    ? allLessonsOrdered.length
    : allLessonsOrdered.filter((id) => progress.completedLessons.includes(id))
        .length;

  const trackProgressPct = Math.round(
    (completedInTrack / Math.max(1, allLessonsOrdered.length)) * 100
  );

  // Check if current track has unmet prerequisites (satisfied by either completing all lessons OR declaring proficiency)
  const missingPrereqTracks = (currentTrack.prerequisites ?? [])
    .map((reqId) => localizedTracks.find((tr) => tr.id === reqId))
    .filter(
      (reqTrack): reqTrack is LoadedTrack =>
        !!reqTrack &&
        !isTrackSatisfied(
          reqTrack,
          progress.completedLessons,
          progress.masteredTracks
        )
    );

  const isCurrentTrackLockedByPrereq = missingPrereqTracks.length > 0;

  const categoryLabels: Record<string, string> = {
    language: t.categories.language,
    framework: t.categories.framework,
    library: t.categories.library,
    tool: t.categories.tool,
    concept: t.categories.concept,
  };

  return (
    <div className="space-y-6">
      {/* 1. Base Languages Selector (Clean wrap, zero horizontal scrollbar) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
            {t.roadmap.availableTracks} ({baseLanguages.length})
          </span>
          <Link
            href="/tracks"
            className="font-mono text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            {t.roadmap.viewAll} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {baseLanguages.map((lang) => {
            const isSelectedLang = lang.id === activeLanguageId;
            const isSatisfiedLang = isTrackSatisfied(
              lang,
              progress.completedLessons,
              progress.masteredTracks
            );
            const totalLangLessons = lang.modules.reduce(
              (acc, m) => acc + m.lessons.length,
              0
            );
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setActiveTrack(lang.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-xs transition border cursor-pointer ${
                  isSelectedLang
                    ? "bg-emerald-500/15 border-emerald-500/60 text-white shadow-sm shadow-emerald-950/50"
                    : "bg-slate-900/70 border-slate-800/90 text-slate-400 hover:border-slate-700 hover:text-slate-100"
                }`}
              >
                <span className="text-sm">{lang.icon}</span>
                <span className="font-semibold">{lang.title}</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-300">
                  {totalLangLessons}
                </span>
                {isSatisfiedLang && (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Active Track Hero Card (Primary Focus & CTA) */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/75 p-5 sm:p-6 space-y-5 relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundColor: currentTrack.color }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-white/10"
              style={{ backgroundColor: `${currentTrack.color}22` }}
            >
              {currentTrack.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {categoryLabels[currentTrack.category] ??
                    currentTrack.category}
                </span>
                {activeBaseLanguage &&
                  currentTrack.category !== "language" && (
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {activeBaseLanguage.icon} {activeBaseLanguage.title}
                    </span>
                  )}
                {isCurrentMastered && (
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <Sparkles className="w-3 h-3" /> {t.roadmap.masteredBadge}
                  </span>
                )}
                <span className="font-mono text-xs text-zinc-400">
                  {completedInTrack}/{allLessonsOrdered.length} ({trackProgressPct}%)
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
                {currentTrack.title}
              </h1>
              <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
                {currentTrack.description}
              </p>
              {getWhyLearn(currentTrack.id, progress.locale) && (
                <p className="text-xs text-emerald-300/90 mt-2 max-w-2xl bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5">
                  <span className="font-mono font-semibold text-emerald-400">
                    {t.common.whyLearn}:{" "}
                  </span>
                  {getWhyLearn(currentTrack.id, progress.locale)}
                </p>
              )}
            </div>
          </div>

          {/* Primary CTA + Discrete "Already Mastered" Toggle */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            {!isCurrentTrackLockedByPrereq && firstUncompletedId && (
              <Link
                href={
                  isCurrentMastered
                    ? `/lesson/${currentTrack.id}/${firstUncompletedId}?mode=practice`
                    : `/lesson/${currentTrack.id}/${firstUncompletedId}`
                }
                className={`px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm ${
                  isCurrentMastered
                    ? "bg-teal-600 hover:bg-teal-500 text-white"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                }`}
              >
                {isCurrentMastered ? (
                  <>
                    <Dumbbell className="w-4 h-4" />
                    {t.roadmap.startPracticeArena}
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    {trackProgressPct === 100
                      ? t.roadmap.review
                      : t.roadmap.run}
                  </>
                )}
              </Link>
            )}

            <button
              type="button"
              onClick={() => toggleMasteredTrack(currentTrack.id)}
              title={
                isCurrentMastered
                  ? t.roadmap.undoMastered
                  : t.roadmap.iAlreadyKnowThis
              }
              className="px-3 py-2.5 rounded-xl font-mono text-xs flex items-center gap-1.5 border border-border bg-surface-inset/60 text-muted hover:text-emerald-300 hover:border-accent/40 transition cursor-pointer"
            >
              {isCurrentMastered ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />{" "}
                  {t.roadmap.undoMastered}
                </>
              ) : (
                <>
                  <FastForward className="w-3.5 h-3.5" />{" "}
                  {t.roadmap.iAlreadyKnowThis}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Prerequisite Warning Banner if User Selected a Locked Framework/Library */}
        {isCurrentTrackLockedByPrereq && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-950/25 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                  {t.roadmap.prerequisitesLabel}
                </p>
                <p className="text-xs sm:text-sm text-zinc-200 mt-0.5">
                  {t.roadmap.prereqPending}{" "}
                  <strong>
                    {missingPrereqTracks.map((r) => r.title).join(" + ")}
                  </strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {missingPrereqTracks.map((req) => (
                <div key={req.id} className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTrack(req.id)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-mono text-xs transition cursor-pointer"
                  >
                    Estudar {req.title}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleMasteredTrack(req.id)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    {t.roadmap.unlockPrerequisiteInstant} {req.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isCurrentTrackLockedByPrereq && nextLessonObj && (
          <div className="flex items-center justify-between gap-2 flex-wrap rounded-xl bg-surface-inset/70 border border-border/80 px-3.5 py-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/35 shrink-0">
                {trackProgressPct === 100 ? t.roadmap.review : t.roadmap.nextStep}
              </span>
              <span className="font-mono text-muted shrink-0">
                #{nextLessonNumber}/{allLessonsOrdered.length}
              </span>
              <span className="font-medium text-slate-100 truncate">
                {nextLessonObj.title}
              </span>
            </div>
            <span className="font-mono text-[11px] text-indigo-400 font-semibold shrink-0">
              +{nextLessonObj.xp} XP
            </span>
          </div>
        )}

        <div className="w-full h-1.5 rounded-full bg-surface-inset overflow-hidden border border-border/80">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${Math.max(4, trackProgressPct)}%`,
              backgroundColor: currentTrack.color,
            }}
          />
        </div>
      </div>

      {/* 3. Contextual Ecosystem Panel: Frameworks & Libraries of the Selected Language Only */}
      {ecosystemTracks.length > 0 && (
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
              <Layers className="w-4 h-4" />
              <span className="uppercase tracking-wider font-semibold">
                {t.roadmap.ecosystemTracks}:{" "}
                <strong className="text-white">
                  {activeBaseLanguage?.title}
                </strong>
              </span>
            </div>

            {currentTrack.category !== "language" && activeBaseLanguage && (
              <button
                type="button"
                onClick={() => setActiveTrack(activeBaseLanguage.id)}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t.roadmap.backToBaseLanguage} ({activeBaseLanguage.title})
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {ecosystemTracks.map((eco) => {
              const isSelectedEco = eco.id === currentTrack.id;
              const unmetReqs = (eco.prerequisites ?? [])
                .map((reqId) => localizedTracks.find((tr) => tr.id === reqId))
                .filter(
                  (reqTrack): reqTrack is LoadedTrack =>
                    !!reqTrack &&
                    !isTrackSatisfied(
                      reqTrack,
                      progress.completedLessons,
                      progress.masteredTracks
                    )
                );
              const isUnlocked = unmetReqs.length === 0;
              const isDone = isTrackSatisfied(
                eco,
                progress.completedLessons,
                progress.masteredTracks
              );

              return (
                <button
                  key={eco.id}
                  type="button"
                  onClick={() => setActiveTrack(eco.id)}
                  className={`text-left p-2.5 rounded-xl border transition flex flex-col justify-between gap-2 cursor-pointer ${
                    isSelectedEco
                      ? "bg-indigo-950/40 border-indigo-500 text-white"
                      : isUnlocked
                      ? "bg-surface-inset/80 border-border hover:border-border-strong text-slate-200"
                      : "bg-surface-inset/40 border-border/60 text-muted hover:border-border-strong"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{eco.icon}</span>
                      <div>
                        <p className="font-bold text-xs text-zinc-100 leading-tight">
                          {eco.title}
                        </p>
                        <span className="font-mono text-[10px] uppercase text-zinc-400">
                          {categoryLabels[eco.category] ?? eco.category}
                        </span>
                      </div>
                    </div>

                    {isDone ? (
                      <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : isUnlocked ? (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {t.roadmap.prereqMet}
                      </span>
                    ) : (
                      <span className="p-1 rounded-md bg-amber-500/15 text-amber-400">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {!isUnlocked && (
                    <div className="flex items-center gap-1 font-mono text-[10px] text-amber-300/90 pt-1 border-t border-zinc-800/80">
                      <CornerDownRight className="w-3 h-3 shrink-0" />
                      <span className="truncate">
                        {t.roadmap.prereqPending}{" "}
                        {unmetReqs.map((r) => r.title).join(", ")}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Git-Graph / Technical Roadmap Modules */}
      <div className="space-y-8">
        {currentTrack.modules.map((mod, modIdx) => {
          const modDoneCount = isCurrentMastered
            ? mod.lessons.length
            : mod.lessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length;
          const modAllDone =
            mod.lessons.length > 0 && modDoneCount === mod.lessons.length;

          return (
          <section
            key={mod.id}
            className="rounded-2xl border border-zinc-800/90 bg-zinc-900/30 p-5 sm:p-6 space-y-5"
          >
            {/* Module Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800/80 pb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-indigo-400 mt-0.5">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-indigo-400">
                    branch: mod-0{modIdx + 1} • {mod.lessons.length}{" "}
                    {t.catalog.lessonsCount}
                  </span>
                  <h2 className="text-lg font-bold text-white">{mod.title}</h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                    {mod.description}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 font-mono text-[11px] px-2.5 py-1 rounded-lg border shrink-0 ${
                  modAllDone
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                    : "bg-surface-inset/70 border-border text-muted"
                }`}
              >
                {modAllDone && <Check className="w-3 h-3" />}
                {modDoneCount}/{mod.lessons.length}
              </span>
            </div>

            {/* Linear Commit-Timeline of Lessons */}
            <div className="relative pl-6 sm:pl-8 space-y-4 before:content-[''] before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-800">
              {mod.lessons.map((lesson, idx) => {
                const globalLessonNumber =
                  allLessonsOrdered.indexOf(lesson.id) + 1 || idx + 1;
                const isCompleted =
                  isCurrentMastered ||
                  progress.completedLessons.includes(lesson.id);
                const isCurrent =
                  !isCurrentTrackLockedByPrereq &&
                  !isCurrentMastered &&
                  lesson.id === firstUncompletedId;
                const hasTheory = lesson.steps.some(
                  (s) => s.type === "theory"
                );
                const practiceCount = lesson.steps.filter(
                  (s) => s.type !== "theory"
                ).length;

                return (
                  <div key={lesson.id} className="relative group">
                    {/* Timeline Node Dot */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-4 w-5 h-5 rounded-full flex items-center justify-center border-2 transition ${
                        isCompleted
                          ? "bg-emerald-500 border-emerald-400 text-zinc-950"
                          : isCurrent
                          ? "bg-indigo-600 border-cyan-400 text-white ring-4 ring-indigo-500/20 animate-pulse"
                          : "bg-zinc-900 border-zinc-700 text-zinc-500"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : (
                        <GitCommitHorizontal className="w-3 h-3" />
                      )}
                    </div>

                    {/* Lesson Card */}
                    {isCurrentTrackLockedByPrereq ? (
                      <div className="block rounded-xl border border-zinc-800/60 bg-zinc-900/20 p-4 opacity-75">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <span className="font-mono text-xs text-zinc-500">
                              {t.common.lesson} #{globalLessonNumber}/{allLessonsOrdered.length} • {lesson.id}
                            </span>
                            <h3 className="font-bold text-base text-zinc-300">
                              {lesson.title}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              for (const req of missingPrereqTracks) {
                                toggleMasteredTrack(req.id);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-mono text-xs bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 self-start sm:self-auto cursor-pointer transition"
                          >
                            <FastForward className="w-3.5 h-3.5" />{" "}
                            {t.common.unlockPrereqs}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`rounded-xl border p-4 transition ${
                          isCompleted
                            ? "bg-zinc-900/60 border-emerald-500/30 hover:border-emerald-500/60"
                            : isCurrent
                            ? "bg-indigo-950/25 border-indigo-500/60 hover:bg-indigo-950/40"
                            : "bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs text-emerald-400 font-semibold">
                                {t.common.lesson} #{globalLessonNumber}/{allLessonsOrdered.length}
                              </span>
                              <span className="font-mono text-xs text-zinc-500">
                                • {lesson.id}
                              </span>
                              {hasTheory && (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                                  <BookOpen className="w-3 h-3" /> {t.common.theory} +{" "}
                                  {practiceCount} {t.common.exercisesShort}
                                </span>
                              )}
                              {isCompleted && (
                                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  {t.roadmap.completed}
                                </span>
                              )}
                              {isCurrent && (
                                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                                  {t.roadmap.nextStep}
                                </span>
                              )}
                            </div>

                            <h3 className="font-bold text-base text-zinc-100">
                              {lesson.title}
                            </h3>

                            {lesson.description && (
                              <p className="text-xs text-zinc-400">
                                {lesson.description}
                              </p>
                            )}
                          </div>

                          {/* Dual Action Buttons: Practice Only (No Theory) + Full Lesson (With Theory) */}
                          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60 shrink-0 flex-wrap">
                            <span className="font-mono text-xs text-indigo-400 font-semibold mr-1">
                              +{lesson.xp} XP
                            </span>

                            <Link
                              href={`/lesson/${currentTrack.id}/${lesson.id}?mode=practice`}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition"
                              title={t.common.skipTheoryTitle}
                            >
                              <Dumbbell className="w-3.5 h-3.5" />
                              {t.roadmap.practice}
                            </Link>

                            <Link
                              href={`/lesson/${currentTrack.id}/${lesson.id}`}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-mono text-xs font-semibold transition ${
                                isCompleted
                                  ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                                  : "bg-indigo-600 text-white hover:bg-indigo-500"
                              }`}
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              {isCompleted ? t.roadmap.review : t.roadmap.run}
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
          );
        })}
      </div>
    </div>
  );
}
