'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #A7F3D0, #BAE6FD, #E9D5FF, #FFD8CB)',
      }}
    />
  );
}
