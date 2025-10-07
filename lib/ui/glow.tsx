import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function Glow({ children, className }: Props) {
  return (
    <div className={`relative ${className || ""}`}>
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-20 blur-2xl" style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(0,229,255,0.15), transparent 60%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}



