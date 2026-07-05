'use client';

import {
  Code2,
  Bot,
  Brain,
  Server,
  Cloud,
  Building2,
  Award,
} from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import { Section, Reveal } from './section';

export function SkillsSection() {
  const { skills, certifications } = getConfig();

  const groups = [
    {
      label: 'Languages',
      icon: Code2,
      items: skills.languages,
      evidence: 'Daily across the ngedu.ai platform, the RAG backend, and CRM work.',
    },
    {
      label: 'Generative AI & Agents',
      icon: Bot,
      items: skills.genai_agents,
      evidence: 'In production — a 4-agent tutoring system and a LangGraph CRM assistant.',
    },
    {
      label: 'AI/ML',
      icon: Brain,
      items: skills.ai_ml,
      evidence: 'Foundations behind my NLP, deep-learning, and computer-vision work.',
    },
    {
      label: 'Backend & Web',
      icon: Server,
      items: skills.backend_web,
      evidence: 'The APIs, services, and front-ends I ship features on.',
    },
    {
      label: 'Cloud & Data',
      icon: Cloud,
      items: skills.cloud_data,
      evidence: 'Runs ngedu.ai — Bedrock, pgvector, Lambda, and App Runner in production.',
    },
    {
      label: 'Enterprise / CRM',
      icon: Building2,
      items: skills.enterprise_crm,
      evidence: 'SugarCRM / SuiteCRM feature work and Stripe subscription billing.',
    },
  ].filter((g) => g.items && g.items.length > 0);

  return (
    <Section
      id="skills"
      index="04"
      title="Skills"
      description="Grouped by where I actually use them — not a flat tag cloud."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.04}>
            <div className="border-border bg-card hover:border-foreground/20 h-full rounded-xl border p-5 transition-colors">
              <div className="flex items-center gap-2.5">
                <span className="bg-brand/10 text-brand flex h-8 w-8 items-center justify-center rounded-md">
                  <group.icon className="h-4 w-4" />
                </span>
                <h3 className="text-foreground text-sm font-semibold">
                  {group.label}
                </h3>
              </div>

              <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
                {group.evidence}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="border-border text-muted-foreground rounded-md border px-2 py-1 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {certifications && certifications.length > 0 && (
        <Reveal delay={0.1}>
          <div className="border-border bg-card mt-5 rounded-xl border p-5">
            <div className="flex items-center gap-2.5">
              <span className="bg-accent2/10 text-accent2 flex h-8 w-8 items-center justify-center rounded-md">
                <Award className="h-4 w-4" />
              </span>
              <h3 className="text-foreground text-sm font-semibold">
                Certifications
              </h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="border-border text-muted-foreground rounded-md border px-2 py-1 text-xs font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </Section>
  );
}

export default SkillsSection;
