import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export const BackgroundEffect = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-1 overflow-hidden pointer-events-none">
      {/* Animated Gradient Orbs with enhanced animations */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-1/4 -left-12 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br ${
          theme === 'dark' 
            ? 'from-blue-500/10 via-cyan-500/10 to-blue-500/10' 
            : 'from-blue-600/10 via-cyan-600/10 to-blue-600/10'
        }`}
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
          rotate: [0, -45, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className={`absolute bottom-1/4 -right-12 w-96 h-96 rounded-full blur-3xl bg-gradient-to-bl ${
          theme === 'dark' 
            ? 'from-purple-500/10 via-pink-500/10 to-purple-500/10' 
            : 'from-purple-600/10 via-pink-600/10 to-purple-600/10'
        }`}
      />

      {/* Enhanced Grid Pattern */}
      <div 
        className={`absolute inset-0 ${
          theme === 'dark'
            ? '[background:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:48px_48px]'
            : '[background:linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:48px_48px]'
        }`}
      />

      {/* Radial Dots Pattern */}
      <div 
        className={`absolute inset-0 ${
          theme === 'dark'
            ? '[background:radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px),radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-position:0_0,16px_16px] [background-size:32px_32px]'
            : '[background:radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px),radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-position:0_0,16px_16px] [background-size:32px_32px]'
        }`}
      />

      {/* Subtle Noise Texture */}
      <div 
        className={`absolute inset-0 mix-blend-soft-light opacity-[0.3] ${
          theme === 'dark' ? 'invert' : ''
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px'
        }}
      />
    </div>
  );
};