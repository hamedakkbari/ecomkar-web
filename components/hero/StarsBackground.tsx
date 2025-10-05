'use client';

export default function StarsBackground() {
  // Render 20 shooting stars
  return (
    <div className="night" aria-hidden>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="shooting_star" />
      ))}
    </div>
  );
}


