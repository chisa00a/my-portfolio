'use client';

import Image from 'next/image';
import { Award, FileDown } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import { useLang } from '@/context/LangProvider';
import { certificates, sectionHeaders, ui } from '@/data/content';

// Rotating pastel accent for the corner badge.
const badgeTone = ['bg-sky/60', 'bg-mint/50', 'bg-peach/60'];

export default function Certificates() {
  const { t } = useLang();
  const header = sectionHeaders.certificates;

  return (
    <section id="certificates" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index={header.index}
          eyebrow={header.eyebrow.en}
          title={header.title}
          subtitle={header.subtitle}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <Reveal key={cert.pdf} delay={i * 0.08}>
              <TiltCard className="h-full">
                <article className="card-soft flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line/5">
                    <Image
                      src={cert.image}
                      alt={t(cert.title)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                    <span
                      className={`absolute right-3 top-3 rounded-full p-2 text-fg shadow-soft ${badgeTone[i % badgeTone.length]}`}
                    >
                      <Award size={15} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 p-6">
                    <h3 className="font-heading text-base font-bold text-fg">{t(cert.title)}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      {cert.org}
                    </p>
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-fg transition hover:text-slate-500"
                    >
                      <FileDown size={15} aria-hidden="true" />
                      {ui.viewPdf.en}
                    </a>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
