"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ProjectExpansion({
  children,
  additionalCount,
  featuredCount,
}: {
  children: ReactNode;
  additionalCount: number;
  featuredCount: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="project-expansion">
      <div
        id="additional-projects"
        className="project-expansion-content"
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="additional-projects-grid"
              className="project-expansion-grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        className="project-expansion-button"
        type="button"
        aria-expanded={expanded}
        aria-controls="additional-projects"
        onClick={() => setExpanded((current) => !current)}
      >
        <span className="project-expansion-label">
          {expanded ? "Show Featured Projects" : "See All Projects"}
        </span>
        <span className="project-expansion-count">
          {expanded ? `${featuredCount} featured` : `${featuredCount + additionalCount} projects`}
        </span>
        {expanded ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
      </button>
    </div>
  );
}
