'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLang } from '@/context/LangProvider';
import { brand, navItems, ui } from '@/data/content';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  // Evaluated after mount only, so SSR markup can never diverge.
  const [staticMotion, setStaticMotion] = useState(false);

  useEffect(() => {
    setStaticMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-[60] flex justify-center px-3">
      <div className="glass flex w-full max-w-5xl items-center justify-between gap-2 rounded-full py-2 pl-5 pr-2">
        {/* Brand */}
        <a href="#profile" className="flex shrink-0 items-center gap-2">
          <span
            className={cn("inline-block h-2 w-2 rounded-full bg-sky", !staticMotion && 'animate-pulse')}
            aria-hidden="true"
          />
          <span className="font-heading text-sm font-bold tracking-wide text-fg">
            {brand.name}
          </span>
        </a>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-muted transition hover:bg-line/5 hover:text-fg"
            >
              {t(item.label)}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
            aria-label={t(ui.languageToggle)}
            className="flex items-center rounded-full border border-line/10 p-0.5 font-mono text-[11px] tracking-wider"
          >
            <span
              aria-hidden="true"
              className={cn(
                'rounded-full px-2 py-1 transition',
                lang === 'th' ? 'bg-fg text-white' : 'text-muted'
              )}
            >
              TH
            </span>
            <span
              aria-hidden="true"
              className={cn(
                'rounded-full px-2 py-1 transition',
                lang === 'en' ? 'bg-fg text-white' : 'text-muted'
              )}
            >
              EN
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t(ui.closeMenu) : t(ui.openMenu)}
            className="rounded-full border border-line/10 p-2 text-fg transition lg:hidden"
          >
            {menuOpen ? <X size={15} aria-hidden="true" /> : <Menu size={15} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: staticMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="glass-strong absolute inset-x-3 top-[calc(100%+0.6rem)] flex flex-col gap-1 rounded-3xl p-4 lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-line/5 hover:text-fg"
              >
                {t(item.label)}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
