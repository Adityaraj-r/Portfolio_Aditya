"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Braces, Database, AudioLines, Layers3 } from "lucide-react";

const disciplines = [
  { name: "Full-stack", icon: Braces, title: "From interface to infrastructure", stack: "React · Next.js · Node.js · Express", note: "Reusable interfaces. Connected APIs. Persistent data.", nodes: ["Interface", "API & services", "Database"], details: ["Thoughtful user experiences", "The logic behind the screen", "Data that connects it all"] },
  { name: "Applied AI", icon: AudioLines, title: "From data to useful intelligence.", stack: "PyTorch · FastAPI · LangGraph", note: "Audio classification and document question answering.", nodes: ["Input & context", "Model & retrieval", "Inference"], details: ["Audio signals and documents", "Representations with meaning", "Answers in the application"] },
  { name: "Backend", icon: Database, title: "The logic behind the experience.", stack: "REST APIs · JWT · MongoDB · SQL", note: "Authentication, database workflows, and connected services.", nodes: ["Request", "Service", "Storage"], details: ["Validate and authenticate", "Connect business workflows", "Read, write, and retrieve"] },
];

export function HeroVisual() {
  const [selected, setSelected] = useState(0);
  const discipline = disciplines[selected];
  return (
    <div className="engineering-sketch">
      <div className="sketch-topline"><span><Layers3 size={14} /> HOW I THINK ABOUT SOFTWARE</span><ArrowUpRight size={16} /></div>
      <div className="sketch-diagram" aria-live="polite">
        {discipline.nodes.map((node, index) => <div className="sketch-step" key={index}>
          <div className="sketch-node"><span className="node-number">0{index + 1}</span><div><strong>{node}</strong><span>{discipline.details[index]}</span></div><span className="node-mark" aria-hidden="true">{index === 0 ? "{ }" : index === 1 ? "↔" : "[ ]"}</span></div>
          {index < 2 && <ArrowDown className="node-connector" size={18} aria-hidden="true" />}
        </div>)}
      </div>
      <div className="sketch-description" aria-live="polite"><h2>{discipline.title}</h2><p>{discipline.stack}</p><span>{discipline.note}</span></div>
      <div className="discipline-switch" role="group" aria-label="Explore my engineering focus">{disciplines.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><item.icon size={14} />{item.name}</button>)}</div>
    </div>
  );
}
