'use client';

import { useEffect, useLayoutEffect, useRef, ReactNode } from 'react';
import { cn, prefersReducedMotion } from '@/lib/utils';

/**
 * Staggered reveal on scroll.
 *
 * Robustness: content is SSR-rendered VISIBLE. The hidden state is only ever
 * applied by client JS in a layout effect (before first paint after hydration),
 * so if hydration ever fails — e.g. a stale page loads chunks from an older
 * build and they 404 — the section content still shows instead of sitting at
 * opacity 0 (which renders as a blank page).
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  once = true,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  /** Seconds to stagger by. */
  delay?: number;
  y?: number;
  once?: boolean;
  as?: 'div' | 'li' | 'section' | 'article' | 'span';
}) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;

    // Only start hidden for elements still below the viewport — above-the-fold
    // content paints immediately, which also avoids any reveal flicker.
    const rect = el.getBoundingClientRect();
    if (rect.top >= window.innerHeight) {
      const baseline = y;
      el.classList.add('reveal-hide');
      el.style.setProperty('--reveal-y', `${baseline}px`);
      el.style.setProperty('--reveal-delay', `${delay}s`);

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.remove('reveal-hide');
              el.classList.add('reveal-show');
              if (once) io.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -60px 0px' }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, once, y]);

  const TagAny = Tag as React.ElementType;

  return (
    <TagAny ref={ref} className={cn(className)}>
      {children}
    </TagAny>
  );
}
