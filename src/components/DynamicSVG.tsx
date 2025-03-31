import React from "react";
import { 
  Sparkle, 
  Flame, 
  Star, 
  Heart, 
  Cloud,
  Sun,
  Moon,
  Zap,
  Flower,
  Leaf,
  Code2, 
  Database, 
  Globe, 
  Layout, 
  Terminal,
  Server,
  Cpu,
  Github,
  Chrome,
  Laptop,
  LucideProps
} from "lucide-react";

// Map of available icons
const icons = {
  sparkle: Sparkle,
  flame: Flame,
  star: Star,
  heart: Heart,
  cloud: Cloud,
  sun: Sun,
  moon: Moon,
  zap: Zap,
  flower: Flower,
  leaf: Leaf,
  code: Code2,         // For programming/development
  database: Database,  // For backend/data
  web: Globe,         // For web development
  frontend: Layout,    // For UI/UX
  terminal: Terminal,  // For CLI/DevOps
  server: Server,     // For backend/infrastructure
  cpu: Cpu,           // For system/performance
  github: Github,     // For version control
  browser: Chrome,    // For web browsers
  laptop: Laptop      // For development setup
};

type IconName = keyof typeof icons;

interface DynamicSVGProps extends Omit<LucideProps, 'ref'> {
  icon: IconName;
  className?: string;
}

export const DynamicSVG: React.FC<DynamicSVGProps> = ({ 
  icon, 
  className = "", 
  size = 24, 
  ...props 
}) => {
  const IconComponent = icons[icon];
  
  if (!IconComponent) {
    console.warn(`Icon '${icon}' not found`);
    return null;
  }

  return <IconComponent className={className} size={size} {...props} />;
};
