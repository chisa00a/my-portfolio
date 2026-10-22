'use client';

import { useLang } from '@/context/LangProvider';
import { brand, footerNote } from '@/data/content';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 px-6 pb-12 pt-6">
      <div className="mx-auto max-w-5xl border-t border-line/10 pt-8 text-center">
        <p className="font-mono text-xs tracking-wide text-muted" lang="en">
          © {year} {brand.person} — {t(footerNote)}
        </p>
      </div>
    </footer>
  );
}
