import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Droplets, Globe, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Soil Moisture Monitoring System',
    description:
      'An IoT-based system using Arduino to monitor real-time soil moisture levels. The sensor data drives automated irrigation decisions, reducing water waste and improving crop health.',
    tags: ['Arduino', 'IoT', 'Sensors', 'Automation'],
    icon: Droplets,
    gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
  },
  {
    title: 'Trip Booking Website',
    description:
      'A responsive front-end website for browsing and booking trips. Built with clean HTML/CSS layout and intuitive navigation, designed to deliver a seamless user experience across devices.',
    tags: ['HTML', 'CSS', 'Frontend', 'Responsive'],
    icon: Globe,
    gradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding bg-white dark:bg-mono-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-mono-100 dark:bg-mono-900 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-mono-100 dark:bg-mono-900 rounded-full blur-3xl opacity-50" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-mono-400 dark:text-mono-500 mb-3">
            Projects
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-mono-900 dark:text-mono-50 mb-12">
            Things I've built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                <div className="relative h-full rounded-2xl bg-mono-50 dark:bg-mono-900 border border-mono-200 dark:border-mono-800 p-8 overflow-hidden transition-all duration-500 group-hover:border-mono-300 dark:group-hover:border-mono-700 group-hover:shadow-2xl">
                  {/* Animated gradient border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Corner accent */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-mono-200/50 to-transparent dark:from-mono-700/30 rounded-full group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-mono-200 to-mono-300 dark:from-mono-800 dark:to-mono-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                      >
                        <Icon size={24} className="text-mono-600 dark:text-mono-400" />
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 3, y: -3 }}
                        className="p-3 rounded-full border border-mono-200 dark:border-mono-700 group-hover:border-mono-400 dark:group-hover:border-mono-500 transition-colors"
                      >
                        <ExternalLink size={18} className="text-mono-400 dark:text-mono-600 group-hover:text-mono-600 dark:group-hover:text-mono-400" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <h3 className="font-heading text-xl font-bold text-mono-900 dark:text-mono-50 mb-3 group-hover:text-mono-700 dark:group-hover:text-mono-100 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-mono-500 dark:text-mono-400 leading-relaxed mb-6 group-hover:text-mono-600 dark:group-hover:text-mono-300 transition-colors">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-white dark:bg-mono-950 text-mono-600 dark:text-mono-400 border border-mono-200 dark:border-mono-700"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* View project link */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-sm font-medium text-mono-400 dark:text-mono-500 group-hover:text-mono-600 dark:group-hover:text-mono-400 transition-colors cursor-pointer"
                    >
                      View Project
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
