import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Github, Star, GitBranch, Users, GitCommit, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const GithubStats = () => {

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
            src={`https://streak-stats.demolab.com?user=abhi2k4&theme=dark&hide_border=true&background=00000000`}
            alt="GitHub Streak"
            className="w-full mx-auto rounded-lg hover:contrast-125 transition-all duration-300"
            loading="lazy"
          />
{/* 
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            src={`https://github-readme-stats.vercel.app/apabhi2k4&show_icons=true&theme=transparent&hide_border=true&card_width=500`}
            alt="GitHub Stats"
            className="w-full max-w-lg mx-auto rounded-lg hover:contrast-125 transition-all duration-300"
            loading="lazy"
          /> */}
        </div>

      </div>
    </motion.div>
  );
};

export default GithubStats;