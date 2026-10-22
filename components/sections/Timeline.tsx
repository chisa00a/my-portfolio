'use client';

import { GraduationCap } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import { useLang } from '@/context/LangProvider';
import { gpaCard, sectionHeaders, timeline } from '@/data/content';

// Pastel node fills keyed by the tone stored in data.
const nodeTone: Record<string, string> = {
  violet: 'border-sky bg-sky',
  cyan: 'border-mint bg-mint',
  magenta: 'border-peach bg-peach',
};

export default function Timeline() {
  const { t } = useLang();
  const header = sectionHeaders.timeline;

  return (
    <section id="timeline-section" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          index={header.index}
          eyebrow={header.eyebrow.en}
          title={header.title}
          subtitle={header.subtitle}
        />

        <ol className="relative ml-4 space-y-12 border-l border-line/10 pl-8 sm:pl-10 md:ml-16">
          {/* Soft pastel line overlay */}
          <span
            aria-hidden="true"
            className="absolute -left-px top-0 block h-full w-px bg-gradient-to-b from-sky via-lav to-transparent opacity-70"
          />

          {timeline.map((entry, i) => (
            <Reveal key={entry.years} as="li" delay={i * 0.12} className="relative">
              {/* Pastel node */}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute -left-8 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] sm:-left-10',
                  nodeTone[entry.tone]
                )}
              />
              <p className="font-mono text-xs tracking-widest text-muted">{entry.years}</p>
              <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-fg">
                {t(entry.title)}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{t(entry.detail)}</p>

              {/* GPA card inside the first node */}
              {i === 0 && (
                <div
                  className="card-soft mt-5 inline-flex max-w-md flex-wrap items-center gap-6 p-5"
                  data-testid="gpa-card"
                >
                  <span className="rounded-xl bg-lav/60 p-2.5 text-fg">
                    <GraduationCap size={20} aria-hidden="true" />
                  </span>
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        {t(gpaCard.gpaxLabel)}
                      </p>
                      <p className="font-heading text-2xl font-bold text-fg">{gpaCard.gpax}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        {t(gpaCard.majorLabel)}
                      </p>
                      <p className="font-heading text-2xl font-bold text-fg">{gpaCard.major}</p>
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
