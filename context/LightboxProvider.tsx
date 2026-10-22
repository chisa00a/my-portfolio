'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from 'react';
import Lightbox from '@/components/ui/Lightbox';

type LightboxState = {
  images: string[];
  caption: string;
  startIndex: number;
};

type LightboxContextValue = {
  open: (images: string[], caption: string, startIndex?: number) => void;
  isOpen: boolean;
  /** Ref to the element that was focused before opening — Lightbox restores it. */
  triggerRef: React.RefObject<HTMLElement | null>;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((images: string[], caption: string, startIndex = 0) => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      triggerRef.current = document.activeElement;
    }
    setState({ images, caption, startIndex });
  }, []);

  const value = useMemo(
    () => ({ open, isOpen: state !== null, triggerRef }),
    [open, state]
  );

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {state !== null && (
        <Lightbox
          images={state.images}
          caption={state.caption}
          startIndex={state.startIndex}
          onClose={() => {
            setState(null);
            // Return focus to the trigger that opened the lightbox.
            const trigger = triggerRef.current;
            trigger?.focus();
            triggerRef.current = null;
          }}
        />
      )}
    </LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within <LightboxProvider>');
  return ctx;
}
