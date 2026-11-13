"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  PlusCircle,
  Lock,
  CornerDownRight,
  FastForward,
  Sparkles,
  RotateCcw,
  Search,
} from "lucide-react";
import type { LoadedTrack } from "@/lib/schema";
import { useUserProgress } from "@/lib/progress";
import { localizeTracks } from "@/lib/track-i18n";
import { getWhyLearn } from "@/lib/track-why";
import { isTrackSatisfied } from "./SkillTree";

export function TracksExplorer({ tracks }: { tracks: LoadedTrack[] }) {
  const router = useRouter();
  const { progress, setActiveTrack, toggleMasteredTrack, t } =
    useUserProgress();

  const localizedTracks = localizeTracks(tracks, progress.locale);
  const baseLanguages = localizedTracks.filter(
    (tr) => tr.category === "language" || tr.category === "concept"
  );

  const [selectedLangId, setSelectedLangId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleSelect(trackId: string) {
    setActiveTrack(trackId);
    router.push("/");
  }

  const q = searchQuery.trim().toLowerCase();

  const visibleLanguages = (
    selectedLangId === "all"
      ? baseLanguages
      : baseLanguages.filter((l) => l.id === selectedLangId)
  ).filter((lang) => {
    if (!q) return true;
    const langMatch =
      lang.title.toLowerCase().includes(q) ||
      lang.description.toLowerCase().includes(q) ||
      lang.id.toLowerCase().includes(q);
    if (langMatch) return true;
    return localizedTracks.some(
      (child) =>
        child.languageId === lang.id &&
        (child.title.toLowerCase().includes(q) ||
          child.description.toLowerCase().includes(q) ||
          child.id.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {t.catalog.title}
          </h1>
          <p className="text-sm text-zinc-400">{t.catalog.subtitle}</p>
        </div>

        <Link
          href="/community"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 hover:border-emerald-400 font-mono text-xs font-semibold text-emerald-300 transition self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          {t.catalog.newTrackPr}
        </Link>
      </div>

      {/* Search + Filter by Base Language */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar linguagem, framework ou conceito (ex: Rust, Gin, Pandas, SQL, ORM...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedLangId("all")}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs transition border cursor-pointer ${
              selectedLangId === "all"
                ? "bg-emerald-600 text-white border-emerald-500"
                : "bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-100"
            }`}
          >
            {t.categories.all} ({baseLanguages.length})
          </button>

          {baseLanguages.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => setSelectedLangId(lang.id)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition border flex items-center gap-1.5 cursor-pointer ${
                selectedLangId === lang.id
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-100"
              }`}
            >
              <span>{lang.icon}</span>
              <span>{lang.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hierarchical Sections: Base Language + Its Exclusive Frameworks/Libraries */}
      <div className="space-y-10">
        {visibleLanguages.map((lang) => {
          const childTracks = localizedTracks.filter(
            (tr) =>
              tr.category !== "language" &&
              tr.category !== "concept" &&
              tr.languageId === lang.id
          );
          const isLangActive = progress.activeTrackId === lang.id;
          const isLangMastered = progress.masteredTracks.includes(lang.id);
          const totalLangLessons = lang.modules.reduce(
            (acc, m) => acc + m.lessons.length,
            0
          );
          const completedLangCount = isLangMastered
            ? totalLangLessons
            : lang.modules.reduce(
                (acc, m) =>
                  acc +
                  m.lessons.filter((l) =>
                    progress.completedLessons.includes(l.id)
                  ).length,
                0
              );

          return (
            <section
              key={lang.id}
              className="rounded-2xl border border-zinc-800/90 bg-zinc-900/30 p-5 space-y-5"
            >
              {/* Parent Language Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-white/10 shrink-0"
                    style={{ backgroundColor: `${lang.color}22` }}
                  >
                    {lang.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-wider bg-zinc-800 text-zinc-300">
                        {t.categories.language}
                      </span>
                      {isLangMastered && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <Sparkles className="w-3 h-3" />{" "}
                          {t.roadmap.masteredBadge}
                        </span>
                      )}
                      <span className="font-mono text-xs text-zinc-400">
                        {completedLangCount}/{totalLangLessons}{" "}
                        {t.catalog.lessonsCount}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mt-1">
                      {lang.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                      {lang.description}
                    </p>
                    {getWhyLearn(lang.id) && (
                      <p className="text-xs text-emerald-300/90 mt-1.5">
                        <span className="font-mono font-semibold text-emerald-400">
                          Por que aprender:{" "}
                        </span>
                        {getWhyLearn(lang.id)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap self-start sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleMasteredTrack(lang.id)}
                    className={`px-3 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
                      isLangMastered
                        ? "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                        : "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25"
                    }`}
                  >
                    {isLangMastered ? (
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

                  <Link
                    href="/"
                    onClick={() => setActiveTrack(lang.id)}
                    className={`px-4 py-2 rounded-xl font-mono font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                      isLangActive
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {isLangActive ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> {t.catalog.selected}
                      </>
                    ) : (
                      <>
                        {t.catalog.openRoadmap}{" "}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Link>
                </div>
              </div>

              {/* Child Frameworks & Libraries for this Language */}
              {childTracks.length > 0 && (
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 block">
                    ↳ {t.roadmap.ecosystemTracks} ({childTracks.length})
                  </span>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    {childTracks.map((track) => {
                      const isActive = progress.activeTrackId === track.id;
                      const isTrackMastered =
                        progress.masteredTracks.includes(track.id);
                      const totalLessons = track.modules.reduce(
                        (acc, m) => acc + m.lessons.length,
                        0
                      );
                      const completedCount = isTrackMastered
                        ? totalLessons
                        : track.modules.reduce(
                            (acc, m) =>
                              acc +
                              m.lessons.filter((l) =>
                                progress.completedLessons.includes(l.id)
                              ).length,
                            0
                          );

                      const unmetReqs = (track.prerequisites ?? [])
                        .map((reqId) =>
                          localizedTracks.find((tr) => tr.id === reqId)
                        )
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

                      return (
                        <div
                          key={track.id}
                          className={`rounded-xl border p-4 flex flex-col justify-between transition ${
                            isActive
                              ? "border-indigo-500 bg-zinc-900"
                              : "border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700"
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl">{track.icon}</span>
                                <div>
                                  <h3 className="font-bold text-sm text-white">
                                    {track.title}
                                  </h3>
                                  <span className="font-mono text-[10px] uppercase text-zinc-400">
                                    {track.category}
                                  </span>
                                </div>
                              </div>

                              {isTrackMastered ? (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                  <Sparkles className="w-3 h-3" />{" "}
                                  {t.roadmap.masteredBadge}
                                </span>
                              ) : isUnlocked ? (
                                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  {t.roadmap.prereqMet}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                  <Lock className="w-3 h-3" /> Requisito
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                              {track.description}
                            </p>

                            {getWhyLearn(track.id) && (
                              <p className="text-[11px] text-emerald-300/90 mt-2 leading-relaxed bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-2.5 py-1.5">
                                <span className="font-mono font-semibold text-emerald-400">
                                  Por que aprender:{" "}
                                </span>
                                {getWhyLearn(track.id)}
                              </p>
                            )}

                            {!isUnlocked && (
                              <div className="mt-3 p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/25 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-300">
                                  <CornerDownRight className="w-3.5 h-3.5 shrink-0" />
                                  <span>
                                    {t.roadmap.prereqPending}{" "}
                                    <strong>
                                      {unmetReqs.map((r) => r.title).join(" + ")}
                                    </strong>
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    for (const req of unmetReqs) {
                                      toggleMasteredTrack(req.id);
                                    }
                                  }}
                                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-[10px] shrink-0 cursor-pointer transition"
                                >
                                  {t.roadmap.unlockPrerequisiteInstant}
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => toggleMasteredTrack(track.id)}
                              className="font-mono text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                            >
                              <FastForward className="w-3 h-3" />
                              {isTrackMastered
                                ? t.roadmap.undoMastered
                                : t.roadmap.iAlreadyKnowThis}
                            </button>

                            <Link
                              href="/"
                              onClick={() => setActiveTrack(track.id)}
                              className={`px-3 py-1.5 rounded-lg font-mono font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                                isActive
                                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
                              }`}
                            >
                              {isActive ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />{" "}
                                  {t.catalog.selected}
                                </>
                              ) : (
                                <>
                                  {t.catalog.openRoadmap}{" "}
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </>
                              )}
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
