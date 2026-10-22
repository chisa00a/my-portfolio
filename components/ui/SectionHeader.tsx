'use client';

import Reveal from '@/components/ui/Reveal';
import { Pair } from '@/lib/i18n';
import { useLang } from '@/context/LangProvider';

export default function SectionHeader({
  index,
  eyebrow,
  title,
  subtitle,
}: {
  index: string;
  eyebrow: string;
  title: Pair;
  subtitle: Pair;
}) {
  const { t } = useLang();

  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mono mb-3 text-muted">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        <span className="mr-2 inline-flex h-8 w-8 -translate-y-1 items-center justify-center rounded-xl bg-sky/60 align-middle font-mono text-xs text-fg">
          {index}
        </span>
        {t(title)}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted">{t(subtitle)}</p>
    </Reveal>
  );
}
