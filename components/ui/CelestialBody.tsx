"use client";

export default function CelestialBody({
  theme,
  onToggle,
  className = "",
}: {
  theme: "dark" | "light";
  onToggle: () => void;
  className?: string;
}) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`cursor-pointer transition-all duration-700 group relative ${className}`}
      style={{
        filter: isDark
          ? "drop-shadow(0 0 14px rgba(230,218,150,0.55)) drop-shadow(0 0 38px rgba(180,150,50,0.22))"
          : undefined,
      }}
    >
      {isDark ? <CrescentMoon /> : <GlowingSun />}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Crescent Moon — unchanged                                           */
/* ------------------------------------------------------------------ */
function CrescentMoon() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" aria-hidden>
      <defs>
        <radialGradient id="cb-moonFace" cx="36%" cy="30%" r="72%">
          <stop offset="0%"   stopColor="#fffde8" />
          <stop offset="38%"  stopColor="#f2e49e" />
          <stop offset="78%"  stopColor="#c8a840" />
          <stop offset="100%" stopColor="#a07820" />
        </radialGradient>
        <mask id="cb-moonMask">
          <rect width="90" height="90" fill="black" />
          <circle cx="45" cy="45" r="33" fill="white" />
          <circle cx="62" cy="38" r="29" fill="black" />
        </mask>
        <radialGradient id="cb-haloGrad" cx="50%" cy="50%" r="50%">
          <stop offset="55%"  stopColor="rgba(255,245,180,0)" />
          <stop offset="100%" stopColor="rgba(255,245,180,0.09)" />
        </radialGradient>
      </defs>

      <circle cx="45" cy="45" r="44" fill="url(#cb-haloGrad)" />
      <circle cx="45" cy="45" r="33" fill="rgba(25,35,75,0.38)" />
      <circle cx="45" cy="45" r="33" fill="url(#cb-moonFace)" mask="url(#cb-moonMask)" />
      <circle cx="45" cy="45" r="33" fill="none" stroke="rgba(255,255,220,0.45)" strokeWidth="1.4" mask="url(#cb-moonMask)" />

      <g mask="url(#cb-moonMask)">
        <circle cx="30" cy="52" r="3.8" fill="none" stroke="rgba(130,95,15,0.28)" strokeWidth="1.1" />
        <circle cx="37" cy="35" r="2.6" fill="none" stroke="rgba(130,95,15,0.22)" strokeWidth="0.9" />
        <circle cx="22" cy="43" r="4.8" fill="none" stroke="rgba(130,95,15,0.18)" strokeWidth="1.0" />
        <circle cx="28" cy="60" r="2.2" fill="none" stroke="rgba(130,95,15,0.16)" strokeWidth="0.8" />
        <circle cx="19" cy="54" r="3.0" fill="none" stroke="rgba(130,95,15,0.14)" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Glowing Sun with animated radiance rings                            */
