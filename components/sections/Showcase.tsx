'use client';

import { ZoomIn } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Carousel from '@/components/ui/Carousel';
import TiltCard from '@/components/ui/TiltCard';
import { useLang } from '@/context/LangProvider';
import { useLightbox } from '@/context/LightboxProvider';
import { sectionHeaders, showcase } from '@/data/content';

const openFullscreenLabel = { th: 'เปิดดูแบบเต็มจอ', en: 'Open fullscreen' };
const showcaseAlt = { th: 'ภาพตัวอย่างผลงาน', en: 'Project showcase screenshot' };

export default function Showcase() {
  const { t } = useLang();
  const { open } = useLightbox();
  const header = sectionHeaders.gallery;

  return (
    <section id="project-gallery" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index={header.index}
          eyebrow={header.eyebrow.en}
          title={header.title}
          subtitle={header.subtitle}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {showcase.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 2) * 0.1}
              className="h-full"
            >
              <TiltCard className="h-full">
                <article className="card-soft h-full overflow-hidden p-5 sm:p-6">
                  <div className="mb-4">
                    <h3 className="font-heading text-base font-bold text-fg">{item.title}</h3>
                    {item.note && (
                      <p className="mt-1 text-xs leading-relaxed text-muted">{t(item.note)}</p>
                    )}
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`${t(item.note ?? { th: item.title, en: item.title })} — open fullscreen`}
                    onClick={() => open(item.images, item.title, 0)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        open(item.images, item.title, 0);
                      }
                    }}
                    className="group relative block w-full text-left focus-visible:outline-2 focus-visible:outline-cyan"
                  >
                    <Carousel
                      images={item.images}
                      alt={t(showcaseAlt)}
                      sizes="(max-width: 768px) 100vw, 576px"
                      aspect="aspect-[16/10]"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/25 group-hover:opacity-100">
                      <span className="glass-strong flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-fg">
                        <ZoomIn size={14} aria-hidden="true" />
                        {t(openFullscreenLabel)}
                      </span>
                    </div>
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