'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import { useLang } from '@/context/LangProvider';
import { codeLink, projectFilterTabs, projects, sectionHeaders, ui } from '@/data/content';
import { Category, ProjectFilter } from '@/data/project-types';

type FilteredProject = (typeof projects)[number];

export default function Projects() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const header = sectionHeaders.projects;

  const visible: FilteredProject[] =
    filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="projects" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index={header.index}
          eyebrow={header.eyebrow.en}
          title={header.title}
          subtitle={header.subtitle}
        />

        {/* Filter tabs */}
        <Reveal className="mb-10 flex justify-center" delay={0.05}>
          <div
            role="tablist"
            aria-label="Project categories"
            className="glass flex gap-1 rounded-full p-1.5"
          >
            {projectFilterTabs.map((tab) => {
              const active = filter === tab.filter;
              return (
                <button
                  key={tab.filter}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.filter)}
                  className="relative rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm"
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 rounded-full bg-fg"
                      transition={{ duration: reduce ? 0 : 0.35, ease: 'easeOut' }}
                    />
                  )}
                  <span className={active ? 'relative text-white' : 'relative text-muted'}>
                    {tab.filter === 'all' ? t(ui.all) : t(tab.label)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Cards */}
        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.code}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <article className="card-soft flex h-full min-h-[320px] flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-widest text-muted">
                        {project.code}
                      </span>
                      <div className="flex gap-1.5">
                        {project.categories.map((cat: Category) => (
                          <span
                            key={cat}
                            className="rounded-full border border-mint bg-mint/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading text-lg font-bold leading-snug text-fg">
                        {t(project.title)}
                      </h3>
                      <p className="mono mt-1.5 normal-case">{t(project.subtitle)}</p>
                    </div>

                    <p className="flex-1 text-sm leading-relaxed text-muted">
                      {t(project.description)}
                    </p>

                    {/* Pastel tech tags */}
                    <ul className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-sky/70 bg-sky/35 px-2.5 py-1 text-[11px] font-medium text-fg"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 border-t border-line/10 pt-4 text-sm font-semibold text-fg transition hover:text-slate-500"
                    >
                      {t(codeLink)}
                      <ExternalLink
                        size={14}
                        aria-hidden="true"
                        className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
