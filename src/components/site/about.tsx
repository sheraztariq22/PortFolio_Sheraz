'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, GraduationCap, Sparkles, Check } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import { Section, Reveal } from './section';

export function About() {
  const { personal, education } = getConfig();

  const facts = [
    { icon: MapPin, label: 'Based in', value: 'Pakistan · Remote' },
    {
      icon: GraduationCap,
      label: 'Education',
      value: 'B.S. Software Engineering, FAST NUCES',
    },
    {
      icon: Sparkles,
      label: 'Focus',
      value: 'GenAI · Multi-Agent · RAG',
    },
  ];

  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-10 md:grid-cols-5 md:gap-12">
        {/* Left: avatar + facts */}
        <Reveal className="md:col-span-2">
          <div className="border-border relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl border">
            <Image
              src={personal.avatar}
              alt={personal.name}
              width={480}
              height={480}
              className="h-full w-full object-cover"
            />
          </div>

          <ul className="mt-6 space-y-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="border-border text-muted-foreground mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="text-muted-foreground block text-xs">
                    {label}
                  </span>
                  <span className="text-foreground text-sm font-medium">
                    {value}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: bio + highlights */}
        <Reveal className="md:col-span-3" delay={0.1}>
          <p className="text-foreground text-lg leading-relaxed">
            {personal.bio}
          </p>

          <div className="mt-8">
            <h3 className="text-muted-foreground font-mono text-xs font-medium tracking-widest uppercase">
              Highlights
            </h3>
            <ul className="mt-4 space-y-3">
              {education.achievements.map((achievement) => (
                <li key={achievement} className="flex items-start gap-3">
                  <span className="bg-brand/10 text-brand mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default About;
