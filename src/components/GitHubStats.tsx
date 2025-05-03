import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Github, Star, GitBranch, Users, GitCommit, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const GithubStats = () => {
  const { theme } = useTheme();
  const username = "abhi2k4";

  // Enhanced theme parameters with better colors
  const themeColors = {
    dark: {
      bg: '00000000',
      text: 'FFFFFF',
      stroke: '64748B', // slate-500
      ring: '3B82F6',   // blue-500
      fire: 'F59E0B',   // amber-500
      labels: '94A3B8'  // slate-400
    },
    light: {
      bg: '00000000',
      text: '1E293B',   // slate-800
      stroke: '64748B', // slate-500
      ring: '2563EB',   // blue-600
      fire: 'D97706',   // amber-600
      labels: '475569'  // slate-600
    }
  };

  const colors = theme === 'dark' ? themeColors.dark : themeColors.light;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 
        hover:shadow-lg hover:shadow-primary/5 hover:bg-card/80 
        hover:backdrop-blur-md hover:scale-[1.02] hover:-translate-y-1 
        border border-primary/5 group"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">GitHub Activity</h3>
          </div>
          <a
            href={`https://github.com/abhi2k4`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View Profile
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="space-y-4">
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            src={`https://streak-stats.demolab.com?user=${username}&hide_border=true&background=${colors.bg}&stroke=${colors.stroke}&ring=${colors.ring}&fire=${colors.fire}&currStreakLabel=${colors.labels}&sideLabels=${colors.labels}&dates=${colors.text}&sideNums=${colors.text}&currStreakNum=${colors.text}`}
            alt="GitHub Streak"
            className="w-full mx-auto rounded-lg hover:contrast-125 transition-all duration-300 select-none"
            loading="lazy"
            draggable="false"
          />
        </div>

      </div>
    </motion.div>
  );
};

export default GithubStats;