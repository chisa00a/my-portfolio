import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        // 30% pastel accents — buttons, badges, highlights, hover states
        mint: '#A7F3D0',
        sky: '#BAE6FD',
        peach: '#FFD8CB',
        lav: '#E9D5FF',
      },
      fontFamily: {
        heading: ['var(--font-outfit)', 'var(--font-sarabun)', 'system-ui', 'sans-serif'],
        body: ['var(--font-sarabun)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        soft: '0 6px 24px rgb(51 65 85 / 0.06)',
        softer: '0 10px 40px rgb(51 65 85 / 0.07)',
      },
      keyframes: {},
    },
  },
  plugins: [],
};

export default config;
