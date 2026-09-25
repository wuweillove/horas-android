import { useEffect, useRef } from "react";

const stack: Array<() => void> = [];

/** Register a layer the Android back button should close before leaving the screen. */
export function useDismiss(open: boolean, close: () => void) {
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    if (!open) return;
    const run = () => closeRef.current();
    stack.push(run);
    return () => {
      const index = stack.lastIndexOf(run);
      if (index >= 0) stack.splice(index, 1);
    };
  }, [open]);
}

export function dismissTop(): boolean {
  const close = stack[stack.length - 1];
  if (!close) return false;
  close();
  return true;
}
