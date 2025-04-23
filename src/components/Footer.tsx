
import { Code } from "lucide-react";
import Logo from "./Logo";
import { LikeButton } from "./LikeButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="border-t py-8 bg-secondary/20">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo/>
            <span className="font-bold text-lg font-audiowide">abhi codes</span>
          </div>
          <div className="flex gap-6 mb-4 mt-4 animate-fade-in">
            <LikeButton />
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p className="mb-1">Designed and built with ❤️</p>
            <p>&copy; {currentYear} All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
