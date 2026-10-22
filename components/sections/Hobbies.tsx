'use client';

import Image from 'next/image';
import { ExternalLink, FileCode, Music, ShieldCheck, Users, ZoomIn, Mic } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import { cn } from '@/lib/utils';
import { useLang } from '@/context/LangProvider';
import { useLightbox } from '@/context/LightboxProvider';
import { hobbyCaptions, hobbies, sectionHeaders } from '@/data/content';

const iconMap = {
  music: Music,
  users: Users,
  mic: Mic,
  shield: ShieldCheck,
  code: FileCode,
} as const;

export default function Hobbies() {
  const { t } = useLang();
  const { open } = useLightbox();
  const header = sectionHeaders.hobbies;

  // In a 2-col grid the last card would sit alone only when count is odd
  // (5 cards → card 5 spans full width).
  const wideCardIndex = hobbies.length % 2 === 1 ? hobbies.length - 1 : -1;

  return (
    <section id="hobbies" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index={header.index}
          eyebrow={header.eyebrow.en}
          title={header.title}
          subtitle={header.subtitle}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {hobbies.map((hobby, i) => {
            const Icon = iconMap[hobby.icon];
            const caption = hobbyCaptions[i] ?? hobby.title.th;
            return (
              <Reveal
                key={hobby.title.en}
                delay={(i % 2) * 0.1}
                className={cn('h-full', i === wideCardIndex && 'md:col-span-2')}
              >
                <TiltCard className="h-full">
                  <article className="card-soft flex h-full flex-col overflow-hidden">
                    {/* Image with zoom overlay → lightbox */}
                    <button
                      type="button"
                      onClick={() => open(hobby.images, caption, 0)}
                      aria-label={`${t(hobby.title)} — open images`}
                      className="group relative block aspect-[16/9] w-full overflow-hidden"
                    >
                      <Image
                        src={hobby.images[0]}
                        alt={t(hobby.title)}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.07]"
                      />
                      <span className="absolute inset-0 bg-line/0 transition duration-300 group-hover:bg-line/10" />
                      <span className="glass-strong absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 scale-90 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-fg opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                        <ZoomIn size={14} aria-hidden="true" />
                        {hobby.images.length} ×
                      </span>
                    </button>

                    <div className="relative flex flex-1 flex-col gap-2 p-6">
                      {/* Circular glowing icon badge */}
                      <span
                        aria-hidden="true"
                        className="absolute -top-7 left-6 rounded-full bg-card p-3 text-fg shadow-soft ring-4 ring-white/60"
                      >
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <h5 className="mt-5 font-heading text-base font-bold text-fg">
                        {t(hobby.title)}
                      </h5>
                      <p className="flex-1 text-sm leading-relaxed text-muted">
                        {t(hobby.description)}
                      </p>
                      {hobby.link && (
                        <a
                          href={hobby.link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-sky/70 bg-sky/35 px-4 py-2 text-xs font-semibold text-fg transition hover:bg-sky/60"
                        >
                          {t(hobby.link.label)}
                          <ExternalLink
                            size={13}
                            aria-hidden="true"
                            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      )}
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
