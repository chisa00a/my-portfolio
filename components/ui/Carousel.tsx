'use client';

import { MouseEvent, useCallback, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Carousel({
  images,
  alt,
  sizes,
  aspect,
  onStageClick,
}: {
  images: string[];
  alt: string;
  sizes: string;
  aspect?: string;
  /** Fires when the image area itself is clicked (arrows/dots excluded). */
  onStageClick?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const multi = images.length > 1;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length]
  );

  // Stage click opens the lightbox, but never when the click started on an
  // interactive control (arrows / dots).
  const onStage = (e: MouseEvent<HTMLDivElement>) => {
    if (!onStageClick) return;
    if ((e.target as HTMLElement).closest('button')) return;
    onStageClick();
  };

  return (
    <div
      onClick={onStage}
      className={cn(onStageClick && 'cursor-zoom-in')}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-xl border border-line/5',
          aspect ?? 'aspect-[16/10]'
        )}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${alt} — ${i + 1}`}
            fill
            sizes={sizes}
            quality={85}
            className={cn(
              'object-cover object-left-top transition-opacity duration-500',
              i === index ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}

        {multi && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous slide"
              className="glass-strong absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-1.5 text-fg/80 transition hover:scale-110 hover:text-fg"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next slide"
              className="glass-strong absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-1.5 text-fg/80 transition hover:scale-110 hover:text-fg"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === index ? 'w-5 bg-sky' : 'w-1.5 bg-line/20'
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
