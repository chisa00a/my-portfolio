'use client';

import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { cn, isTouchDevice } from '@/lib/utils';

/**
 * Glass card wrapper with:
 *  - a radial pastel spotlight that follows the cursor
 *    (--mouse-x / --mouse-y CSS variables),
 *  - a subtle 3D perspective tilt (rotateX / rotateY) on hover.
 * Tilt is disabled on touch devices and for reduced-motion users (glow only).
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 6,
}: {
  children: ReactNode;
  className?: string;
  /** Max degrees of tilt on each axis. */
  maxTilt?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const shouldReduce = useReducedMotion();

  const rotXRaw = useSpring(0, { stiffness: 240, damping: 24 });
  const rotYRaw = useSpring(0, { stiffness: 240, damping: 24 });
  const tiltX = useTransform(rotXRaw, (v) => v);
  const tiltY = useTransform(rotYRaw, (v) => v);

  useEffect(() => {
    setEnabled(!isTouchDevice());
  }, []);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const mx = (px / rect.width) * 100;
    const my = (py / rect.height) * 100;
    glow.style.setProperty('--mouse-x', `${mx}%`);
    glow.style.setProperty('--mouse-y', `${my}%`);
    active.current = true;
    if (enabled && !shouldReduce) {
      const nx = (px - rect.width / 2) / (rect.width / 2); // -1 .. 1
      const ny = (py - rect.height / 2) / (rect.height / 2);
      rotYRaw.set(nx * maxTilt);
      rotXRaw.set(-ny * maxTilt);
    }
  };

  const onLeave = () => {
    active.current = false;
    rotXRaw.set(0);
    rotYRaw.set(0);
  };

  return (
    <motion.div
      ref={wrapRef}
      style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
      className={cn('group/tilt relative will-change-transform', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Radial spotlight glow driven by --mouse-x / --mouse-y, revealed on hover */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(186,230,253,0.45), rgba(233,213,255,0.28) 45%, transparent 72%)',
          zIndex: 1,
        }}
      />
      <div className="relative h-full rounded-2xl">{children}</div>
    </motion.div>
  );
}
