
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
  leaf: Leaf
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
