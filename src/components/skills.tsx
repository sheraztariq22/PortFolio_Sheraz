'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
import { Code, Cpu, Cloud, Brain, Bot, Building2, Award } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

const Skills = () => {
  // Get skills from configuration
  const config = getConfig();
  
  const certifications = config.certifications || [];

  // Transform skills data with icons
  const skillsData = [
    {
      category: 'Languages',
      icon: <Code className="h-5 w-5" />,
      skills: config.skills.languages,
      color: 'bg-blue-50 text-blue-600 border border-blue-200',
    },
    {
      category: 'Generative AI & Agents',
      icon: <Bot className="h-5 w-5" />,
      skills: config.skills.genai_agents,
      color: 'bg-purple-50 text-purple-600 border border-purple-200',
    },
    {
      category: 'AI/ML',
      icon: <Brain className="h-5 w-5" />,
      skills: config.skills.ai_ml,
      color: 'bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200',
    },
    {
      category: 'Backend & Web',
      icon: <Cpu className="h-5 w-5" />,
      skills: config.skills.backend_web,
      color: 'bg-green-50 text-green-600 border border-green-200',
    },
    {
      category: 'Cloud & Data',
      icon: <Cloud className="h-5 w-5" />,
      skills: config.skills.cloud_data,
      color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    },
    {
      category: 'Enterprise/CRM',
      icon: <Building2 className="h-5 w-5" />,
      skills: config.skills.enterprise_crm,
      color: 'bg-amber-50 text-amber-600 border border-amber-200',
    },
  ].filter(category => category.skills && category.skills.length > 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: easeOut },
    },
  };

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="mx-auto w-full max-w-5xl rounded-4xl px-4 sm:px-6"
    >
      <Card className="w-full border-none px-0 pb-8 sm:pb-12 shadow-none">
        <CardHeader className="px-0 pb-1">
          <CardTitle className="text-primary px-0 text-2xl sm:text-3xl lg:text-4xl font-bold">
            Skills & Expertise
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0">
          <motion.div
            className="space-y-6 sm:space-y-8 px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skillsData.map((section, index) => (
              <motion.div
                key={index}
                className="space-y-3 px-0"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  <h3 className="text-accent-foreground text-base sm:text-lg font-semibold">
                    {section.category}
                  </h3>
                </div>

                <motion.div
                  className="flex flex-wrap gap-1.5 sm:gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {section.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      variants={badgeVariants}
                      whileHover={{
                        scale: 1.04,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Badge className={`border px-2 py-1 sm:px-3 sm:py-1.5 font-normal text-xs sm:text-sm`}>
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}

            {certifications.length > 0 && (
              <motion.div className="space-y-3 px-0" variants={itemVariants}>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <h3 className="text-accent-foreground text-base sm:text-lg font-semibold">
                    Certifications
                  </h3>
                </div>

                <motion.div
                  className="flex flex-wrap gap-1.5 sm:gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {certifications.map((cert, idx) => (
                    <motion.div
                      key={idx}
                      variants={badgeVariants}
                      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                    >
                      <Badge className="border px-2 py-1 sm:px-3 sm:py-1.5 font-normal text-xs sm:text-sm">
                        {cert}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Skills;
