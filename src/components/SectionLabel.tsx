const SectionLabel = ({ index, children }: { index: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
    <span className="text-[#B6443A]">({index})</span>
    <span>{children}</span>
    <span className="h-px w-10 bg-white/15" />
  </div>
);

export default SectionLabel;
