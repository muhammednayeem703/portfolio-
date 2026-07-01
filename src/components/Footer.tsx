import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white dark:bg-mono-950 border-t border-mono-100 dark:border-mono-900">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mono-300 dark:via-mono-700 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <p className="text-xs text-mono-400 dark:text-mono-500">
              &copy; {new Date().getFullYear()} Muhammed Nayeem
            </p>
            <p className="text-xs text-mono-300 dark:text-mono-600 mt-1">
              All rights reserved
            </p>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs text-mono-300 dark:text-mono-600">Built with</span>
            <div className="flex items-center gap-2">
              {['React', 'Tailwind', 'Framer'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-medium rounded-md bg-mono-50 dark:bg-mono-900 text-mono-400 dark:text-mono-500 border border-mono-100 dark:border-mono-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-mono-100 dark:bg-mono-900 text-mono-500 dark:text-mono-400 hover:bg-mono-200 dark:hover:bg-mono-800 transition-colors"
          >
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-xs font-medium">Back to top</span>
          </motion.button>
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-mono-100 dark:border-mono-900 relative"
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-px w-20 h-px bg-gradient-to-r from-transparent via-mono-400 dark:via-mono-600 to-transparent" />
          <p className="text-xs text-center text-mono-300 dark:text-mono-700">
            Designed & Developed with passion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
