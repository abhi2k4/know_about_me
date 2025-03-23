
import { Code } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-12 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Code className="h-5 w-5" />
            <span className="font-bold text-lg">Portfolio</span>
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
