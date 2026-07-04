'use client';

import React from 'react';
import { ArrowUpRight, Github, Globe, Star } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import type { Project, ProjectLink } from '@/types/portfolio';
import { Section, Reveal } from './section';

function initials(title: string) {
  const cleaned = title.split('—')[0].split('·')[0].trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  return (words[0]?.[0] ?? '') + (words[1]?.[0] ?? '');
}

function LinkButton({ link }: { link: ProjectLink }) {
  const isLive = /live|demo|ngedu|http.*ngedu/i.test(link.name);
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
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ' +
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

function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className="group border-border bg-card hover:border-foreground/20 flex flex-col overflow-hidden rounded-xl border transition-colors">
      {/* gradient header with monogram */}
      <div className="from-brand/20 relative flex h-28 items-center justify-between bg-gradient-to-br to-transparent px-5">
        <div className="bg-dot-grid absolute inset-0 opacity-40" />
        <div className="bg-background/80 text-foreground relative flex h-14 w-14 items-center justify-center rounded-xl border border-border font-mono text-xl font-semibold backdrop-blur-sm">
          {initials(project.title)}
        </div>
        <div className="relative flex flex-col items-end gap-2">
          <span className="border-brand/30 text-brand inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-muted-foreground font-mono text-[11px] tracking-wide uppercase">
          {project.category}
        </span>
        <h3 className="text-foreground mt-1.5 text-lg font-semibold">
          {project.title}
        </h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 8).map((tech) => (
            <span
              key={tech}
              className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <LinkButton key={link.url} link={link} />
            ))}
          </div>
        )}
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
  const featured = projects.filter((p) => p.featured).slice(0, 2);
  const featuredTitles = new Set(featured.map((p) => p.title));
  const rest = projects.filter((p) => !featuredTitles.has(p.title));

  return (
    <Section
      id="projects"
      index="03"
      title="Projects"
      description="Flagship products first, then a selection of GenAI, agentic, and RAG builds."
    >
      {/* Featured */}
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.05}>
            <FeaturedCard project={project} />
          </Reveal>
        ))}
      </div>

      {/* Rest */}
      {rest.length > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.04}>
              <CompactCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

export default Projects;
