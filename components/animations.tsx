"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = element.current;
    if (!target || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        target.animate([{ transform: "translateY(12px)" }, { transform: "translateY(0)" }], { duration: 450, delay: delay * 1000, easing: "cubic-bezier(.22,1,.36,1)" });
        observer.unobserve(target);
      }
    }, { threshold: .1 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={element} className={className}>{children}</div>;
}
