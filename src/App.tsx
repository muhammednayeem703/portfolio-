import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import LoadingScreen from './components/LoadingScreen';
import FloatingParticles from './components/FloatingParticles';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { isDark, toggle } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-mono-950 text-mono-900 dark:text-mono-50 transition-colors duration-300">
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Background effects - only show after loading */}
      {!isLoading && (
        <>
          <FloatingParticles />
          <CursorGlow />
        </>
      )}

      {/* Main content */}
      <div className={`relative z-10 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Navbar isDark={isDark} toggleTheme={toggle} />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Interests />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
