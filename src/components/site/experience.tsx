'use client';

import { getConfig } from '@/lib/config-loader';
import { Section, Reveal } from './section';

function companyInitial(company: string) {
  return company.trim()[0]?.toUpperCase() ?? '';
}

export function Experience() {
  const { experience } = getConfig();

  return (
    <Section
      id="experience"
      index="02"
      title="Experience"
      description="Where I've been turning models into products."
    >
      <div className="relative">
        {/* vertical rail — fades in/out at the ends */}
        <div className="absolute top-2 bottom-2 left-[22px] w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-[26px]" />

        <div className="space-y-8">
          {experience.map((role, i) => (
            <Reveal key={`${role.company}-${i}`} delay={i * 0.05}>
              <div className="relative flex gap-5 md:gap-6">
                {/* node: glass monogram */}
                <span className="glass text-foreground relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-base font-semibold md:h-[54px] md:w-[54px]">
                  {companyInitial(role.company)}
                  <span className="border-brand/50 absolute inset-0 rounded-xl border" />
                </span>

                <div className="border-border bg-card hover:border-foreground/20 min-w-0 flex-1 rounded-xl border p-5 transition-colors md:p-6">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-foreground text-lg font-semibold">
                      {role.position}
                      <span className="text-brand"> · {role.company}</span>
                    </h3>
                    <span className="text-muted-foreground font-mono text-xs whitespace-nowrap">
                      {role.duration}
                    </span>
                  </div>

                  <span className="text-muted-foreground mt-1 inline-block font-mono text-[11px] tracking-wide uppercase">
                    {role.type}
                  </span>

                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {role.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {role.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="border-border text-muted-foreground rounded-md border px-2 py-0.5 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Experience;
