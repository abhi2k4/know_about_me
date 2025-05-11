import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Compass, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [isGlitching, setIsGlitching] = useState(false);

  // Trigger glitch effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background flex items-center justify-center">
      {/* Animated Matrix-like background */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 matrix-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/90 to-background/50 backdrop-blur-xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          {/* Glitching 404 Text */}
          <motion.div
            className="relative select-none"
            animate={{
              x: isGlitching ? [-2, 2, -2, 0] : 0,
              filter: isGlitching ? ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] : "hue-rotate(0deg)",
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.h1 
              className="text-8xl md:text-9xl font-bold"
              style={{
                textShadow: "2px 2px 0px var(--primary), -2px -2px 0px var(--destructive)",
                WebkitTextStroke: "2px var(--primary)",
                color: "transparent",
              }}
            >
              404
            </motion.h1>
            
            {/* Lost in Space Animation */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-20 -right-20 text-primary opacity-20"
            >
              <Compass className="w-40 h-40" />
            </motion.div>
          </motion.div>

          {/* Dynamic Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/50 to-primary">
              Lost in Digital Space
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Looks like you've ventured into uncharted territory! 
              <br className="hidden md:inline" />
              Let's get you back on track.
            </p>
          </motion.div>

          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full group bg-primary/10 hover:bg-primary/20"
            >
              <a href="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Navigate Home
              </a>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="rounded-full group"
              onClick={() => window.history.back()}
            >
              <RefreshCcw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
              Try Again
            </Button>
          </div>

          {/* Path Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm"
          >
            <code className="font-mono text-sm">
              Error at: {location.pathname}
            </code>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
