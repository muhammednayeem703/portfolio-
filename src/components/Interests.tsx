import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Wifi, Globe2, Cpu, ArrowUpRight } from 'lucide-react';

const interests = [
  {
    title: 'Internet of Things',
    description: 'Building connected devices and smart systems that bring the physical world online.',
    icon: Wifi,
    gradient: 'from-cyan-100/50 to-blue-100/50 dark:from-cyan-900/20 dark:to-blue-900/20',
  },
  {
    title: 'Web Development',
    description: 'Crafting clean, responsive interfaces and experiences that make technology accessible.',
    icon: Globe2,
    gradient: 'from-violet-100/50 to-purple-100/50 dark:from-violet-900/20 dark:to-purple-900/20',
  },
  {
    title: 'Technology',
    description: 'Staying at the forefront of emerging tech, from embedded computing to cloud platforms.',
    icon: Cpu,
    gradient: 'from-amber-100/50 to-orange-100/50 dark:from-amber-900/20 dark:to-orange-900/20',
  },
];

export default function Interests() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="interests" className="section-padding bg-white dark:bg-mono-950 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02] dark:opacity-[0.05]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0" style={{
          background: 'conic-gradient(from 0deg, transparent, currentColor 10%, transparent 20%, currentColor 30%, transparent 40%)',
        }} />
      </motion.div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-mono-400 dark:text-mono-500 mb-3">
            Interests
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-mono-900 dark:text-mono-50 mb-12">
            What drives me
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {interests.map((interest, i) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${interest.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative h-full text-center p-8 rounded-2xl bg-mono-50 dark:bg-mono-900 border border-mono-200 dark:border-mono-800 group-hover:border-transparent transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                  {/* Animated particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(3)].map((_, j) => (
                      <motion.div
                        key={j}
                        className="absolute w-1 h-1 rounded-full bg-mono-400/30"
                        initial={{
                          x: Math.random() * 100,
                          y: Math.random() * 100,
                        }}
                        animate={{
                          y: [null, -50],
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: j * 0.5,
                        }}
                      />
                    ))}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-mono-200 to-mono-300 dark:from-mono-800 dark:to-mono-700 flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow"
                  >
                    <Icon size={28} className="text-mono-600 dark:text-mono-400" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="relative font-heading text-lg font-bold text-mono-900 dark:text-mono-50 mb-3 group-hover:text-mono-800 dark:group-hover:text-mono-100 transition-colors">
                    {interest.title}
                  </h3>

                  {/* Description */}
                  <p className="relative text-sm text-mono-500 dark:text-mono-400 leading-relaxed group-hover:text-mono-600 dark:group-hover:text-mono-300 transition-colors">
                    {interest.description}
                  </p>

                  {/* Arrow indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight size={18} className="text-mono-400" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
