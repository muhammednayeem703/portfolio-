import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, ExternalLink, Award, Code, Users } from 'lucide-react';

const highlights = [
  { icon: Code, text: 'Full Stack Development' },
  { icon: Users, text: 'Team Collaboration' },
  { icon: Award, text: 'Internship Completed' },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      className="section-padding bg-white dark:bg-mono-950 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-mono-400 dark:text-mono-500 mb-3">
            Experience
          </p>

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-mono-900 dark:text-mono-50 mb-12">
            Where I've worked
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group relative rounded-2xl bg-mono-50 dark:bg-mono-900 border border-mono-200 dark:border-mono-800 p-8 md:p-10 max-w-3xl overflow-hidden card-shine gradient-border"
        >
          {/* Decorative background */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-mono-200/50 to-mono-300/30 dark:from-mono-800/50 dark:to-mono-700/30 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative flex items-start gap-5">

            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-mono-200 to-mono-300 dark:from-mono-800 dark:to-mono-700 flex items-center justify-center shrink-0 shadow-lg"
            >
              <Briefcase
                size={24}
                className="text-mono-600 dark:text-mono-400"
              />
            </motion.div>

            {/* Content */}
            <div className="flex-1">

              {/* Job title */}
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="font-heading text-xl font-semibold text-mono-900 dark:text-mono-50">
                  Full Stack Development Intern
                </h3>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-mono-200 dark:bg-mono-800 text-mono-700 dark:text-mono-300 border border-mono-300 dark:border-mono-700">
                  ✓ Completed
                </span>
              </div>

              {/* Company */}
              <p className="text-sm text-mono-500 dark:text-mono-400 mb-2 flex items-center gap-1.5">
                <ExternalLink size={14} />
                Zephyr Technologies & Solution Pvt. Ltd.
              </p>

              {/* Duration */}
              <p className="text-xs font-medium text-mono-400 dark:text-mono-500 mb-5">
                Summer Internship • 1 Month • 2026
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-5">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.5 + i * 0.1,
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mono-100 dark:bg-mono-800 text-mono-600 dark:text-mono-400 text-xs font-medium"
                  >
                    <h.icon size={12} />
                    {h.text}
                  </motion.div>
                ))}
              </div>

              {/* Internship description */}
              <ul className="space-y-3">
                {[
                  'Completed a one-month summer internship in Full Stack Development.',
                  'Developed a portfolio website using the MERN stack.',
                  'Worked with React.js for frontend development and Node.js with Express.js for backend development.',
                  'Integrated MongoDB for storing and retrieving application data.',
                  'Gained practical experience in API development, database integration, testing, and deployment.',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.6 + i * 0.1,
                    }}
                    className="flex items-start gap-3 text-sm text-mono-600 dark:text-mono-400"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mono-500 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* Project */}
              <div className="mt-6 p-4 rounded-xl bg-white dark:bg-mono-950 border border-mono-200 dark:border-mono-800">
                <p className="text-xs uppercase tracking-wider font-semibold text-mono-400 dark:text-mono-500 mb-1">
                  Internship Project
                </p>

                <p className="text-sm font-semibold text-mono-800 dark:text-mono-200">
                  Personal Portfolio Website using MERN Stack
                </p>

                <p className="text-xs text-mono-500 dark:text-mono-400 mt-1">
                  React.js • Node.js • Express.js • MongoDB • REST API
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
