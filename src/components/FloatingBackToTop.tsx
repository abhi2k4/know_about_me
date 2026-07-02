import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const FloatingBackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 md:bottom-24 md:right-10 w-12 h-12 rounded-full bg-[#0c0c0c]/90 border border-white/10 text-white flex items-center justify-center z-50 backdrop-blur-md cursor-pointer transition-colors duration-300 hover:border-[#B6443A]/30 hover:bg-[#0f0a09] group"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          {/* Scroll progress circle */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
            <circle
              cx="24"
              cy="24"
              r="22"
              className="stroke-white/[0.04] fill-none"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              className="stroke-[#B6443A] fill-none"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress,
              }}
            />
          </svg>
          
          {/* Minimal Arrow icon */}
          <ArrowUp className="w-5.5 h-5.5 text-white/50 group-hover:text-white transition-colors duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingBackToTop;
