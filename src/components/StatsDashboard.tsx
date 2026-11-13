"use client";

import Link from "next/link";
import {
  Flame,
  Zap,
  CheckCircle2,
  Trophy,
  Sparkles,
  Award,
  ArrowRight,
  Cpu,
} from "lucide-react";
import type { LoadedTrack } from "@/lib/schema";
import { useUserProgress } from "@/lib/progress";
import { localizeTracks } from "@/lib/track-i18n";
import type { Locale } from "@/lib/i18n";
import { isTrackSatisfied } from "./SkillTree";

const STATS_COPY: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    levelLabel: string;
    nextLevel: string;
    xpTotal: string;
    streak: string;
    lessonsDone: string;
    tracksDone: string;
    ecosystemProgress: string;
    achievements: string;
    days: string;
    continueBtn: string;
    badgeFirstTitle: string;
    badgeFirstDesc: string;
    badgeStreakTitle: string;
    badgeStreakDesc: string;
    badgeMasterTitle: string;
    badgeMasterDesc: string;
    badgePolyglotTitle: string;
    badgePolyglotDesc: string;
    unlocked: string;
    locked: string;
  }
> = {
  pt: {
    title: "Suas Estatísticas",
    subtitle: "Acompanhe seu nível, ofensiva diária e domínio em cada ecossistema.",
    levelLabel: "Nível",
    nextLevel: "para o próximo nível",
    xpTotal: "XP Acumulado",
    streak: "Ofensiva Atual",
    lessonsDone: "Lições Concluídas",
    tracksDone: "Trilhas Dominadas",
    ecosystemProgress: "Progresso por Linguagem & Conceito",
    achievements: "Conquistas",
    days: "dias",
    continueBtn: "Voltar ao Roadmap",
    badgeFirstTitle: "Primeiro Commit",
    badgeFirstDesc: "Concluiu sua primeira lição no CodeTrails.",
    badgeStreakTitle: "Em Ritmo Constante",
    badgeStreakDesc: "Alcançou 3+ dias seguidos de prática.",
    badgeMasterTitle: "Especialista de Stack",
    badgeMasterDesc: "Concluiu ou declarou domínio em 3+ trilhas.",
    badgePolyglotTitle: "Poliglota Dev",
    badgePolyglotDesc: "Acumulou 100+ XP explorando tecnologias.",
    unlocked: "Desbloqueada",
    locked: "Bloqueada",
  },
  en: {
    title: "Your Statistics",
    subtitle: "Track your developer level, daily streak, and mastery across ecosystems.",
    levelLabel: "Level",
    nextLevel: "to next level",
    xpTotal: "Total XP",
    streak: "Current Streak",
    lessonsDone: "Lessons Completed",
    tracksDone: "Tracks Mastered",
    ecosystemProgress: "Progress by Language & Concept",
    achievements: "Achievements",
    days: "days",
    continueBtn: "Back to Roadmap",
    badgeFirstTitle: "First Commit",
    badgeFirstDesc: "Completed your very first lesson on CodeTrails.",
    badgeStreakTitle: "Consistent Flow",
    badgeStreakDesc: "Reached a 3+ day learning streak.",
    badgeMasterTitle: "Stack Specialist",
    badgeMasterDesc: "Completed or mastered 3+ tracks.",
    badgePolyglotTitle: "Polyglot Dev",
    badgePolyglotDesc: "Earned 100+ XP across technologies.",
    unlocked: "Unlocked",
    locked: "Locked",
  },
  es: {
    title: "Tus Estadísticas",
    subtitle: "Sigue tu nivel, racha diaria y dominio en cada ecosistema.",
    levelLabel: "Nivel",
    nextLevel: "para el siguiente nivel",
    xpTotal: "XP Total",
    streak: "Racha Actual",
    lessonsDone: "Lecciones Completadas",
    tracksDone: "Rutas Dominadas",
    ecosystemProgress: "Progreso por Lenguaje y Concepto",
    achievements: "Logros",
    days: "días",
    continueBtn: "Volver a la Ruta",
    badgeFirstTitle: "Primer Commit",
    badgeFirstDesc: "Completaste tu primera lección en CodeTrails.",
    badgeStreakTitle: "Ritmo Constante",
    badgeStreakDesc: "Alcanzaste una racha de 3+ días.",
    badgeMasterTitle: "Especialista de Stack",
    badgeMasterDesc: "Completaste o dominaste 3+ rutas.",
    badgePolyglotTitle: "Dev Políglota",
    badgePolyglotDesc: "Acumulaste 100+ XP explorando tecnologías.",
    unlocked: "Desbloqueado",
    locked: "Bloqueado",
  },
  zh: {
    title: "学习统计",
    subtitle: "追踪你的开发者等级、连续学习天数以及各技术生态掌握度。",
    levelLabel: "等级",
    nextLevel: "距离下一级",
    xpTotal: "累计 XP",
    streak: "当前连胜",
    lessonsDone: "已完成课程",
    tracksDone: "已掌握路线",
    ecosystemProgress: "各语言与概念进度",
    achievements: "成就徽章",
    days: "天",
    continueBtn: "返回学习路线",
    badgeFirstTitle: "首次提交",
    badgeFirstDesc: "在 CodeTrails 完成了你的第一节课。",
    badgeStreakTitle: "持续精进",
    badgeStreakDesc: "连续学习达到 3 天以上。",
    badgeMasterTitle: "技术栈专家",
    badgeMasterDesc: "完成或掌握 3 条以上学习路线。",
    badgePolyglotTitle: "多语言开发者",
    badgePolyglotDesc: "累计获得 100+ XP。",
    unlocked: "已解锁",
    locked: "未解锁",
  },
  hi: {
    title: "आपके आँकड़े",
    subtitle: "अपना डेवलपर स्तर, दैनिक स्ट्रीक और प्रत्येक भाषा में प्रगति ट्रैक करें।",
    levelLabel: "स्तर",
    nextLevel: "अगले स्तर के लिए",
    xpTotal: "कुल XP",
    streak: "वर्तमान स्ट्रीक",
    lessonsDone: "पूर्ण पाठ",
    tracksDone: "मास्टर किए गए ट्रैक",
    ecosystemProgress: "भाषा और कॉन्सेप्ट के अनुसार प्रगति",
    achievements: "उपलब्धियाँ",
    days: "दिन",
    continueBtn: "रोडमैप पर वापस जाएँ",
    badgeFirstTitle: "पहला कमिट",
    badgeFirstDesc: "CodeTrails पर अपना पहला पाठ पूरा किया।",
    badgeStreakTitle: "निरंतर प्रवाह",
    badgeStreakDesc: "लगातार 3+ दिनों की स्ट्रीक हासिल की।",
    badgeMasterTitle: "स्टैक विशेषज्ञ",
    badgeMasterDesc: "3+ ट्रैक पूरे या मास्टर किए।",
    badgePolyglotTitle: "बहुभाषी डेवलपर",
    badgePolyglotDesc: "100+ XP अर्जित किए।",
    unlocked: "अनलॉक",
    locked: "लॉक",
  },
  fr: {
    title: "Vos Statistiques",
    subtitle: "Suivez votre niveau, votre série quotidienne et votre maîtrise.",
    levelLabel: "Niveau",
    nextLevel: "pour le niveau suivant",
    xpTotal: "XP Total",
    streak: "Série Actuelle",
    lessonsDone: "Leçons Terminées",
    tracksDone: "Parcours Maîtrisés",
    ecosystemProgress: "Progression par Langage & Concept",
    achievements: "Succès",
    days: "jours",
    continueBtn: "Retour au Parcours",
    badgeFirstTitle: "Premier Commit",
    badgeFirstDesc: "Première leçon terminée sur CodeTrails.",
    badgeStreakTitle: "Flux Régulier",
    badgeStreakDesc: "Série de 3+ jours consécutifs atteinte.",
    badgeMasterTitle: "Spécialiste Stack",
    badgeMasterDesc: "3+ parcours terminés ou maîtrisés.",
    badgePolyglotTitle: "Dev Polyglotte",
    badgePolyglotDesc: "100+ XP accumulés.",
    unlocked: "Débloqué",
    locked: "Verrouillé",
  },
  ar: {
    title: "إحصائياتك",
    subtitle: "تابع مستواك وسلسلة أيامك وإتقانك في كل مسار.",
    levelLabel: "المستوى",
    nextLevel: "للمستوى التالي",
    xpTotal: "مجموع XP",
    streak: "السلسلة الحالية",
    lessonsDone: "الدروس المكتملة",
    tracksDone: "المسارات المتقنة",
    ecosystemProgress: "التقدم حسب اللغة والمفهوم",
    achievements: "الإنجازات",
    days: "أيام",
    continueBtn: "العودة للمسار",
    badgeFirstTitle: "أول Commit",
    badgeFirstDesc: "أكملت درسك الأول في CodeTrails.",
    badgeStreakTitle: "استمرار ثابت",
    badgeStreakDesc: "حققت سلسلة 3+ أيام متتالية.",
    badgeMasterTitle: "خبير التقنيات",
    badgeMasterDesc: "أكملت أو أتقنت 3+ مسارات.",
    badgePolyglotTitle: "مطور متعدد اللغات",
    badgePolyglotDesc: "جمعت 100+ XP.",
    unlocked: "مفتوح",
    locked: "مغلق",
  },
  ru: {
    title: "Ваша статистика",
    subtitle: "Отслеживайте уровень, серию дней и прогресс по технологиям.",
    levelLabel: "Уровень",
    nextLevel: "до следующего уровня",
    xpTotal: "Всего XP",
    streak: "Текущая серия",
    lessonsDone: "Уроков пройдено",
    tracksDone: "Треков изучено",
    ecosystemProgress: "Прогресс по языкам и концепциям",
    achievements: "Достижения",
    days: "дн.",
    continueBtn: "Назад к карте",
    badgeFirstTitle: "Первый коммит",
    badgeFirstDesc: "Пройден первый урок в CodeTrails.",
    badgeStreakTitle: "Стабильный темп",
    badgeStreakDesc: "Серия практики 3+ дня подряд.",
    badgeMasterTitle: "Эксперт стека",
    badgeMasterDesc: "Пройдено или изучено 3+ трека.",
    badgePolyglotTitle: "Полиглот",
    badgePolyglotDesc: "Набрано 100+ XP.",
    unlocked: "Открыто",
    locked: "Закрыто",
  },
};

