'use client';

import { ArrowUpRight, Github, Globe } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import type { Metric, Project, ProjectLink } from '@/types/portfolio';
import { Section, Reveal } from './section';

function initials(title: string) {
  const cleaned = title.split('—')[0].split('·')[0].trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  return (words[0]?.[0] ?? '') + (words[1]?.[0] ?? '');
}

function LinkButton({ link }: { link: ProjectLink }) {
  const isLive = /live|demo|ngedu|product/i.test(link.name);
  const Icon = isLive ? Globe : Github;
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors"
    >
      <Icon className="h-3.5 w-3.5" />
      {link.name}
      <ArrowUpRight className="h-3 w-3" />
    </a>
  );
}

function StatusBadge({ status }: { status: string }) {
  const live = status === 'Live';
  const ongoing = status === 'Ongoing';
  return (
    <span
      className={
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ' +
        (live
          ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400'
          : ongoing
            ? 'bg-brand/12 text-brand'
            : 'bg-muted text-muted-foreground')
      }
    >
      {(live || ongoing) && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {status}
    </span>
  );
}

function StatBlock({ metric }: { metric: Metric }) {
  return (
    <div className="border-border bg-background/50 rounded-lg border px-3 py-2">
      <div className="text-accent2 font-mono text-sm font-semibold">
        {metric.value}
      </div>
      <div className="text-muted-foreground mt-0.5 text-[11px] leading-tight">
        {metric.label}
      </div>
    </div>
  );
}

function CaseStudyCard({ project }: { project: Project }) {
  const cs = project.caseStudy;
  const rows: Array<[string, string]> = cs
    ? [
        ['Problem', cs.problem],
        ['Approach', cs.approach],
        ['My role', cs.role],
        ['Impact', cs.impact],
      ]
    : [];

  return (
    <div className="group border-border bg-card hover:border-foreground/20 overflow-hidden rounded-2xl border transition-colors">
      {/* header band */}
      <div className="border-border from-brand/15 relative border-b bg-gradient-to-br to-transparent p-6 md:p-8">
        <div className="bg-dot-grid mask-radial-faded absolute inset-0 opacity-30" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="glass text-foreground flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-mono text-lg font-semibold">
              {initials(project.title)}
            </span>
            <div>
              <span className="text-muted-foreground font-mono text-[11px] tracking-wide uppercase">
                {project.category}
              </span>
              <h3 className="text-foreground mt-1 text-xl font-semibold tracking-tight">
                {project.title}
              </h3>
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="relative mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <StatBlock key={m.label} metric={m} />
            ))}
          </div>
        )}
      </div>

      {/* narrative */}
      <div className="p-6 md:p-8">
        {rows.length > 0 ? (
          <dl className="space-y-4">
            {rows.map(([label, text]) => (
              <div
                key={label}
                className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4"
              >
                <dt className="text-brand font-mono text-[11px] font-semibold tracking-widest uppercase sm:pt-0.5">
                  {label}
                </dt>
                <dd className="text-muted-foreground text-sm leading-relaxed">
                  {text}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>
        )}

        <div className="border-border mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.links.map((link) => (
                <LinkButton key={link.url} link={link} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompactCard({ project }: { project: Project }) {
  return (
    <div className="group border-border bg-card hover:border-foreground/20 flex flex-col rounded-xl border p-5 transition-colors">
      <div className="flex items-center justify-between">
        <span className="border-border text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-sm font-semibold">
          {initials(project.title)}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <span className="text-muted-foreground mt-4 font-mono text-[11px] tracking-wide uppercase">
        {project.category}
      </span>
      <h3 className="text-foreground mt-1 text-base font-semibold">
        {project.title}
      </h3>
      <p className="text-muted-foreground mt-2 line-clamp-3 flex-1 text-sm leading-relaxed">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.links.map((link) => (
            <LinkButton key={link.url} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Projects() {
  const { projects } = getConfig();
  const caseStudies = projects.filter((p) => p.featured && p.caseStudy);
  const csTitles = new Set(caseStudies.map((p) => p.title));
  const more = projects.filter((p) => !csTitles.has(p.title));

  return (
    <Section
      id="projects"
      index="03"
      title="Selected Work"
      description="Deep dives on production systems I designed and shipped, then a selection of GenAI, agentic, and RAG builds."
    >
      {/* Case studies */}
      <div className="space-y-6">
        {caseStudies.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.05}>
            <CaseStudyCard project={project} />
          </Reveal>
        ))}
      </div>

      {/* More work */}
      {more.length > 0 && (
        <div className="mt-14">
          <Reveal>
            <h3 className="text-muted-foreground font-mono text-xs font-medium tracking-widest uppercase">
              More work
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.04}>
                <CompactCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

export default Projects;
