import { ImageResponse } from "next/og";

export const alt = "Aditya Raj — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "88px", background: "#08090B", color: "#F4F6F8", fontFamily: "sans-serif", border: "1px solid #282D35" }}><div style={{ color: "#69E6B1", fontSize: 22, letterSpacing: 5, marginBottom: 32 }}>PORTFOLIO / SOFTWARE ENGINEERING</div><div style={{ display: "flex", alignItems: "baseline", fontSize: 86, fontWeight: 700, letterSpacing: -4 }}>Aditya Raj<span style={{ color: "#69E6B1" }}>.</span></div><div style={{ fontSize: 32, color: "#A1A7B3", marginTop: 20 }}>Full-Stack Developer</div><div style={{ width: 120, height: 4, background: "#69E6B1", marginTop: 44 }} /></div>, size);
}
