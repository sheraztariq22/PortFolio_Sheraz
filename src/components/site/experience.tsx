'use client';

import React from 'react';
import { getConfig } from '@/lib/config-loader';
import { Section, Reveal } from './section';

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
        {/* vertical rail */}
        <div className="bg-border absolute top-2 bottom-2 left-[7px] w-px md:left-[9px]" />

        <div className="space-y-10">
          {experience.map((role, i) => (
            <Reveal key={`${role.company}-${i}`} delay={i * 0.05}>
              <div className="relative pl-8 md:pl-12">
                {/* dot */}
                <span className="border-background bg-brand absolute top-1.5 left-0 h-4 w-4 rounded-full border-4 md:h-[18px] md:w-[18px]" />

                <div className="border-border bg-card hover:border-foreground/20 rounded-xl border p-5 transition-colors md:p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-foreground text-lg font-semibold">
                      {role.position}
                      <span className="text-brand"> · {role.company}</span>
                    </h3>
                    <span className="text-muted-foreground font-mono text-xs whitespace-nowrap">
                      {role.duration}
                    </span>
                  </div>

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
