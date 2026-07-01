import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Heart, Cpu, Zap } from 'lucide-react';

const technicalSkills = [
  { name: 'C', level: 80, icon: '{ }' },
  { name: 'HTML', level: 90, icon: '<>' },
  { name: 'CSS', level: 85, icon: '#' },
  { name: 'Python', level: 45, icon: 'Py' },
  { name: 'Arduino & IoT', level: 75, icon: 'IoT' },
];

const softSkills = [
  { name: 'Teamwork', desc: 'Collaborative mindset' },
  { name: 'Communication', desc: 'Clear expression' },
  { name: 'Adaptability', desc: 'Flexible approach' },
];

const tools = [
  { name: 'Arduino IDE', color: 'from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/10' },
  { name: 'VS Code', color: 'from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10' },
  { name: 'Git', color: 'from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/10' },
  { name: 'Figma', color: 'from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/10' },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding bg-mono-50 dark:bg-mono-900 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute -top-1/2 -left-1/4 w-[80%] h-[200%] opacity-[0.03] dark:opacity-[0.05] rounded-full"
        style={{
          background: 'radial-gradient(circle, currentColor 0%, transparent 70%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-mono-400 dark:text-mono-500 mb-3">
            Skills
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-mono-900 dark:text-mono-50 mb-12">
            What I work with
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="p-2 rounded-lg bg-mono-200 dark:bg-mono-800">
                <Code2 size={18} className="text-mono-600 dark:text-mono-400" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-mono-800 dark:text-mono-200">
                Technical
              </h3>
            </motion.div>

            <div className="space-y-5">
              {technicalSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-md bg-mono-200 dark:bg-mono-800 flex items-center justify-center text-xs font-bold text-mono-600 dark:text-mono-400 group-hover:bg-mono-300 dark:group-hover:bg-mono-700 transition-colors">
                        {skill.icon}
                      </span>
                      <span className="text-sm font-medium text-mono-700 dark:text-mono-300 group-hover:text-mono-900 dark:group-hover:text-mono-100 transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="text-xs font-medium text-mono-500 dark:text-mono-500 px-2 py-0.5 rounded-full bg-mono-100 dark:bg-mono-800"
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-mono-200/50 dark:bg-mono-800/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                      className="h-full rounded-full relative overflow-hidden group-hover:shadow-lg transition-shadow"
                      style={{
                        background: 'linear-gradient(90deg, #525252, #737373, #a3a3a3)',
                      }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Soft Skills & Tools */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-mono-200 dark:bg-mono-800">
                  <Heart size={18} className="text-mono-600 dark:text-mono-400" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-mono-800 dark:text-mono-200">
                  Soft Skills
                </h3>
              </div>

              <div className="grid gap-3">
                {softSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-mono-950 border border-mono-200 dark:border-mono-800 hover:border-mono-400 dark:hover:border-mono-600 transition-all duration-200 cursor-default group/card"
                  >
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-mono-200 to-mono-300 dark:from-mono-800 dark:to-mono-700 flex items-center justify-center group-hover/card:from-mono-300 group-hover/card:to-mono-400 dark:group-hover/card:from-mono-700 dark:group-hover/card:to-mono-600 transition-all"
                    >
                      <Zap size={16} className="text-mono-600 dark:text-mono-400" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-mono-800 dark:text-mono-200 group-hover/card:text-mono-900 dark:group-hover/card:text-mono-50 transition-colors">
                        {skill.name}
                      </p>
                      <p className="text-xs text-mono-500 dark:text-mono-500">{skill.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-mono-200 dark:bg-mono-800">
                  <Cpu size={18} className="text-mono-600 dark:text-mono-400" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-mono-800 dark:text-mono-200">
                  Tools & Platforms
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <motion.span
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r ${tool.color} text-mono-700 dark:text-mono-300 border border-mono-200/50 dark:border-mono-700/50 cursor-default hover:shadow-md transition-shadow`}
                  >
                    {tool.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
