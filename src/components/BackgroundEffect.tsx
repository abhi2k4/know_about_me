import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export const BackgroundEffect = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-1 overflow-hidden pointer-events-none bg-background">
      {/* Delicate Grid Pattern - Clean and Technical */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${theme === 'dark' ? '#ffffff' : '#000000'} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme === 'dark' ? '#ffffff' : '#000000'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Subtle Red Accents */}
      <motion.div
        animate={{
          opacity: [0.03, 0.06, 0.03],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]"
      />
      
      <motion.div
        animate={{
          opacity: [0.02, 0.05, 0.02],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px]"
      />
    </div>
  );
};