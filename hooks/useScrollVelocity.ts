'use client';

import { useEffect, useRef } from 'react';

/**
 * Smoothed vertical scroll velocity in px/frame (lerped), exposed through a
 * ref so the canvas render loop can read it without re-rendering React.
 */
export function useScrollVelocity(): React.MutableRefObject<number> {
  const velocity = useRef<number>(0);
  const target = useRef<number>(0);
  const lastY = useRef<number>(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      const y = window.scrollY;
      target.current = Math.min(Math.abs(y - lastY.current), 60);
      lastY.current = y;
    };

    const loop = () => {
      // exponential smoothing so the energy boost feels analog
      target.current *= 0.9;
      velocity.current += (target.current - velocity.current) * 0.12;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return velocity;
}