export function StatsDashboard({ tracks }: { tracks: LoadedTrack[] }) {
  const { progress } = useUserProgress();
  const c = STATS_COPY[progress.locale] ?? STATS_COPY.pt;
  const localizedTracks = localizeTracks(tracks, progress.locale);

  const totalLessons = localizedTracks.reduce(
    (acc, tr) => acc + tr.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0),
    0
  );
  const completedLessonsCount = progress.completedLessons.length;
  const satisfiedTracksCount = localizedTracks.filter((tr) =>
    isTrackSatisfied(tr, progress.completedLessons, progress.masteredTracks)
  ).length;

  const level = Math.floor(progress.xp / 100) + 1;
  const xpInCurrentLevel = progress.xp % 100;
  const xpRemaining = 100 - xpInCurrentLevel;

  const baseTracks = localizedTracks.filter(
    (tr) => tr.category === "language" || tr.category === "concept"
  );

  const badges = [
    {
      id: "first",
      icon: CheckCircle2,
      title: c.badgeFirstTitle,
      desc: c.badgeFirstDesc,
      unlocked: completedLessonsCount >= 1,
    },
    {
      id: "streak",
      icon: Flame,
      title: c.badgeStreakTitle,
      desc: c.badgeStreakDesc,
      unlocked: progress.streak >= 3,
    },
    {
      id: "master",
      icon: Sparkles,
      title: c.badgeMasterTitle,
      desc: c.badgeMasterDesc,
      unlocked: satisfiedTracksCount >= 3,
    },
    {
      id: "polyglot",
      icon: Award,
      title: c.badgePolyglotTitle,
      desc: c.badgePolyglotDesc,
      unlocked: progress.xp >= 100,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {c.title}
          </h1>
          <p className="text-sm text-slate-400">{c.subtitle}</p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 hover:bg-emerald-500/25 font-mono text-xs font-semibold text-emerald-300 transition self-start sm:self-auto"
        >
          {c.continueBtn} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Level Banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-emerald-950/30 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                Developer Rank
              </span>
              <h2 className="text-xl font-bold text-white">
                {c.levelLabel} {level}
              </h2>
            </div>
          </div>

          <div className="font-mono text-xs text-slate-300 bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-emerald-400 font-bold">{xpRemaining} XP</span>{" "}
            {c.nextLevel}
          </div>
        </div>

        <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
            style={{ width: `${Math.max(4, xpInCurrentLevel)}%` }}
          />
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 space-y-1.5">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
              {c.xpTotal}
            </span>
            <Zap className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">
            {progress.xp}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 space-y-1.5">
          <div className="flex items-center justify-between text-amber-400">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
              {c.streak}
            </span>
            <Flame className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">
            {progress.streak}{" "}
            <span className="text-xs font-normal text-slate-400">{c.days}</span>
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 space-y-1.5">
          <div className="flex items-center justify-between text-sky-400">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
              {c.lessonsDone}
            </span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">
            {completedLessonsCount}
            <span className="text-sm font-normal text-slate-400">
              /{totalLessons}
            </span>
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 space-y-1.5">
          <div className="flex items-center justify-between text-teal-400">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
              {c.tracksDone}
            </span>
            <Cpu className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">
            {satisfiedTracksCount}
            <span className="text-sm font-normal text-slate-400">
              /{localizedTracks.length}
            </span>
          </p>
        </div>
      </div>

      {/* Progress by Base Language / Concept */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/65 p-5 space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
          {c.ecosystemProgress}
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {baseTracks.map((tr) => {
            const ecoTracks = localizedTracks.filter(
              (sub) => sub.id === tr.id || sub.languageId === tr.id
            );
            const allLessonIds = ecoTracks.flatMap((t) =>
              t.modules.flatMap((m) => m.lessons.map((l) => l.id))
            );
            const isMastered = progress.masteredTracks.includes(tr.id);
            const doneCount = isMastered
              ? allLessonIds.length
              : allLessonIds.filter((id) =>
                  progress.completedLessons.includes(id)
                ).length;
            const pct = Math.round(
              (doneCount / Math.max(1, allLessonIds.length)) * 100
            );

            return (
              <div
                key={tr.id}
                className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg">{tr.icon}</span>
                    <span className="font-semibold text-xs text-slate-100 truncate">
                      {tr.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-emerald-400 shrink-0">
                    {pct}%
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.max(3, pct)}%`,
                      backgroundColor: tr.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/65 p-5 space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
          {c.achievements}
        </h3>

        <div className="grid sm:grid-cols-2 gap-3">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className={`rounded-xl border p-4 flex items-start gap-3.5 transition ${
                  b.unlocked
                    ? "border-emerald-500/40 bg-emerald-950/20"
                    : "border-slate-800/80 bg-slate-950/50 opacity-60"
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg shrink-0 ${
                    b.unlocked
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-white">{b.title}</h4>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                        b.unlocked
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                          : "bg-slate-900 text-slate-500 border-slate-800"
                      }`}
                    >
                      {b.unlocked ? c.unlocked : c.locked}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
