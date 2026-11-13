"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Cpu,
  Zap,
  Compass,
  GitPullRequest,
  TerminalSquare,
  Globe,
  BarChart3,
} from "lucide-react";
import { useUserProgress } from "@/lib/progress";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { progress, setUserLocale, t } = useUserProgress();

  const navItems = [
    { href: "/", label: t.nav.roadmap, icon: TerminalSquare },
    { href: "/tracks", label: t.nav.catalog, icon: Compass },
    { href: "/stats", label: t.nav.stats, icon: BarChart3 },
    { href: "/community", label: t.nav.contribute, icon: GitPullRequest },
  ];

  // Hide shell chrome inside active lesson player for focused coding workspace
  const isLessonPlayer = pathname?.startsWith("/lesson/");
  if (isLessonPlayer) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-dvh flex flex-col md:flex-row bg-[#090d16] text-slate-100 relative">
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.09),transparent_65%)]"
      />

      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/80 bg-[#0b101b]/95 p-5 shrink-0 select-none z-10">
        <Link
          href="/"
          className="flex items-center gap-3 px-2.5 py-2 mb-6 rounded-xl hover:bg-slate-900/80 transition"
        >
          <span className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm shadow-sm shadow-emerald-950/50">
            {">_"}
          </span>
          <div>
            <span className="text-lg font-bold tracking-tight text-white block leading-none">
              CodeTrilhas
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-teal-400 mt-1 block">
              open-source::tracks
            </span>
          </div>
        </Link>

        <nav className="flex flex-col gap-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition border ${
                  active
                    ? "bg-emerald-500/12 text-emerald-300 border-emerald-500/35 shadow-sm"
                    : "border-transparent text-slate-400 hover:bg-slate-900/70 hover:text-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Language Selector Box in Sidebar */}
        <div className="mb-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Idioma / Language</span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {SUPPORTED_LOCALES.map((loc) => (
              <button
                key={loc.code}
                type="button"
                onClick={() => setUserLocale(loc.code)}
                title={loc.label}
                className={`py-1.5 rounded-lg font-mono text-xs flex flex-col items-center justify-center border transition cursor-pointer ${
                  progress.locale === loc.code
                    ? "bg-emerald-500/20 border-emerald-500/60 text-white"
                    : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{loc.flag}</span>
                <span className="text-[9px] uppercase mt-0.5">{loc.code}</span>
              </button>
            ))}
          </div>
        </div>

        <Link
          href="/stats"
          className="p-3.5 rounded-xl bg-slate-900/75 border border-slate-800/90 hover:border-emerald-500/40 transition space-y-2.5 block"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              {t.nav.telemetry}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-2 text-center">
              <Flame className="w-3.5 h-3.5 text-amber-400 mx-auto mb-0.5" />
              <span className="text-slate-200 font-semibold">
                {progress.streak}d
              </span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-2 text-center">
              <Zap className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-0.5" />
              <span className="text-slate-200 font-semibold">
                {progress.xp}
              </span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-2 text-center">
              <Cpu className="w-3.5 h-3.5 text-sky-400 mx-auto mb-0.5" />
              <span className="text-slate-200 font-semibold">
                {progress.hearts}/5
              </span>
            </div>
          </div>
        </Link>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0 z-10">
        {/* Top Status Bar */}
        <header className="sticky top-0 z-20 backdrop-blur-md bg-[#090d16]/85 border-b border-slate-800/80 px-4 py-2.5">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
            <Link href="/" className="flex md:hidden items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                {">_"}
              </span>
              <span className="font-bold text-base tracking-tight text-white">
                CodeTrilhas
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="text-emerald-400">~/workspace</span>
              <span>/</span>
              <span className="text-slate-200">{progress.activeTrackId}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 font-mono text-xs">
              {/* Compact Language Select for Mobile & Topbar */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <select
                  aria-label="Idioma"
                  value={progress.locale}
                  onChange={(e) => setUserLocale(e.target.value as Locale)}
                  className="bg-transparent text-slate-200 font-mono text-xs focus:outline-none cursor-pointer"
                >
                  {SUPPORTED_LOCALES.map((loc) => (
                    <option
                      key={loc.code}
                      value={loc.code}
                      className="bg-slate-900 text-slate-100"
                    >
                      {loc.flag} {loc.label}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                href="/stats"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-amber-400 transition"
                title="Streak"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{progress.streak}d</span>
              </Link>
              <Link
                href="/stats"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 transition"
                title="XP"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{progress.xp}</span>
              </Link>
              <div
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-sky-400"
                title="CPU"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>{progress.hearts}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0b101b]/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl font-medium text-[11px] transition ${
                  active
                    ? "text-emerald-400 bg-emerald-500/12"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
