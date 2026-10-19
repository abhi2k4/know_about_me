import { Github, Linkedin, Mail } from "lucide-react";

export const EMAIL = "thormothe.abhishek@gmail.com";

export const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const SOCIALS = [
  { name: "GitHub", handle: "abhi2k4", href: "https://github.com/abhi2k4", icon: Github },
  { name: "LinkedIn", handle: "thormotheabhishek", href: "https://linkedin.com/in/thormotheabhishek", icon: Linkedin },
  { name: "X", handle: "@amt_official04", href: "https://x.com/amt_official04", icon: XIcon },
  { name: "Email", handle: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
];

// Order matters: drives the header island index and the command menu.
export const SECTIONS = [
  { id: "home", label: "Index" },
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Journey" },
  { id: "techstack", label: "Stack" },
  { id: "services", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];

// "QuantFin - Smart Investment Platform" → ["QuantFin", "Smart Investment Platform"]
export const splitTitle = (title: string) => {
  const [name, ...rest] = title.split(/\s[-–—]\s/);
  return [name, rest.join(" – ")] as const;
};
