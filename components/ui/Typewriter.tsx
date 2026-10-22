'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/context/LangProvider';
import { Pair } from '@/lib/i18n';
import { siteMetadata } from '@/data/content';

const TYPE_MS = 55;
const DELETE_MS = 30;
const HOLD_MS = 1700;

export default function Typewriter({ className }: { className?: string }) {
  const { t } = useLang();
  const phrases: Pair[] = siteMetadata.rolePairs;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  // Evaluated after mount only, so SSR markup can never diverge.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Reduced motion: show the first role statically.
  useEffect(() => {
    if (reduced) {
      setText(t(phrases[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, t]);

  useEffect(() => {
    if (reduced) return;
    const current = t(phrases[index % phrases.length]);
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      const step = deleting ? DELETE_MS : TYPE_MS;
      timer = setTimeout(
        () =>
          setText(
            deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
          ),
        step
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, t, reduced]);

  return (
    <p
      className={className}
      aria-live="off"
      aria-label="role"
      lang="en"
      suppressHydrationWarning
    >
      {text}
      <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-sky" aria-hidden="true" />
    </p>
  );
}
