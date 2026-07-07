import { motion } from 'framer-motion';
import { ArrowDown, Mail, FolderOpen, Briefcase, Download } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-mono-950"
    >
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-mono-200/30 to-mono-300/20 dark:from-mono-800/30 dark:to-mono-700/20 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-mono-300/20 to-mono-200/30 dark:from-mono-700/20 dark:to-mono-800/30 blur-3xl"
      />

      {/* Dot grid background */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0 hero-grid-bg" />
      </div>

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
        <motion.line
          x1="0"
          y1="30%"
          x2="100%"
          y2="70%"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.line
          x1="100%"
          y1="30%"
          x2="0"
          y2="70%"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
        />
      </svg>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Intern badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mono-100 dark:bg-mono-900 border border-mono-200 dark:border-mono-800 mb-8 gradient-border card-shine"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-medium text-mono-600 dark:text-mono-400">
            Intern at Zephyr Technologies & Solution
          </span>
        </motion.div>

        {/* Role text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm font-medium tracking-[0.2em] uppercase gradient-text mb-6"
        >
          CSE (IoT) Student & Software Intern
        </motion.p>

        {/* Name with animated gradient underline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative inline-block"
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-mono-900 dark:text-mono-50 tracking-tight leading-[1.1]">
            Muhammed
            <br />
            <span className="text-mono-400 dark:text-mono-600">Nayeem</span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mono-400 dark:via-mono-600 to-transparent origin-left"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 max-w-xl mx-auto text-mono-500 dark:text-mono-400 text-base md:text-lg leading-relaxed"
        >
          Aspiring engineer at the intersection of IoT and web technology,
          building smart solutions that connect the physical and digital world.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => scrollTo('#contact')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-7 py-3 bg-mono-900 dark:bg-mono-50 text-white dark:text-mono-900 text-sm font-medium rounded-full overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-mono-700 to-mono-800 dark:from-mono-200 dark:to-mono-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Mail size={16} className="relative z-10" />
            <span className="relative z-10">Contact Me</span>
          </motion.button>

          <motion.button
            onClick={() => scrollTo('#projects')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-7 py-3 border border-mono-300 dark:border-mono-700 text-mono-700 dark:text-mono-300 text-sm font-medium rounded-full overflow-hidden gradient-border"
          >
            <span className="absolute inset-0 bg-mono-50 dark:bg-mono-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FolderOpen size={16} className="relative z-10" />
            <span className="relative z-10">View Projects</span>
          </motion.button>

          <motion.button
            onClick={() => scrollTo('#experience')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-7 py-3 border border-mono-300 dark:border-mono-700 text-mono-700 dark:text-mono-300 text-sm font-medium rounded-full overflow-hidden gradient-border"
          >
            <span className="absolute inset-0 bg-mono-50 dark:bg-mono-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Briefcase size={16} className="relative z-10" />
            <span className="relative z-10">Experience</span>
          </motion.button>

          <a
            href="/resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 px-7 py-3 border border-mono-300 dark:border-mono-700 text-mono-700 dark:text-mono-300 text-sm font-medium rounded-full overflow-hidden gradient-border"
            >
              <span className="absolute inset-0 bg-mono-50 dark:bg-mono-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Download size={16} className="relative z-10" />
              <span className="relative z-10">Download CV</span>
            </motion.button>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 group"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <span className="text-xs text-mono-400 dark:text-mono-600 mb-1 group-hover:text-mono-600 dark:group-hover:text-mono-400 transition-colors">Scroll</span>
          <div className="p-2 rounded-full border border-mono-300 dark:border-mono-700 group-hover:border-mono-500 dark:group-hover:border-mono-500 group-hover:bg-mono-100 dark:group-hover:bg-mono-900 transition-all">
            <ArrowDown size={16} className="text-mono-400 dark:text-mono-600 group-hover:text-mono-600 dark:group-hover:text-mono-400" />
          </div>
        </motion.div>
      </motion.button>
    </section>
  );
}
