import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, ExternalLink, Award, Code, Users } from 'lucide-react';

const highlights = [
  { icon: Code, text: 'Software Development' },
  { icon: Users, text: 'Team Collaboration' },
  { icon: Award, text: 'Real-world Projects' },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding bg-white dark:bg-mono-950 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 grid-lines-bg" />
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
          {/* Animated corner accent */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-mono-200/50 to-mono-300/30 dark:from-mono-800/50 dark:to-mono-700/30 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative flex items-start gap-5">
            {/* Logo/icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-mono-200 to-mono-300 dark:from-mono-800 dark:to-mono-700 flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-xl transition-shadow"
            >
              <Briefcase size={24} className="text-mono-600 dark:text-mono-400" />
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="font-heading text-xl font-semibold text-mono-900 dark:text-mono-50">
                  Software Intern
                </h3>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  Current
                </motion.span>
              </div>

              <p className="text-sm text-mono-500 dark:text-mono-400 mb-4 flex items-center gap-1.5 group-hover:text-mono-600 dark:group-hover:text-mono-300 transition-colors">
                <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                Zephyr Technologies & Solution
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-5">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mono-100 dark:bg-mono-800 text-mono-600 dark:text-mono-400 text-xs font-medium"
                  >
                    <h.icon size={12} />
                    {h.text}
                  </motion.div>
                ))}
              </div>

              {/* Bullet points */}
              <ul className="space-y-3">
                {[
                  'Gaining practical experience in software and web development',
                  'Contributing to real-world projects in a collaborative team environment',
                  'Applying academic knowledge to build production-ready solutions',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-mono-600 dark:text-mono-400 group/item hover:text-mono-800 dark:hover:text-mono-200 transition-colors"
                  >
                    <motion.span
                      whileHover={{ scale: 1.5 }}
                      className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-mono-400 to-mono-500 dark:from-mono-500 dark:to-mono-600 shrink-0 group-hover/item:from-mono-600 group-hover/item:to-mono-700 transition-colors"
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
