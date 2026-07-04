import { Navbar } from '@/components/site/navbar';
import { Hero } from '@/components/site/hero';
import { About } from '@/components/site/about';
import { Experience } from '@/components/site/experience';
import { Projects } from '@/components/site/projects';
import { SkillsSection } from '@/components/site/skills-section';
import { ContactSection } from '@/components/site/contact-section';
import { Footer } from '@/components/site/footer';
import { AIChatWidget } from '@/components/site/ai-chat-widget';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
