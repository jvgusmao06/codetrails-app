"use client";

import { useEffect, useState } from "react";
import { type Locale, UI_DICTIONARIES } from "./i18n";

export interface UserProgress {
  xp: number;
  streak: number;
  hearts: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  activeTrackId: string;
  locale: Locale;
  completedLessons: string[]; // lesson IDs
  masteredTracks: string[]; // track IDs where the user declared "I already know this"
}

const STORAGE_KEY = "opencode_duo_progress_v1";

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  streak: 1,
  hearts: 5,
  lastActiveDate: null,
  activeTrackId: "python-basics",
  locale: "pt",
  completedLessons: [],
  masteredTracks: [],
};

// ponytail: lightweight Web Audio synth + native navigator.vibrate avoids external audio assets
export function triggerFeedbackEffect(type: "success" | "error" | "complete") {
  if (typeof window === "undefined") return;

  try {
    if ("vibrate" in navigator) {
      if (type === "success") navigator.vibrate(30);
      else if (type === "error") navigator.vibrate([50, 40, 60]);
      else if (type === "complete") navigator.vibrate([40, 30, 40, 30, 80]);
    }
  } catch {
    // Ignore vibration errors on unsupported devices
  }

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "error") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.setValueAtTime(174.61, now + 0.1); // F3
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);
    } else if (type === "complete") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.5, now + 0.3); // C6
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.start(now);
      osc.stop(now + 0.55);
    }
  } catch {
    // AudioContext blocked or unsupported
  }
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      masteredTracks: Array.isArray(parsed.masteredTracks)
        ? parsed.masteredTracks
        : [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(next: UserProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("opencode-progress-updated"));
}

export function completeLessonProgress(lessonId: string, earnedXp: number) {
  const current = loadProgress();
  const today = new Date().toISOString().slice(0, 10);

  let nextStreak = current.streak;
  if (current.lastActiveDate && current.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .slice(0, 10);
    nextStreak = current.lastActiveDate === yesterday ? current.streak + 1 : 1;
  }

  const completedLessons = current.completedLessons.includes(lessonId)
    ? current.completedLessons
    : [...current.completedLessons, lessonId];

  const updated: UserProgress = {
    ...current,
    xp: current.xp + earnedXp,
    streak: nextStreak,
    hearts: 5, // Refill hearts on completion
    lastActiveDate: today,
    completedLessons,
  };

  saveProgress(updated);
  return updated;
}

export function setActiveTrack(trackId: string) {
  const current = loadProgress();
  saveProgress({ ...current, activeTrackId: trackId });
}

export function toggleMasteredTrack(trackId: string) {
  const current = loadProgress();
  const isAlreadyMastered = current.masteredTracks.includes(trackId);
  const masteredTracks = isAlreadyMastered
    ? current.masteredTracks.filter((id) => id !== trackId)
    : [...current.masteredTracks, trackId];

  saveProgress({ ...current, masteredTracks });
  triggerFeedbackEffect("success");
}

export function setUserLocale(locale: Locale) {
  const current = loadProgress();
  saveProgress({ ...current, locale });
}

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);

    const handleUpdate = () => setProgress(loadProgress());
    window.addEventListener("opencode-progress-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("opencode-progress-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const t = UI_DICTIONARIES[progress.locale] ?? UI_DICTIONARIES.pt;

  return {
    progress,
    hydrated,
    setActiveTrack,
    toggleMasteredTrack,
    setUserLocale,
    t,
  };
}
