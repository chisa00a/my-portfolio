'use client';

import { Database, Layers, MonitorSmartphone, BrainCircuit, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import { cn, pick } from '@/lib/utils';
import { useLang } from '@/context/LangProvider';
import { proficiency, sectionHeaders, skillCards } from '@/data/content';

const icons = [Layers, MonitorSmartphone, Database, BrainCircuit];

// Rotating pastel accent per card: lavender, mint, peach, baby blue.
const cardAccent = [
  'bg-lav/60 text-fg',
  'bg-mint/50 text-fg',
  'bg-peach/60 text-fg',
  'bg-sky/60 text-fg',
];

const toneRing: Record<string, string> = {
  emerald: 'border-mint bg-mint/40 text-fg',
  violet: 'border-sky bg-sky/40 text-fg',
  cyan: 'border-lav bg-lav/50 text-fg',
};

export default function Skills() {
  const { t, lang } = useLang();
  const header = sectionHeaders.skills;

  return (
    <section id="skills" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index={header.index}
          eyebrow={header.eyebrow.en}
          title={header.title}
          subtitle={header.subtitle}
        />

        {/* 4 skill cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCards.map((card, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={card.title.en} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <article className="card-soft flex h-full flex-col gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-2xl transition',
                          cardAccent[i]
                        )}
                      >
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-heading text-sm font-semibold text-fg">
                          {t(card.title)}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-muted">{t(card.description)}</p>
                      </div>
                    </div>
                    <ul className="flex flex-wrap content-start gap-1.5">
                      {card.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-lg px-2 py-1 font-mono text-[11px] text-muted"
                          style={{ background: 'rgb(var(--surface-tint))' }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Proficiency breakdown */}
        <Reveal delay={0.15} className="mt-10">
          <div className="card-soft p-6 sm:p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {proficiency.map((col) => (
                <div key={col.level.en}>
                  <h3
                    className={cn(
                      'mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest',
                      toneRing[col.tone]
                    )}
                  >
                    <CheckCircle2 size={13} aria-hidden="true" />
                    {t(col.level)}
                  </h3>
                  <ul className="space-y-4">
                    {col.items.map((item) => (
                      <li key={item.name}>
                        <p className="font-mono text-[13px] font-semibold text-fg">{item.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          {pick(item.note, lang)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
