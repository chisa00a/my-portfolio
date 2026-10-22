'use client';

import Image from 'next/image';
import { Download, Github, Instagram, Mail, Phone, ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Typewriter from '@/components/ui/Typewriter';
import { useLang } from '@/context/LangProvider';
import { brand, hero, ui } from '@/data/content';

type Social = {
  href: string;
  label: string;
  text: string;
  external?: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;
};

const socials: Social[] = [
  { href: `mailto:${brand.email}`, label: 'Email', text: brand.email, icon: Mail },
  {
    href: brand.githubUrl,
    label: 'GitHub',
    text: brand.githubHandle,
    external: true,
    icon: Github,
  },
  { href: `tel:${brand.phone}`, label: 'Phone', text: brand.phone, icon: Phone },
  {
    href: brand.instagramUrl,
    label: 'Instagram',
    text: brand.instagramHandle,
    external: true,
    icon: Instagram,
  },
];

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="profile" className="relative z-10 px-6 pt-40 pb-24 sm:pt-44">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        {/* Text column */}
        <div className="text-center lg:text-left">
          <Reveal delay={0}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span
                className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-mint"
                aria-hidden="true"
              />
              {t(hero.status)}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mono mt-6 text-muted">{hero.eyebrow.en}</p>
          </Reveal>

          <Reveal delay={0.14}>
            <h1 className="mt-4 font-heading font-bold leading-[1.08] tracking-tight text-fg">
              <span className="block text-5xl sm:text-6xl lg:text-7xl">{hero.nameTh}</span>
              <span className="mt-2 block text-xl text-muted sm:text-2xl lg:text-3xl" lang="en">
                {hero.nameEn}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <Typewriter className="mt-5 font-mono text-base text-muted sm:text-lg" />
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-muted lg:mx-0 sm:text-base">
              {t(hero.bio)}
            </p>
          </Reveal>

          {/* Social pills */}
          <Reveal delay={0.32}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target={s.external ? '_blank' : undefined}
                    rel={s.external ? 'noreferrer' : undefined}
                    className="glass group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-muted transition hover:-translate-y-0.5 hover:text-fg"
                  >
                    <s.icon size={14} aria-hidden="true" />
                    <span className="font-mono" lang="en">{s.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.38}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky via-lav to-peach px-6 py-3 text-sm font-semibold text-fg shadow-soft transition hover:scale-[1.04] hover:shadow-softer"
              >
                {t(ui.viewProjects)}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href="/Chisanupong_Kongchang_CV_Resume.pdf"
                download
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-fg transition hover:scale-[1.04] hover:shadow-softer"
              >
                <Download size={15} aria-hidden="true" />
                {t(ui.downloadCV)}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-line/10 px-6 py-3 text-sm font-semibold text-muted transition hover:scale-[1.04] hover:border-line/20 hover:text-fg"
              >
                {t(ui.contact)}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Portrait column */}
        <Reveal delay={0.2} className="mx-auto w-full max-w-[360px] lg:max-w-none">
          <div className="relative mx-auto aspect-square w-full max-w-[380px]">
            {/* Soft diffused pastel glow behind the portrait */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(186,230,253,0.55), rgba(233,213,255,0.4) 55%, rgba(255,216,203,0.28) 75%, transparent 100%)',
              }}
            />
            {/* Thin pastel gradient ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-full p-[3px]"
              style={{
                background:
                  'linear-gradient(140deg, #A7F3D0, #BAE6FD 35%, #E9D5FF 70%, #FFD8CB)',
              }}
            >
              <div className="h-full w-full rounded-full bg-bg" />
            </div>
            {/* Portrait */}
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/profile/profile1.jpg"
                alt={t(hero.portraitAlt)}
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 380px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
