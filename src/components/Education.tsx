import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, BookOpen, Award, MapPin } from 'lucide-react';

const education = [
  {
    degree: 'B.Tech CSE (Internet of Things)',
    institution: 'Presidency University',
    location: 'Bengaluru',
    period: '2024 – 2028',
    detail: 'Specializing in IoT integration, embedded systems, and full-stack development.',
    current: true,
    score: null,
  },
  {
    degree: 'Pre-University Course (PUC)',
    institution: 'Secondary Education',
    location: null,
    period: '2022 – 2024',
    detail: 'Completed with focus on Science and Mathematics.',
    current: false,
    score: 'Distinction',
  },
  {
    degree: 'SSLC',
    institution: 'Secondary School Leaving Certificate',
    location: null,
    period: 'Completed',
    detail: 'Strong academic foundation with distinction.',
    current: false,
    score: 'Distinction',
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="section-padding bg-mono-50 dark:bg-mono-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-screen opacity-[0.02]">
        <div className="absolute inset-0" style={{
          background: 'repeating-linear-gradient(90deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
        }} />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-mono-400 dark:text-mono-500 mb-3">
            Education
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-mono-900 dark:text-mono-50 mb-12">
            Academic journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated timeline */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5">
            <div className="h-full bg-mono-200 dark:bg-mono-800" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-mono-500 to-transparent"
              initial={{ height: 0 }}
              animate={inView ? { height: '100%' } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          <div className="space-y-12">
            {education.map((edu, i) => {
              const Icon = edu.current ? GraduationCap : BookOpen;
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="relative pl-16 md:pl-20 group"
                >
                  {/* Timeline node */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="absolute left-3 md:left-5 top-0"
                  >
                    <div className={`relative w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      edu.current
                        ? 'border-mono-500 dark:border-mono-400 bg-mono-50 dark:bg-mono-900'
                        : 'border-mono-300 dark:border-mono-600 bg-mono-100 dark:bg-mono-800'
                    } group-hover:border-mono-600 dark:group-hover:border-mono-300`}
                    >
                      {edu.current && (
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-mono-500 dark:bg-mono-400"
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="p-6 rounded-xl bg-white dark:bg-mono-950 border border-mono-200 dark:border-mono-800 group-hover:border-mono-400 dark:group-hover:border-mono-600 transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Period badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          edu.current
                            ? 'bg-gradient-to-r from-mono-900 to-mono-700 dark:from-mono-100 dark:to-mono-300 text-white dark:text-mono-900'
                            : 'bg-mono-100 dark:bg-mono-800 text-mono-600 dark:text-mono-400'
                        }`}
                      >
                        {edu.period}
                      </motion.span>
                      {edu.score && (
                        <span className="flex items-center gap-1 text-xs font-medium text-mono-500 dark:text-mono-400 px-2 py-0.5 rounded-full bg-mono-100 dark:bg-mono-800">
                          <Award size={10} />
                          {edu.score}
                        </span>
                      )}
                    </div>

                    {/* Degree */}
                    <h3 className="font-heading text-lg font-bold text-mono-900 dark:text-mono-50 mb-2 group-hover:text-mono-700 dark:group-hover:text-mono-100 transition-colors">
                      {edu.degree}
                    </h3>

                    {/* Institution */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-mono-500 dark:text-mono-400">
                      <span className="flex items-center gap-1.5">
                        <Icon size={14} className="group-hover:scale-110 transition-transform" />
                        {edu.institution}
                      </span>
                      {edu.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {edu.location}
                        </span>
                      )}
                    </div>

                    {/* Detail */}
                    <p className="text-sm text-mono-500 dark:text-mono-400 leading-relaxed mt-3 group-hover:text-mono-600 dark:group-hover:text-mono-300 transition-colors">
                      {edu.detail}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
