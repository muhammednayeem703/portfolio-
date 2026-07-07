import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Interests', href: '#interests' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-mono-950/80 backdrop-blur-xl shadow-sm border-b border-mono-100 dark:border-mono-900'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.button
          onClick={() => handleClick('#hero')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative font-heading font-bold text-lg tracking-tight text-mono-900 dark:text-mono-50"
        >
          <span className="relative z-10">MN</span>
          <span className="text-mono-400 relative z-10">.</span>
          <span className="absolute -inset-2 bg-mono-100 dark:bg-mono-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100 -z-10 transition-transform" />
        </motion.button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.href}
              onClick={() => handleClick(link.href)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? 'text-mono-900 dark:text-mono-50'
                  : 'text-mono-500 dark:text-mono-400 hover:text-mono-900 dark:hover:text-mono-50'
              }`}
            >
              {hoveredIndex === i && activeSection !== link.href.slice(1) && (
                <motion.span
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-mono-100 dark:bg-mono-800 rounded-lg -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="navbar-active"
                  className="absolute inset-0 bg-mono-200 dark:bg-mono-800 rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </motion.button>
          ))}

          {/* Download Resume Button */}
          <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-mono-900 dark:bg-mono-50 text-white dark:text-mono-900 hover:bg-mono-800 dark:hover:bg-mono-200 transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Resume
            </motion.button>
          </a>

          {/* Theme toggle */}
          <div className="w-px h-5 bg-mono-200 dark:bg-mono-800 mx-2" />
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-mono-500 dark:text-mono-400 hover:text-mono-900 dark:hover:text-mono-50 hover:bg-mono-100 dark:hover:bg-mono-800 transition-colors"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-mono-500 dark:text-mono-400 hover:bg-mono-100 dark:hover:bg-mono-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-mono-900 dark:text-mono-50"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 dark:bg-mono-950/95 backdrop-blur-xl border-t border-mono-200 dark:border-mono-800"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`py-3 px-4 rounded-lg text-sm font-medium text-left transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-mono-900 dark:text-mono-50 bg-mono-100 dark:bg-mono-900'
                      : 'text-mono-600 dark:text-mono-400 hover:text-mono-900 dark:hover:text-mono-50 hover:bg-mono-50 dark:hover:bg-mono-900/50'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              
              {/* Mobile Download Resume Button */}
              <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer" className="w-full">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="w-full py-3 px-4 rounded-lg text-sm font-medium text-left bg-mono-900 dark:bg-mono-50 text-white dark:text-mono-900 hover:bg-mono-800 dark:hover:bg-mono-200 transition-colors flex items-center gap-2 mt-2"
                >
                  <Download size={16} />
                  Download Resume
                </motion.button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
