"use client";

import { useState, useSyncExternalStore } from "react";
import { Bell, BellOff } from "lucide-react";
import {
  disableDailyReminder,
  enableDailyReminder,
  isNativeApp,
  loadReminderSettings,
} from "@/lib/notifications";
import { useUserProgress } from "@/lib/progress";

const COPY = {
  pt: {
    title: "Lembrete Diário de Ofensiva",
    descNative: "Receba uma notificação local todo dia para manter seu streak.",
    descWeb:
      "Preferência salva localmente. Notificações nativas disparam no app Android/iOS.",
    notifTitle: "Hora de praticar no CodeTrails!",
    notifBody: "Mantenha sua ofensiva diária completando uma lição rápida.",
    enabled: "Ativado",
    disabled: "Desativado",
    denied: "Permissão de notificação negada no dispositivo.",
  },
  en: {
    title: "Daily Streak Reminder",
    descNative: "Get a daily local notification to keep your streak alive.",
    descWeb:
      "Preference saved locally. Native notifications fire on the Android/iOS app.",
    notifTitle: "Time to practice on CodeTrails!",
    notifBody: "Keep your daily streak alive with a quick lesson.",
    enabled: "Enabled",
    disabled: "Disabled",
    denied: "Notification permission denied on this device.",
  },
} as const;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

const emptySubscribe = () => () => {};

export function ReminderCard() {
  const { progress } = useUserProgress();
  const c = progress.locale === "pt" ? COPY.pt : COPY.en;

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const initial = isClient
    ? loadReminderSettings()
    : { enabled: false, hour: 20, minute: 0 };

  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const effectiveEnabled = enabled ?? initial.enabled;
  const effectiveTime = time ?? `${pad2(initial.hour)}:${pad2(initial.minute)}`;
  const native = isClient && isNativeApp();

  async function applyReminder(nextEnabled: boolean, nextTime: string) {
    setError(null);
    const [hStr, mStr] = nextTime.split(":");
    const hour = Number(hStr);
    const minute = Number(mStr);

    if (!nextEnabled) {
      await disableDailyReminder();
      setEnabled(false);
      return;
    }

    const res = await enableDailyReminder(
      hour,
      minute,
      c.notifTitle,
      c.notifBody
    );
    if (!res.ok) {
      setEnabled(false);
      setError(c.denied);
      return;
    }
    setEnabled(true);
  }

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-slate-900/65 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <div
          className={`p-2.5 rounded-xl border shrink-0 ${
            effectiveEnabled
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
              : "bg-slate-800/80 border-slate-700 text-slate-400"
          }`}
        >
          {effectiveEnabled ? (
            <Bell className="w-5 h-5" />
          ) : (
            <BellOff className="w-5 h-5" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-sm text-white">{c.title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {native ? c.descNative : c.descWeb}
          </p>
          {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <input
          type="time"
          value={effectiveTime}
          onChange={(e) => {
            const val = e.target.value || "20:00";
            setTime(val);
            if (effectiveEnabled) void applyReminder(true, val);
          }}
          className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-emerald-500/60"
        />

        <button
          type="button"
          onClick={() => void applyReminder(!effectiveEnabled, effectiveTime)}
          className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold border transition cursor-pointer ${
            effectiveEnabled
              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30"
              : "bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-500"
          }`}
        >
          {effectiveEnabled ? c.enabled : c.disabled}
        </button>
      </div>
    </div>
  );
}
