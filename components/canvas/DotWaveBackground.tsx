'use client';

import { useEffect, useRef } from 'react';

/**
 * DotWaveBackground — the signature ambient backdrop.
 *
 * A full-screen grid of small pastel dots that ride a gentle sine wave and
 * drift with time. Dots react to the pointer by being pushed slightly away
 * (soft repulsion), creating a subtle ripple as the cursor passes over them.
 *
 * - Fixed to the viewport behind all content (z-index -1), pointer-events none.
 * - Colors drift horizontally through pastel peach → baby-blue (→ mint).
 * - Overall opacity kept low (~0.35) so content always wins.
 * - Honors prefers-reduced-motion (renders a calm static field).
 * - Pauses when the tab is hidden; DPR-aware and resize-safe.
 */

const GAP = 30; // px between dots (CSS px)
const BASE_R = 1.5; // resting dot radius (CSS px)
const AMP = 9; // sine wave amplitude (CSS px)
const WAVE_SPEED = 0.55; // radians of time per second — slow, breathing
const WAVE_LEN = 0.011; // horizontal frequency (radians per px)
const HOVER_R = 130; // pointer influence radius (CSS px)
const PUSH = 16; // max displacement from the cursor (CSS px)
const ALPHA = 0.38; // global dot opacity (subtle, never distracting)

// Pastel stops the dots drift through, left → right.
const STOPS: [number, number, number][] = [
  [255, 216, 203], // #FFD8CB peach
  [186, 230, 253], // #BAE6FD baby blue
  [167, 243, 208], // #A7F3D0 mint
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function DotWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Per-dot static data computed on resize: base position + color.
    type Dot = { x: number; y: number; phase: number; color: string };
    let dots: Dot[] = [];

    const pointer = { x: -9999, y: -9999, active: false };

    const buildField = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      dots = [];
      const cols = Math.ceil(width / GAP) + 1;
      const rows = Math.ceil(height / GAP) + 1;
      const span = Math.max(width - GAP, 1);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * GAP + GAP / 2;
          const y = row * GAP + GAP / 2;

          // Color: horizontal gradient peach → baby blue, with a soft mint
          // bias near the bottom so the field feels airy and never uniform.
          const gt = Math.min(Math.max((x - GAP / 2) / span, 0), 1) * (STOPS.length - 1);
          const gi = Math.min(Math.floor(gt), STOPS.length - 2);
          const gf = gt - gi;
          const mintMix = Math.min(Math.max((y / Math.max(height, 1)) - 0.55, 0) * 2.2, 1);
          const c0 = STOPS[gi];
          const c1 = STOPS[gi + 1];
          const r = Math.round(lerp(lerp(c0[0], c1[0], gf), STOPS[2][0], mintMix));
          const g = Math.round(lerp(lerp(c0[1], c1[1], gf), STOPS[2][1], mintMix));
          const b = Math.round(lerp(lerp(c0[2], c1[2], gf), STOPS[2][2], mintMix));

          dots.push({
            x,
            y,
            phase: x * WAVE_LEN + (row % 2 ? Math.PI / 2 : 0), // alternate rows offset
            color: `rgba(${r},${g},${b},${ALPHA})`,
          });
        }
      }
    };

    const draw = (timeMs: number) => {
      const t = (timeMs / 1000) * WAVE_SPEED;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (const dot of dots) {
        // Gentle sine wave — dots drift up and down, breathing over time.
        const wave = Math.sin(dot.phase + t * Math.PI) * AMP;

        // Pointer repulsion — dots yield slightly as the cursor passes.
        let dy = wave;
        let r = BASE_R + Math.sin(dot.phase + t * Math.PI) * 0.4;
        if (pointer.active) {
          const dxp = dot.x - pointer.x;
          const dyp = dot.y - pointer.y;
          const dist = Math.sqrt(dxp * dxp + dyp * dyp);
          if (dist < HOVER_R && dist > 0.001) {
            const falloff = (t: number) => (1 - t) * (1 - t);
            const push = falloff(dist / HOVER_R) * PUSH;
            dy += (dyp / dist) * push;
            r += falloff(dist / HOVER_R) * 0.9; // dots brighten a touch near the cursor
          }
        }

        ctx.beginPath();
        ctx.fillStyle = dot.color;
        ctx.arc(dot.x, dot.y + dy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (timeMs: number) => {
      draw(timeMs);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const staticFrame = () => draw(0);

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduced) start();
    };

    buildField();
    staticFrame(); // paint the first frame immediately (rAF may be suppressed)
    if (!reduced) start();

    window.addEventListener('resize', buildField);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', buildField);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[-1] h-full w-full"
    />
  );
}
