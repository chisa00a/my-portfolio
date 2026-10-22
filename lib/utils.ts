import { Pair } from '@/lib/i18n';

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** True when the user prefers reduced motion (SSR-safe). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** True on coarse-pointer / touch devices — used to disable 3D tilt. */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/** Pick the string for the active locale. */
export function pick(pair: Pair, lang: 'th' | 'en'): string {
  return lang === 'en' ? pair.en : pair.th;
}
