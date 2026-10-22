'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn, prefersReducedMotion } from '@/lib/utils';

const SWIPE_THRESHOLD = 60;

export default function Lightbox({
  images,
  caption,
  startIndex,
  onClose,
}: {
  images: string[];
  caption: string;
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(startIndex, 0), Math.max(images.length - 1, 0))
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const reduced = useRef(prefersReducedMotion());

  const total = images.length;
  const multi = total > 1;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + total) % total);
    },
    [total]
  );

  // Close on Escape / navigate with arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight' && multi) {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' && multi) {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Tab') {
        // Focus trap
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button, [href], input, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled'));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [go, multi, onClose]);

  // Body scroll lock while open
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  // Swipe
  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (!multi) return;
      if (info.offset.x < -SWIPE_THRESHOLD) go(1);
      else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
    },
    [go, multi]
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced.current ? 0 : 0.25 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={caption}
        className="relative z-10 flex h-full w-full max-w-6xl flex-col px-4 py-6 sm:px-8"
      >
        {/* Top bar: caption + counter + close */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-widest text-white/70 truncate">
              {caption}
            </p>
            {multi && (
              <p className="mt-1 font-mono text-xs text-white/50" aria-live="polite">
                {index + 1} / {total}
              </p>
            )}
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close"
            className="glass-strong shrink-0 rounded-full p-2.5 text-white/80 transition hover:scale-110 hover:text-white"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Image stage */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          {multi && (
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="glass-strong absolute left-0 z-20 rounded-full p-2.5 text-white/80 transition hover:scale-110 hover:text-white sm:-left-2"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={onDragEnd}
              className="relative flex h-full max-h-[72vh] w-full items-center justify-center touch-pan-y"
              initial={{ opacity: 0, scale: reduced.current ? 1 : 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduced.current ? 1 : 0.94 }}
              transition={{ duration: reduced.current ? 0 : 0.22, ease: 'easeOut' }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={images[index]}
                  alt={`${caption} — image ${index + 1} of ${total}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1152px"
                  className="object-contain"
                  priority={index === startIndex}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {multi && (
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="glass-strong absolute right-0 z-20 rounded-full p-2.5 text-white/80 transition hover:scale-110 hover:text-white sm:-right-2"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Swipe hint (touch devices) */}
        {multi && (
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-white/40 sm:hidden">
            ← swipe →
          </p>
        )}

        {/* Thumbnail strip */}
        {multi && (
          <div
            className="mt-4 flex items-center justify-center gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Image thumbnails"
          >
            {images.map((src, i) => (
              <button
                key={src}
                role="tab"
                aria-selected={i === index}
                aria-label={`View image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border transition',
                  i === index
                    ? 'border-violet ring-2 ring-violet/50'
                    : 'border-white/10 opacity-60 hover:opacity-100'
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Dot indicators */}
        {multi && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === index ? 'w-6 bg-gradient-to-r from-cyan to-violet' : 'w-1.5 bg-white/30'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
