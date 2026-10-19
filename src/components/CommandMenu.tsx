import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { toast } from "sonner";
import { ArrowRight, ArrowUpRight, Copy, CornerDownLeft, FileText, Hash, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGoToSection } from "@/hooks/useGoToSection";
import { EMAIL, SECTIONS, SOCIALS } from "@/lib/site";

type CommandMenuState = { open: boolean; setOpen: (open: boolean) => void };

const CommandMenuContext = createContext<CommandMenuState>({ open: false, setOpen: () => {} });

export const useCommandMenu = () => useContext(CommandMenuContext);

export const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    toast.success("Email copied to clipboard", { description: EMAIL });
  } catch {
    window.location.href = `mailto:${EMAIL}`;
  }
};

const itemClass =
  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 cursor-pointer select-none data-[selected=true]:bg-white/[0.07] data-[selected=true]:text-white transition-colors";

const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-white/30";

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] px-1.5 font-mono text-[10px] text-white/50">
    {children}
  </kbd>
);

const CommandMenuDialog = () => {
  const { open, setOpen } = useCommandMenu();
  const navigate = useNavigate();
  const goToSection = useGoToSection();

  const run = (action: () => void) => {
    setOpen(false);
    // Let the dialog release scroll lock before scrolling.
    setTimeout(action, 60);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="top-[18%] translate-y-0 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] w-[calc(100%-2rem)] max-w-xl gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c]/95 p-0 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:rounded-2xl [&>button]:hidden">
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <Command loop className="flex flex-col">
          <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
            <Search className="h-4 w-4 shrink-0 text-white/30" />
            <Command.Input
              autoFocus
              placeholder="Where to? Search sections, pages, links…"
              className="h-14 w-full bg-transparent text-[15px] text-white placeholder:text-white/30 outline-none"
            />
            <Kbd>esc</Kbd>
          </div>

          <Command.List data-lenis-prevent className="max-h-[min(420px,60vh)] overflow-y-auto p-2 scroll-py-2">
            <Command.Empty className="py-10 text-center text-sm text-white/40">
              Nothing here. Try “resume” or “github”.
            </Command.Empty>

            <Command.Group heading="Jump to" className={groupClass}>
              {SECTIONS.map((section, i) => (
                <Command.Item
                  key={section.id}
                  value={`section ${section.label} ${section.id}`}
                  onSelect={() => run(() => goToSection(section.id))}
                  className={itemClass}
                >
                  <Hash className="h-4 w-4 text-white/25 group-data-[selected=true]:text-[#B6443A]" />
                  <span className="flex-1">{section.label}</span>
                  <span className="font-mono text-[10px] text-white/25">0{i}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Pages" className={groupClass}>
              {[
                { label: "Project archive", to: "/projects" },
                { label: "Journey timeline", to: "/journey" },
              ].map((page) => (
                <Command.Item key={page.to} value={`page ${page.label}`} onSelect={() => run(() => navigate(page.to))} className={itemClass}>
                  <ArrowRight className="h-4 w-4 text-white/25 group-data-[selected=true]:text-[#B6443A]" />
                  <span className="flex-1">{page.label}</span>
                </Command.Item>
              ))}
              <Command.Item value="page resume cv pdf" onSelect={() => run(() => window.open("/resume", "_blank", "noopener"))} className={itemClass}>
                <FileText className="h-4 w-4 text-white/25 group-data-[selected=true]:text-[#B6443A]" />
                <span className="flex-1">Résumé</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/25" />
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Reach out" className={groupClass}>
              <Command.Item value="copy email address" onSelect={() => run(copyEmail)} className={itemClass}>
                <Copy className="h-4 w-4 text-white/25 group-data-[selected=true]:text-[#B6443A]" />
                <span className="flex-1">Copy email address</span>
                <span className="hidden font-mono text-[10px] text-white/25 sm:inline">{EMAIL}</span>
              </Command.Item>
              {SOCIALS.filter((s) => s.name !== "Email").map((social) => (
                <Command.Item
                  key={social.name}
                  value={`${social.name} ${social.handle}`}
                  onSelect={() => run(() => window.open(social.href, "_blank", "noopener"))}
                  className={itemClass}
                >
                  <social.icon className="h-4 w-4 text-white/25 group-data-[selected=true]:text-[#B6443A]" />
                  <span className="flex-1">{social.name}</span>
                  <span className="font-mono text-[10px] text-white/25">{social.handle}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-2.5 font-mono text-[10px] text-white/30">
            <span>abhishekthormothe.in</span>
            <span className="flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              <span className="mr-2">move</span>
              <Kbd>
                <CornerDownLeft className="h-2.5 w-2.5" />
              </Kbd>
              <span>open</span>
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export const CommandMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpenState] = useState(false);
  const setOpen = useCallback((value: boolean) => setOpenState(value), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenState((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandMenuContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandMenuDialog />
    </CommandMenuContext.Provider>
  );
};
