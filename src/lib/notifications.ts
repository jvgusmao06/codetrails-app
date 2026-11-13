"use client";

import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

export interface ReminderSettings {
  enabled: boolean;
  hour: number;
  minute: number;
}

const REMINDER_KEY = "opencode_duo_reminder_v1";
const REMINDER_NOTIFICATION_ID = 1001;

const DEFAULT_REMINDER: ReminderSettings = {
  enabled: false,
  hour: 20,
  minute: 0,
};

export function loadReminderSettings(): ReminderSettings {
  if (typeof window === "undefined") return DEFAULT_REMINDER;
  try {
    const raw = window.localStorage.getItem(REMINDER_KEY);
    if (!raw) return DEFAULT_REMINDER;
    const parsed = JSON.parse(raw);
    return {
      enabled: Boolean(parsed.enabled),
      hour:
        typeof parsed.hour === "number" && parsed.hour >= 0 && parsed.hour <= 23
          ? parsed.hour
          : 20,
      minute:
        typeof parsed.minute === "number" &&
        parsed.minute >= 0 &&
        parsed.minute <= 59
          ? parsed.minute
          : 0,
    };
  } catch {
    return DEFAULT_REMINDER;
  }
}

function saveReminderSettings(settings: ReminderSettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REMINDER_KEY, JSON.stringify(settings));
}

export function isNativeApp(): boolean {
  if (typeof window === "undefined") return false;
  return Capacitor.isNativePlatform();
}

export async function enableDailyReminder(
  hour: number,
  minute: number,
  title: string,
  body: string
): Promise<{ ok: boolean; native: boolean; reason?: string }> {
  const next: ReminderSettings = { enabled: true, hour, minute };

  if (!isNativeApp()) {
    saveReminderSettings(next);
    return { ok: true, native: false };
  }

  try {
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== "granted") {
      saveReminderSettings({ ...next, enabled: false });
      return { ok: false, native: true, reason: "permission_denied" };
    }

    await LocalNotifications.cancel({
      notifications: [{ id: REMINDER_NOTIFICATION_ID }],
    });

    await LocalNotifications.schedule({
      notifications: [
        {
          id: REMINDER_NOTIFICATION_ID,
          title,
          body,
          schedule: {
            on: { hour, minute },
            repeats: true,
            allowWhileIdle: true,
          },
        },
      ],
    });

    saveReminderSettings(next);
    return { ok: true, native: true };
  } catch {
    return { ok: false, native: true, reason: "schedule_failed" };
  }
}

export async function disableDailyReminder(): Promise<void> {
  const current = loadReminderSettings();
  saveReminderSettings({ ...current, enabled: false });

  if (!isNativeApp()) return;

  try {
    await LocalNotifications.cancel({
      notifications: [{ id: REMINDER_NOTIFICATION_ID }],
    });
  } catch {
    // Ignore cancellation errors if notification wasn't scheduled
  }
}
