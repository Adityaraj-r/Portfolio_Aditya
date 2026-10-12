"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

type PresentationMode = "recruiter" | "engineer";
type PresentationModeContextValue = { mode: PresentationMode; setMode: (mode: PresentationMode) => void };
const PresentationModeContext = createContext<PresentationModeContextValue | null>(null);
const subscribeToNothing = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function PresentationModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PresentationMode>("recruiter");
  return <PresentationModeContext.Provider value={{ mode, setMode }}><div className="portfolio-shell" data-presentation-mode={mode}>{children}</div></PresentationModeContext.Provider>;
}

export function PresentationModeSwitch() {
  const context = useContext(PresentationModeContext);
  const enhanced = useSyncExternalStore(subscribeToNothing, getClientSnapshot, getServerSnapshot);

  if (!context) return null;

  return (
    <div className="presentation-mode" role="group" aria-label="Portfolio presentation mode" hidden={!enhanced}>
      <span className="presentation-mode-label">View:</span>
      <button type="button" aria-pressed={context.mode === "recruiter"} onClick={() => context.setMode("recruiter")}>Recruiter</button>
      <button type="button" aria-pressed={context.mode === "engineer"} onClick={() => context.setMode("engineer")}>Engineer</button>
    </div>
  );
}
