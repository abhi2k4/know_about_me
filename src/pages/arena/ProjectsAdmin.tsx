import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useProjects, type Project } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, GripVertical, Loader2, ExternalLink, Github } from "lucide-react";
import { toast } from "sonner";

const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "ds2uw5gcw";
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

type FormState = Partial<Project> & { stack_raw?: string; tags_raw?: string; challenges_raw?: string; outcomes_raw?: string };

const emptyForm = (): FormState => ({
  title: "",
  description: "",
  tags_raw: "",
  images: [],
  demo_url: "",
  code_url: "",
  note: "",
  problem: "",
  solution: "",
  role: "",
  stack_raw: "",
  challenges_raw: "",
  outcomes_raw: "",
  is_published: true,
  display_order: 0,
});

function projectToForm(p: Project): FormState {
  return {
    ...p,
    tags_raw: p.tags?.join(", ") ?? "",
    stack_raw: p.stack?.map((s) => s.name).join(", ") ?? "",
    challenges_raw: p.challenges?.join("\n") ?? "",
    outcomes_raw: p.outcomes?.join("\n") ?? "",
  };
}

function formToPayload(f: FormState) {
  return {
    title: f.title,
    description: f.description,
    tags: f.tags_raw?.split(",").map((t) => t.trim()).filter(Boolean) ?? [],
    images: f.images ?? [],
    demo_url: f.demo_url || null,
    code_url: f.code_url || null,
    note: f.note || null,
    problem: f.problem || null,
    solution: f.solution || null,
    role: f.role || null,
    stack: f.stack_raw?.split(",").map((s) => ({ name: s.trim() })).filter((s) => s.name) ?? [],
    challenges: f.challenges_raw?.split("\n").map((c) => c.trim()).filter(Boolean) ?? [],
    outcomes: f.outcomes_raw?.split("\n").map((o) => o.trim()).filter(Boolean) ?? [],
    is_published: f.is_published ?? true,
    display_order: Number(f.display_order) || 0,
  };
}

