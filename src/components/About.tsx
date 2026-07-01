import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, User, Briefcase } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-mono-50 dark:bg-mono-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-l from-mono-200 dark:from-mono-800 to-transparent" />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-mono-400 dark:text-mono-500 mb-3">
            About Me
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-mono-900 dark:text-mono-50 mb-12">
            A bit about myself
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-mono-300 to-mono-400 dark:from-mono-700 dark:to-mono-800 rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
              <div className="relative aspect-square rounded-2xl bg-mono-200 dark:bg-mono-800 overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500 gradient-border glow-hover">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="opacity-20"
                >
                  <User size={140} className="text-mono-300 dark:text-mono-700" strokeWidth={0.8} />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3 space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-mono-600 dark:text-mono-400 leading-relaxed text-base md:text-lg"
            >
              I'm a <strong className="text-mono-900 dark:text-mono-50">B.Tech CSE (IoT) student</strong> at
              Presidency University, Bengaluru, passionate about building
              systems that bridge the gap between hardware and software. My
              curiosity lies in how Internet of Things devices can be
              orchestrated through clean, intuitive web interfaces.
            </motion.p>

            {/* Internship highlight with animated border */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group relative p-5 rounded-xl bg-white dark:bg-mono-950 border border-mono-200 dark:border-mono-800 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-mono-100 via-mono-50 to-mono-100 dark:from-mono-900 dark:via-mono-850 dark:to-mono-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(120,120,120,0.1), transparent)',
                  animation: 'shimmer 2s infinite',
                }}
              />
              <div className="relative flex items-start gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-mono-200 to-mono-300 dark:from-mono-800 dark:to-mono-700 flex items-center justify-center shrink-0"
                >
                  <Briefcase size={18} className="text-mono-600 dark:text-mono-400" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-mono-900 dark:text-mono-50 mb-1">
                    Intern at Zephyr Technologies & Solution
                  </p>
                  <p className="text-sm text-mono-500 dark:text-mono-400 leading-relaxed">
                    Gaining practical experience in software and web development while
                    contributing to real-world projects.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-mono-600 dark:text-mono-400 leading-relaxed text-base md:text-lg"
            >
              When I'm not wiring sensors or writing firmware, I'm crafting
              front-end experiences with HTML, CSS, and modern web tools. I
              believe the best IoT products are those that are easy to
              understand and use -- and that starts with great design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mono-100 dark:bg-mono-800 text-mono-500 dark:text-mono-400 group hover:bg-mono-200 dark:hover:bg-mono-700 transition-colors duration-300"
            >
              <MapPin size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Bengaluru, India</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
