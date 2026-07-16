import { useState } from "react";
import ProjectsAdmin from "./arena/ProjectsAdmin";
import ExperienceAdmin from "./arena/ExperienceAdmin";
import ResumesAdmin from "./arena/ResumesAdmin";
import { Lock, Briefcase, FolderOpen, LogOut, FileText } from "lucide-react";

const ARENA_KEY = import.meta.env.VITE_ARENA_KEY || "arena";

type Tab = "projects" | "experience" | "resumes";

export default function Arena() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("arena_authed") === "1");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ARENA_KEY) {
      sessionStorage.setItem("arena_authed", "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect key. Try again.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("arena_authed");
    setAuthed(false);
    setPassword("");
  };

  // ── Password Gate ──────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#040404] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-[#B6443A] rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white tracking-tight">Arena</div>
              <div className="text-xs text-white/30">Admin Dashboard</div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 tracking-wider uppercase font-mono">Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your arena key…"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-[#B6443A]/60 focus:bg-white/[0.07] transition-all text-sm"
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#B6443A] hover:bg-[#c94f44] text-white text-sm font-medium transition-colors"
            >
              Enter Arena
            </button>
          </form>

          <p className="text-center text-xs text-white/20 mt-8">
            Set <code className="font-mono text-white/30">VITE_ARENA_KEY</code> in your .env file
          </p>
        </div>
      </div>
    );
  }

  // ── Admin Shell ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#040404]/95 backdrop-blur-sm border-b border-white/[0.06] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#B6443A] rounded-md flex items-center justify-center">
            <Lock className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">Arena</span>
          <span className="hidden sm:block text-xs text-white/30 ml-1">— Portfolio Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" className="text-xs text-white/30 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
            View Site ↗
          </a>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Content Manager</h1>
          <p className="text-sm text-white/40 mt-1">Manage your portfolio projects and work experience.</p>
        </div>

        {/* Tabs */}
        <nav className="flex gap-2 mb-8 border-b border-white/[0.06] pb-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "projects" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            <FolderOpen className="w-4 h-4" /> Projects
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "experience" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            <Briefcase className="w-4 h-4" /> Experience
          </button>
          <button
            onClick={() => setActiveTab("resumes")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "resumes" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4" /> Resumes
          </button>
        </nav>

        {/* Tab Content */}
        <div>
          {activeTab === "projects" && <ProjectsAdmin />}
          {activeTab === "experience" && <ExperienceAdmin />}
          {activeTab === "resumes" && <ResumesAdmin />}
        </div>
      </div>
    </div>
  );
}