/* ------------------------------------------------------------------ */
function GlowingSun() {
  const rays = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    long: i % 2 === 0,
  }));

  return (
    <>
      {/* CSS keyframes injected via a style tag — React renders this once */}
      <style>{`
        @keyframes sun-pulse-1 {
          0%, 100% { opacity: 0.18; transform: scale(1);   }
          50%       { opacity: 0.38; transform: scale(1.08); }
        }
        @keyframes sun-pulse-2 {
          0%, 100% { opacity: 0.10; transform: scale(1);   }
          50%       { opacity: 0.25; transform: scale(1.12); }
        }
        @keyframes sun-pulse-3 {
          0%, 100% { opacity: 0.06; transform: scale(1);   }
          50%       { opacity: 0.16; transform: scale(1.16); }
        }
        @keyframes sun-ray-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes sun-core-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255,200,40,0.7))  drop-shadow(0 0 28px rgba(255,120,0,0.4)); }
          50%       { filter: drop-shadow(0 0 18px rgba(255,220,60,0.95)) drop-shadow(0 0 50px rgba(255,100,0,0.55)); }
        }
        .sun-wrapper { animation: sun-core-glow 2.8s ease-in-out infinite; }
        .sun-ring-1  { animation: sun-pulse-1 2.2s ease-in-out infinite; transform-origin: 45px 45px; }
        .sun-ring-2  { animation: sun-pulse-2 3.1s ease-in-out infinite 0.4s; transform-origin: 45px 45px; }
        .sun-ring-3  { animation: sun-pulse-3 4.0s ease-in-out infinite 0.8s; transform-origin: 45px 45px; }
        .sun-rays    { animation: sun-ray-spin 18s linear infinite; transform-origin: 45px 45px; }
      `}</style>

      {/* Pulsing radiance rings — rendered outside the main SVG so they can overflow */}
      <div className="sun-wrapper relative inline-flex items-center justify-center">
        <svg width="130" height="130" viewBox="0 0 130 130" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden>
          <defs>
            <radialGradient id="cb-ring1" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="rgba(255,200,60,0)" />
              <stop offset="100%" stopColor="rgba(255,180,30,0.35)" />
            </radialGradient>
            <radialGradient id="cb-ring2" cx="50%" cy="50%" r="50%">
              <stop offset="55%" stopColor="rgba(255,150,20,0)" />
              <stop offset="100%" stopColor="rgba(255,120,10,0.22)" />
            </radialGradient>
            <radialGradient id="cb-ring3" cx="50%" cy="50%" r="50%">
              <stop offset="50%" stopColor="rgba(255,100,0,0)" />
              <stop offset="100%" stopColor="rgba(255,80,0,0.12)" />
            </radialGradient>
          </defs>
          <circle cx="65" cy="65" r="56" fill="url(#cb-ring3)" className="sun-ring-3" />
          <circle cx="65" cy="65" r="48" fill="url(#cb-ring2)" className="sun-ring-2" />
          <circle cx="65" cy="65" r="40" fill="url(#cb-ring1)" className="sun-ring-1" />
        </svg>

        {/* Core sun SVG */}
        <svg width="90" height="90" viewBox="0 0 90 90" aria-hidden>
          <defs>
            <radialGradient id="cb-sunDisk" cx="42%" cy="38%" r="58%">
              <stop offset="0%"   stopColor="#ffffff" />
              <stop offset="15%"  stopColor="#fff9b0" />
              <stop offset="40%"  stopColor="#ffce00" />
              <stop offset="70%"  stopColor="#ff8800" />
              <stop offset="100%" stopColor="#c84000" />
            </radialGradient>
            <radialGradient id="cb-sunBloom" cx="38%" cy="35%" r="52%">
              <stop offset="0%"   stopColor="rgba(255,255,248,0.92)" />
              <stop offset="55%"  stopColor="rgba(255,255,220,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,200,0)" />
            </radialGradient>
            <radialGradient id="cb-haze" cx="50%" cy="50%" r="50%">
              <stop offset="72%"  stopColor="rgba(255,170,30,0)" />
              <stop offset="100%" stopColor="rgba(255,160,20,0.28)" />
            </radialGradient>
          </defs>

          {/* Rotating ray group */}
          <g className="sun-rays">
            {rays.map(({ angle, long }) => {
              const rad = (angle * Math.PI) / 180;
              const r0 = 23;
              const r1 = long ? 41 : 32;
              return (
                <line
                  key={angle}
                  x1={45 + Math.cos(rad) * r0}
                  y1={45 + Math.sin(rad) * r0}
                  x2={45 + Math.cos(rad) * r1}
                  y2={45 + Math.sin(rad) * r1}
                  stroke={long ? "#ffaa00" : "#ffdd44"}
                  strokeWidth={long ? 2.8 : 1.6}
                  strokeLinecap="round"
                  opacity={long ? 0.85 : 0.52}
                />
              );
            })}
          </g>

          {/* Diffuse disk haze */}
          <circle cx="45" cy="45" r="26" fill="url(#cb-haze)" />
          {/* Main disk */}
          <circle cx="45" cy="45" r="21" fill="url(#cb-sunDisk)" />
          {/* Inner bloom */}
          <circle cx="45" cy="45" r="17" fill="url(#cb-sunBloom)" />
        </svg>
      </div>
    </>
  );
}