export default function ProjectsAdmin() {
  const queryClient = useQueryClient();
  const { data: projects = [], isLoading } = useProjects(true);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const openNew = () => {
    setEditing(emptyForm());
    setIsNew(true);
  };
  const openEdit = (p: Project) => {
    setEditing(projectToForm(p));
    setIsNew(false);
  };
  const closeForm = () => {
    setEditing(null);
    setIsNew(false);
  };

  const handleUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (!CLOUDINARY_PRESET) {
      toast.error("VITE_CLOUDINARY_UPLOAD_PRESET is not set in .env");
      return;
    }
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", CLOUDINARY_PRESET);
      fd.append("folder", "know me/projects");
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, { method: "POST", body: fd });
        const json = await res.json();
        if (json.secure_url) urls.push(json.secure_url);
        else toast.error(`Upload failed: ${json.error?.message ?? "Unknown error"}`);
      } catch {
        toast.error("Upload failed - check network and preset");
      }
    }
    setEditing((prev) => ({ ...prev, images: [...(prev?.images ?? []), ...urls] }));
    setUploading(false);
    toast.success(`${urls.length} image(s) uploaded`);
  }, []);

  const removeImage = (url: string) => {
    setEditing((prev) => ({ ...prev, images: prev?.images?.filter((u) => u !== url) }));
  };

  const handleSave = async () => {
    if (!editing?.title) { toast.error("Title is required"); return; }
    setSaving(true);
    const payload = formToPayload(editing);
    let error;
    if (isNew) {
      ({ error } = await supabase.from("portfolio_projects").insert(payload));
    } else {
      ({ error } = await supabase.from("portfolio_projects").update(payload).eq("id", editing.id));
    }
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(isNew ? "Project created!" : "Project updated!");
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    closeForm();
  };

  const togglePublish = async (p: Project) => {
    const { error } = await supabase.from("portfolio_projects").update({ is_published: !p.is_published }).eq("id", p.id);
    if (error) toast.error(error.message);
    else queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const deleteProject = async (p: Project) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", p.id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); queryClient.invalidateQueries({ queryKey: ["projects"] }); }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
        <Button onClick={openNew} className="bg-[#B6443A] hover:bg-[#c94f44] text-white gap-2">
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>

      {/* Project List */}
      {isLoading ? (
        <div className="text-white/40 text-sm animate-pulse">Loading projects…</div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-white/20 transition-colors">
              <GripVertical className="w-4 h-4 text-white/20 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white truncate">{p.title}</span>
                  {!p.is_published && <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/40 font-mono">DRAFT</span>}
                </div>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {p.tags?.slice(0, 4).map((t) => (
                    <span key={t} className="text-[10px] text-white/30 font-mono">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {p.demo_url && <a href={p.demo_url} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-white/30 hover:text-white transition-colors"><ExternalLink className="w-3.5 h-3.5" /></a>}
                {p.code_url && <a href={p.code_url} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-white/30 hover:text-white transition-colors"><Github className="w-3.5 h-3.5" /></a>}
                <button onClick={() => togglePublish(p)} className="p-1.5 rounded-lg text-white/30 hover:text-white transition-colors" title={p.is_published ? "Unpublish" : "Publish"}>
                  {p.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-white/30 hover:text-[#B6443A] transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteProject(p)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / New Form Panel */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-end">
          <div 
            data-lenis-prevent
            className="w-full max-w-2xl h-full bg-[#0d0d0d] border-l border-white/10 overflow-y-auto flex flex-col"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-[#0d0d0d] z-10">
              <h3 className="text-base font-semibold text-white">{isNew ? "New Project" : "Edit Project"}</h3>
              <button onClick={closeForm} className="p-1.5 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            {/* Form */}
            <div className="flex-1 px-6 py-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs text-white/50">Title *</label>
                  <Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs text-white/50">Description *</label>
                  <Textarea rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="bg-white/5 border-white/10 text-white resize-none" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs text-white/50">Tags (comma-separated)</label>
                  <Input value={editing.tags_raw ?? ""} onChange={(e) => setEditing({ ...editing, tags_raw: e.target.value })} placeholder="React, Node.js, Tailwind" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50">Demo URL</label>
                  <Input value={editing.demo_url ?? ""} onChange={(e) => setEditing({ ...editing, demo_url: e.target.value })} placeholder="https://..." className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50">Code URL</label>
                  <Input value={editing.code_url ?? ""} onChange={(e) => setEditing({ ...editing, code_url: e.target.value })} placeholder="https://github.com/..." className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>

              {/* Image Uploader */}
              <div className="space-y-2">
                <label className="text-xs text-white/50">Preview Images</label>
                <label className={`flex items-center justify-center gap-2 border border-dashed border-white/20 rounded-lg h-20 cursor-pointer hover:border-[#B6443A]/50 hover:bg-[#B6443A]/5 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                  <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => handleUpload(e.target.files)} />
                  {uploading ? <Loader2 className="w-4 h-4 text-white/40 animate-spin" /> : <Upload className="w-4 h-4 text-white/40" />}
                  <span className="text-xs text-white/40">{uploading ? "Uploading to Cloudinary…" : "Click to upload images"}</span>
                </label>
                {(editing.images?.length ?? 0) > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {editing.images!.map((url) => (
                      <div key={url} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => removeImage(url)} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* More fields */}
              <div className="space-y-4">
                {[
                  { key: "problem", label: "The Problem", rows: 2 },
                  { key: "solution", label: "The Solution", rows: 2 },
                  { key: "role", label: "My Role", rows: 2 },
                ].map(({ key, label, rows }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-xs text-white/50">{label}</label>
                    <Textarea rows={rows} value={(editing as Record<string, string>)[key] ?? ""} onChange={(e) => setEditing({ ...editing, [key]: e.target.value })} className="bg-white/5 border-white/10 text-white resize-none" />
                  </div>
                ))}
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50">Tech Stack (comma-separated)</label>
                  <Input value={editing.stack_raw ?? ""} onChange={(e) => setEditing({ ...editing, stack_raw: e.target.value })} placeholder="React, FastAPI, PostgreSQL" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50">Key Challenges (one per line)</label>
                  <Textarea rows={3} value={editing.challenges_raw ?? ""} onChange={(e) => setEditing({ ...editing, challenges_raw: e.target.value })} className="bg-white/5 border-white/10 text-white resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50">Outcomes (one per line)</label>
                  <Textarea rows={3} value={editing.outcomes_raw ?? ""} onChange={(e) => setEditing({ ...editing, outcomes_raw: e.target.value })} className="bg-white/5 border-white/10 text-white resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50">Note (optional)</label>
                  <Input value={editing.note ?? ""} onChange={(e) => setEditing({ ...editing, note: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/50">Display Order</label>
                    <Input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={editing.is_published ?? true} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} className="w-4 h-4 rounded" />
                      <span className="text-xs text-white/50">Published</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-3 px-6 py-4 border-t border-white/10 sticky bottom-0 bg-[#0d0d0d]">
              <Button onClick={handleSave} disabled={saving || uploading} className="flex-1 bg-[#B6443A] hover:bg-[#c94f44] text-white gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Saving…" : isNew ? "Create Project" : "Save Changes"}
              </Button>
              <Button variant="outline" onClick={closeForm} className="border-white/20 text-white/60 hover:text-white hover:bg-white/5">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
