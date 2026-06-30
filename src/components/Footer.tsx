import { Twitter, Linkedin, Github } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Twitter", href: "https://x.com/amt_official04", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com/in/thormotheabhishek", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/abhi2k4", icon: Github },
  ];

  return (
    <footer 
      className="w-full bg-[#040404] border-t border-white/5 pt-20 pb-8 px-6 sm:px-12 relative overflow-hidden flex flex-col justify-between min-h-[350px]"
    >
      {/* Background Interactive Word Art */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center opacity-85">
        <TextHoverEffect text="ABHISHEK" />
      </div>

      <div className="mt-auto pt-16"></div>

      {/* Tagline Centered Bottom */}
      <div className="w-full flex justify-center text-center mb-8 relative z-10 pointer-events-auto">
        <p className="text-sm text-white/40 max-w-md font-light leading-relaxed">
          Crafting elegant digital solutions at the intersection of engineering and design.
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="w-full pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10 pointer-events-auto">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-white/30">
          <p>© {currentYear} Abhishek Thormothe</p>
          <span className="hidden sm:inline text-white/10">|</span>
          <p>All rights reserved.</p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-300"
                aria-label={link.name}
              >
                <Icon className="w-4.5 h-4.5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
