import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useExperiences, type Experience } from "@/hooks/useExperiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, X, GripVertical, Loader2 } from "lucide-react";
import { toast } from "sonner";

type FormState = Partial<Experience>;

const emptyForm = (): FormState => ({
  title: "",
  company: "",
  duration: "",
  description: "",
  display_order: 0,
});

export default function ExperienceAdmin() {
  const queryClient = useQueryClient();
  const { data: experiences = [], isLoading } = useExperiences();
  const [editing, setEditing] = useState<FormState | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setEditing(emptyForm()); setIsNew(true); };
  const openEdit = (e: Experience) => { setEditing({ ...e }); setIsNew(false); };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSave = async () => {
    if (!editing?.title || !editing?.company || !editing?.duration) {
      toast.error("Title, Company and Duration are required");
      return;
    }
    setSaving(true);
    const payload = {
      title: editing.title,
      company: editing.company,
      duration: editing.duration,
      description: editing.description ?? "",
      display_order: Number(editing.display_order) || 0,
    };
    let error;
    if (isNew) {
      ({ error } = await supabase.from("portfolio_experiences").insert(payload));
    } else {
      ({ error } = await supabase.from("portfolio_experiences").update(payload).eq("id", editing.id));
    }
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(isNew ? "Experience created!" : "Experience updated!");
    queryClient.invalidateQueries({ queryKey: ["experiences"] });
    closeForm();
  };

  const deleteExp = async (e: Experience) => {
    if (!confirm(`Delete "${e.title} @ ${e.company}"?`)) return;
    const { error } = await supabase.from("portfolio_experiences").delete().eq("id", e.id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); queryClient.invalidateQueries({ queryKey: ["experiences"] }); }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">{experiences.length} experience{experiences.length !== 1 ? "s" : ""}</p>
        <Button onClick={openNew} className="bg-[#B6443A] hover:bg-[#c94f44] text-white gap-2">
          <Plus className="w-4 h-4" /> New Experience
        </Button>
      </div>

      {/* Experience List */}
      {isLoading ? (
        <div className="text-white/40 text-sm animate-pulse">Loading…</div>
      ) : (
        <div className="flex flex-col gap-3">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 hover:border-white/20 transition-colors">
              <GripVertical className="w-4 h-4 text-white/20 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">
                  {exp.title} <span className="text-[#B6443A]">| {exp.company}</span>
                </div>
                <div className="text-xs text-white/40 mt-0.5 font-mono">{exp.duration}</div>
                <p className="text-xs text-white/30 mt-2 leading-relaxed line-clamp-2">{exp.description}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => openEdit(exp)} className="p-1.5 rounded-lg text-white/30 hover:text-[#B6443A] transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteExp(exp)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / New Panel */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-end">
          <div 
            data-lenis-prevent
            className="w-full max-w-lg h-full bg-[#0d0d0d] border-l border-white/10 overflow-y-auto flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-[#0d0d0d] z-10">
              <h3 className="text-base font-semibold text-white">{isNew ? "New Experience" : "Edit Experience"}</h3>
              <button onClick={closeForm} className="p-1.5 text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 px-6 py-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs text-white/50">Job Title *</label>
                <Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="SDE Intern" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/50">Company *</label>
                <Input value={editing.company ?? ""} onChange={(e) => setEditing({ ...editing, company: e.target.value })} placeholder="Acme Corp" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/50">Duration *</label>
                <Input value={editing.duration ?? ""} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} placeholder="Jan 2025 - Jun 2025" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/50">Description</label>
                <Textarea rows={4} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="bg-white/5 border-white/10 text-white resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/50">Display Order</label>
                <Input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-white/10 sticky bottom-0 bg-[#0d0d0d]">
              <Button onClick={handleSave} disabled={saving} className="flex-1 bg-[#B6443A] hover:bg-[#c94f44] text-white gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Saving…" : isNew ? "Create" : "Save Changes"}
              </Button>
              <Button variant="outline" onClick={closeForm} className="border-white/20 text-white/60 hover:text-white hover:bg-white/5">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
