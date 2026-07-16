import { useState, useRef } from "react";
import { useResumes, useResumeMutations } from "@/hooks/useResumes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Trash2, CheckCircle2, Circle, Loader2, FileUp, Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";

export default function ResumesAdmin() {
  const { resumes, isLoading } = useResumes();
  const { addResume, updateResume, deleteResume, setActiveResume } = useResumeMutations();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editing state for inline edits
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editFilename, setEditFilename] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }
    if (!title.trim()) {
      toast.error("Please provide a title for this resume");
      return;
    }

    const loadingToast = toast.loading("Uploading resume...");
    try {
      await addResume.mutateAsync({ file, title });
      toast.success("Resume uploaded successfully", { id: loadingToast });
      setTitle("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to upload resume", { id: loadingToast });
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setActiveResume.mutateAsync(id);
      toast.success("Active resume updated");
    } catch (error: any) {
      toast.error(error.message || "Failed to update active resume");
    }
  };

  const handleDelete = async (resume: any) => {
    if (!window.confirm(`Are you sure you want to delete ${resume.title}?`)) return;
    
    try {
      await deleteResume.mutateAsync(resume);
      toast.success("Resume deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete resume");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="w-6 h-6 animate-spin text-white/40" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Upload Section */}
      <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
          <FileUp className="w-5 h-5 text-white/50" />
          Upload New Resume
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-4">
            <Input
              placeholder="Resume Title (e.g., Software Engineer 2026)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black/50 border-white/10"
            />
            
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-white/20 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex flex-col items-center gap-2 text-white/50">
                  <Upload className="w-6 h-6" />
                  <span className="text-sm">
                    {file ? file.name : "Click to select PDF"}
                  </span>
                </div>
              </label>
            </div>
          </div>
          
          <div className="sm:w-32 flex flex-col justify-end">
            <Button 
              onClick={handleUpload}
              disabled={!file || !title.trim() || addResume.isPending}
              className="w-full bg-white text-black hover:bg-white/90"
            >
              {addResume.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* List Section */}
      <section>
        <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-white/50" />
          Resume Versions
        </h2>

        <div className="space-y-3">
          {resumes?.length === 0 && (
            <p className="text-sm text-white/30 text-center py-8">No resumes uploaded yet.</p>
          )}
          
          {resumes?.map((resume) => {
            const isEditing = editingId === resume.id;
            return (
              <div 
                key={resume.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                  resume.is_active 
                    ? "bg-white/[0.04] border-white/20" 
                    : "bg-white/[0.01] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => !isEditing && handleSetDefault(resume.id)}
                    className={`flex-shrink-0 focus:outline-none group ${isEditing ? "opacity-30 cursor-not-allowed" : ""}`}
                    disabled={isEditing}
                    title={resume.is_active ? "Current Active Resume" : "Set as Active"}
                  >
                    {resume.is_active ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-white/20 group-hover:text-white/40" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2 max-w-md">
                        <Input
                          placeholder="Resume Title"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="bg-black/50 border-white/10 h-8 text-sm"
                        />
                        <Input
                          placeholder="Download Filename (e.g. Abhishek_Resume.pdf)"
                          value={editFilename}
                          onChange={(e) => setEditFilename(e.target.value)}
                          className="bg-black/50 border-white/10 h-8 text-sm font-mono"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-white">{resume.title}</h3>
                          {resume.is_active && (
                            <span className="text-[10px] uppercase tracking-wider font-mono text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-white/30">
                          <a 
                            href={resume.file_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            View PDF
                          </a>
                          <span>•</span>
                          <span className="font-mono text-white/40">
                            Download as: {resume.download_filename || "Resume.pdf"}
                          </span>
                          <span>•</span>
                          <span>
                            Added {new Date(resume.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {isEditing ? (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={async () => {
                          if (!editTitle.trim()) {
                            toast.error("Title cannot be empty");
                            return;
                          }
                          try {
                            await updateResume.mutateAsync({
                              id: resume.id,
                              title: editTitle,
                              download_filename: editFilename.trim() || "Resume.pdf",
                            });
                            toast.success("Resume updated");
                            setEditingId(null);
                          } catch (err: any) {
                            toast.error(err.message || "Failed to update");
                          }
                        }}
                        className="text-green-400 hover:bg-green-400/10 h-8 w-8"
                        disabled={updateResume.isPending}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingId(null)}
                        className="text-white/30 hover:text-white h-8 w-8"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingId(resume.id);
                          setEditTitle(resume.title);
                          setEditFilename(resume.download_filename || "Resume.pdf");
                        }}
                        className="text-white/30 hover:text-white hover:bg-white/5 h-8 w-8"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(resume)}
                        className="text-white/30 hover:text-red-400 hover:bg-red-400/10 h-8 w-8"
                        disabled={deleteResume.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
