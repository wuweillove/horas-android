import { Capacitor, registerPlugin } from "@capacitor/core";

interface TimerPlugin {
  start(options: { title: string; body: string }): Promise<{ shown: boolean }>;
  update(options: { title: string; body: string }): Promise<void>;
  stop(): Promise<void>;
}

const Timer = registerPlugin<TimerPlugin>("Timer");

let shown = false;

/** Keeps the live clock alive when Android would otherwise freeze the WebView. */
export async function syncClockNotification(title: string, body: string): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    if (!shown) {
      const result = await Timer.start({ title, body });
      shown = result.shown;
      return;
    }
    await Timer.update({ title, body });
  } catch {
    shown = false;
  }
}

export async function stopClockNotification(): Promise<void> {
  if (!Capacitor.isNativePlatform() || !shown) return;
  shown = false;
  try {
    await Timer.stop();
  } catch {
    shown = false;
  }
}
