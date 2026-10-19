import { ArrowUpRight, Github } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import ProjectCarousel from "@/components/ProjectCarousel";
import type { Project } from "@/hooks/useProjects";

const Label = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#B6443A]">{children}</h3>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/65">
        <span className="mt-[3px] font-mono text-[10px] text-white/25">{String(i + 1).padStart(2, "0")}</span>
        {item}
      </li>
    ))}
  </ul>
);

const CaseStudyDialog = ({ project, onClose }: { project: Project | null; onClose: () => void }) => (
  <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
    <DialogContent
      data-lenis-prevent
      className="max-h-[90vh] w-[calc(100%-1.5rem)] max-w-4xl gap-0 overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a] p-0 text-white sm:rounded-2xl [&>button]:right-5 [&>button]:top-5 [&>button]:z-10"
    >
      {project && (
        <>
          <div className="border-b border-white/[0.07] p-6 sm:p-10">
            <DialogDescription className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Case study
            </DialogDescription>
            <DialogTitle className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
              {project.title}
            </DialogTitle>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-[#f0eadd] px-4 text-sm font-semibold text-black transition-colors hover:bg-white"
                >
                  Visit live
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </a>
              )}
              {project.code_url && (
                <a
                  href={project.code_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Github className="h-4 w-4" /> Source
                </a>
              )}
            </div>
          </div>

          {project.images?.length > 0 && (
            <div className="border-b border-white/[0.07] bg-black p-3 sm:p-4">
              <ProjectCarousel images={project.images} className="aspect-video w-full rounded-xl" />
            </div>
          )}

          <div className="grid gap-10 p-6 sm:grid-cols-3 sm:p-10">
            {[
              { label: "Problem", body: project.problem },
              { label: "Approach", body: project.solution },
              { label: "My role", body: project.role },
            ]
              .filter((s) => s.body)
              .map((s) => (
                <section key={s.label} className="space-y-3">
                  <Label>{s.label}</Label>
                  <p className="text-sm leading-relaxed text-white/65">{s.body}</p>
                </section>
              ))}
          </div>

          <div className="grid gap-10 border-t border-white/[0.07] p-6 sm:grid-cols-2 sm:p-10">
            {project.challenges?.length > 0 && (
              <section className="space-y-4">
                <Label>Hard parts</Label>
                <List items={project.challenges} />
              </section>
            )}
            {project.outcomes?.length > 0 && (
              <section className="space-y-4">
                <Label>Outcomes</Label>
                <List items={project.outcomes} />
              </section>
            )}
          </div>

          {(project.stack?.length > 0 || project.note) && (
            <div className="flex flex-col gap-4 border-t border-white/[0.07] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div className="flex flex-wrap gap-2">
                {project.stack?.map((tech) => (
                  <span key={tech.name} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-white/60">
                    {tech.name}
                  </span>
                ))}
              </div>
              {project.note && <p className="max-w-sm text-xs italic text-white/35">{project.note}</p>}
            </div>
          )}
        </>
      )}
    </DialogContent>
  </Dialog>
);

export default CaseStudyDialog;
