import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

/** Light tap on buttons. No-op in the browser. */
export function bindPressHaptics(): () => void {
  if (!Capacitor.isNativePlatform()) return () => undefined;
  const onPointerDown = (event: PointerEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest("button, a")) return;
    void Haptics.impact({ style: ImpactStyle.Light }).catch(() => undefined);
  };
  document.addEventListener("pointerdown", onPointerDown);
  return () => document.removeEventListener("pointerdown", onPointerDown);
}
