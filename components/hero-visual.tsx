"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function HeroVisual() {
  const scene = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !scene.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    scene.current.style.setProperty("--tilt-x", `${y * -8}deg`);
    scene.current.style.setProperty("--tilt-y", `${x * 10}deg`);
  }

  function resetPointer() {
    scene.current?.style.setProperty("--tilt-x", "0deg");
    scene.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div className="hero-scene-wrap" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <div className="hero-scene" ref={scene} aria-hidden="true">
        <div className="scene-orbit scene-orbit-one" />
        <div className="scene-orbit scene-orbit-two" />
        <div className="scene-core"><span>AR</span><i /></div>
        <span className="scene-node scene-node-api">API</span>
        <span className="scene-node scene-node-data">DATA</span>
        <span className="scene-node scene-node-ai">AI</span>
        <span className="scene-connector scene-connector-one" />
        <span className="scene-connector scene-connector-two" />
        <span className="scene-connector scene-connector-three" />
      </div>
      <p className="scene-caption"><span className="eyebrow-mark" /> SYSTEMS IN MOTION</p>
    </div>
  );
}
