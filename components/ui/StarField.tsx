"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number; y: number;
  r: number;
  a: number; ad: number; spd: number;
  vx: number; vy: number;
  driftA: number;
  driftSpd: number;
}

export default function StarField({
  maxYFrac = 1,
  blur = false,
}: {
  maxYFrac?: number;
  blur?: boolean;
}) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const pts = useRef<Particle[]>([]);
  const mxRef = useRef(-9999);
  const myRef = useRef(-9999);
  const rafRef = useRef(0);
  const dw = useRef(0);
  const dh = useRef(0);
  const maxYFracRef = useRef(maxYFrac);

  useEffect(() => {
    maxYFracRef.current = maxYFrac;
  }, [maxYFrac]);

  const spawn = useCallback((w: number, h: number) => {
    const skyH = h * maxYFracRef.current;
    const n = Math.max(130, Math.min(220, Math.floor((w * skyH) / 4800)));
    pts.current = Array.from({ length: n }, () => {
      const driftA = Math.random() * 6.283;
      const driftSpd = 0.14 + Math.random() * 0.22;
      return {
        x: Math.random() * w,
        y: Math.random() * skyH,
        r: 0.5 + Math.random() * 1.8,
        a: 0.15 + Math.random() * 0.85,
        ad: Math.random() > 0.5 ? 1 : -1,
        spd: 0.004 + Math.random() * 0.012,
        vx: Math.cos(driftA) * driftSpd,
        vy: Math.sin(driftA) * driftSpd,
        driftA,
        driftSpd,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fit = () => {
      const el = canvas.parentElement;
      const w = el ? el.clientWidth : window.innerWidth;
      const h = el ? el.clientHeight : window.innerHeight;
      if (w === dw.current && h === dh.current) return;
      canvas.width = w;
      canvas.height = h;
      dw.current = w;
      dh.current = h;
      spawn(w, h);
    };

    fit();
    const ro = new ResizeObserver(fit);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mxRef.current = e.clientX - rect.left;
      myRef.current = e.clientY - rect.top;
    };
    const onLeave = () => {
      mxRef.current = -9999;
      myRef.current = -9999;
    };
    const onBang = (e: MouseEvent) => {
      if ((e.target as Element).closest("button,a,input,select")) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      pts.current.forEach((p) => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d = Math.hypot(dx, dy);
        if (d < 170) {
          const f = ((170 - d) / 170) * 12;
          const ang = Math.atan2(dy, dx);
          p.vx += Math.cos(ang) * f;
          p.vy += Math.sin(ang) * f;
        }
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onBang);

    const isDark = true;
    const [cr, cg, cb] = [255, 248, 210];
    const [glr, glg, glb] = [212, 175, 55];

    const loop = () => {
      ctx.clearRect(0, 0, dw.current, dh.current);
      const mx = mxRef.current;
      const my = myRef.current;
      const skyH = dh.current * maxYFracRef.current;
      const W = dw.current;

      pts.current.forEach((p) => {
        // Twinkle
        p.a += p.spd * p.ad;
        if (p.a > 1) { p.a = 1; p.ad = -1; }
        if (p.a < 0.07) { p.a = 0.07; p.ad = 1; }

        // Very slow drift direction wander
        p.driftA += (Math.random() - 0.5) * 0.004;

        // Base drift velocity — stars always drift in their current direction
        const bdvx = Math.cos(p.driftA) * p.driftSpd;
        const bdvy = Math.sin(p.driftA) * p.driftSpd;

        // Hover repel adds to excess velocity
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy);
        if (d < 88 && d > 0) {
          const f = ((88 - d) / 88) * 0.6;
          const ang = Math.atan2(dy, dx);
          p.vx += Math.cos(ang) * f;
          p.vy += Math.sin(ang) * f;
        }

        // Excess = deviation above the base drift; dampen only excess so drift persists
        const exvx = p.vx - bdvx;
        const exvy = p.vy - bdvy;
        p.vx = bdvx + exvx * 0.85;
        p.vy = bdvy + exvy * 0.85;

        p.x += p.vx;
        p.y += p.vy;

        // Seamless wrap-around — stars exit one edge, reappear on the other
        const m = p.r * 6;
        if (p.x < -m) p.x = W + m;
        else if (p.x > W + m) p.x = -m;
        if (p.y < -m) p.y = skyH + m;
        else if (p.y > skyH + m) p.y = -m;

        // Outer glow halo
        const glowR = p.r * 5;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grad.addColorStop(0, `rgba(${glr},${glg},${glb},${p.a * 0.32})`);
        grad.addColorStop(1, `rgba(${glr},${glg},${glb},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, 6.283);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${p.a})`;
        ctx.fill();

        // Bright sparkle for larger stars in dark mode
        if (isDark && p.r > 1.25) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.33, 0, 6.283);
          ctx.fillStyle = `rgba(255,255,255,${p.a * 0.88})`;
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onBang);
    };
  }, [spawn]);

  return (
    <canvas
      ref={cvs}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-700 ${
        blur ? "blur-[6px] opacity-35" : ""
      }`}
      style={{ zIndex: 0 }}
    />
  );
}
