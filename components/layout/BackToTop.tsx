'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { prefersReducedMotion } from '@/lib/utils';
import { useLang } from '@/context/LangProvider';
import { ui } from '@/data/content';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          onClick={toTop}
          aria-label={t(ui.backToTop)}
          className="glass-strong fixed bottom-6 right-6 z-50 rounded-full p-3 text-fg transition hover:scale-110 hover:shadow-softer"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
