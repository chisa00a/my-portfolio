'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { Locale, Pair } from '@/lib/i18n';
import { pick } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type LangContextValue = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  /** Translate a bilingual pair for the active locale. */
  t: (pair: Pair) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState, hydrated] = useLocalStorage<Locale>('portfolio-lang', 'th');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = lang;
  }, [lang, hydrated]);

  const setLang = useCallback(
    (next: Locale) => {
      if (next === lang) return;
      setLangState(next);
      // Smooth opacity/blur pulse across the whole page while copy swaps.
      const el = wrapperRef.current;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (el && !reduced) {
        el.classList.add('lang-swapping');
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => el.classList.remove('lang-swapping'), 260);
      }
    },
    [lang, setLangState]
  );

  const t = useCallback((pair: Pair) => pick(pair, lang), [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <div ref={wrapperRef} className="contents">
        {children}
      </div>
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within <LangProvider>');
  return ctx;
}
