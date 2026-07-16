import { useActiveResume } from "@/hooks/useResumes";
import { Loader2, FileText, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

export default function ResumePage() {
  const { activeResume, isLoading } = useActiveResume();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#040404] flex flex-col items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#B6443A]/20 blur-xl animate-pulse" />
            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center relative z-10">
              <FileText className="w-6 h-6 text-white/60 animate-bounce" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/40 font-mono tracking-wider">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>FETCHING ACTIVE RESUME...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!activeResume?.file_url) {
    return (
      <div className="min-h-screen bg-[#040404] flex flex-col items-center justify-center text-white font-sans p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
          <FileText className="w-6 h-6 text-red-400" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-white mb-2">No Active Resume Found</h1>
        <p className="text-sm text-white/40 max-w-sm leading-relaxed">
          Please upload and activate a resume in the Content Manager (/arena).
        </p>
        <Link 
          to="/"
          className="mt-8 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono tracking-widest text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all uppercase no-underline"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040404] flex flex-col text-white overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-sm px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-sm font-medium text-white/80">Resume</span>
        </div>
        
        {/* <a
          href={activeResume.file_url}
          download={activeResume.download_filename || "Resume.pdf"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-medium transition-colors no-underline"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </a> */}
      </header>

      {/* Embedded PDF container */}
      <div className="flex-1 w-full h-[calc(100vh-64px)] relative bg-[#121212] pb-16">
        <iframe
          src={`${activeResume.file_url}#toolbar=1`}
          className="w-full h-full border-0 absolute inset-0"
          title={activeResume.title}
        />
      </div>

      {/* <Header /> */}
    </div>
  );
}
