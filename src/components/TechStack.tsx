import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";

type Category = "backend" | "frontend" | "data" | "cloud" | "ai";

interface TechSkill {
  name: string;
  key: string;
  category: Category;
  icon: string;
  description: string;
  // Single-colour logos that need re-tinting to stay visible on a keycap.
  mono?: boolean;
}

const techSkills: TechSkill[] = [
  { name: "Python", key: "P", category: "backend", icon: "https://cdn.simpleicons.org/python", description: "Core language" },
  { name: "Django", key: "D", category: "backend", icon: "https://cdn.simpleicons.org/django/44B78B", description: "Web framework" },
  { name: "FastAPI", key: "F", category: "backend", icon: "https://cdn.simpleicons.org/fastapi/009688", description: "Async APIs" },
  { name: "Node.js", key: "N", category: "backend", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E", description: "Runtime" },
  { name: "Flask", key: "L", category: "backend", icon: "https://cdn.simpleicons.org/flask/ffffff", description: "Micro-framework", mono: true },

  { name: "React", key: "R", category: "frontend", icon: "https://cdn.simpleicons.org/react/61DAFB", description: "UI library" },
  { name: "TypeScript", key: "T", category: "frontend", icon: "https://cdn.simpleicons.org/typescript/3178C6", description: "Typed JavaScript" },
  { name: "Next.js", key: "X", category: "frontend", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff", description: "React framework", mono: true },
  { name: "JavaScript", key: "J", category: "frontend", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", description: "Language" },
  { name: "Tailwind", key: "W", category: "frontend", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", description: "Styling" },
  { name: "React Native", key: "V", category: "frontend", icon: "https://cdn.simpleicons.org/react/61DAFB", description: "Mobile apps" },
  { name: "Figma", key: "I", category: "frontend", icon: "https://cdn.simpleicons.org/figma/F24E1E", description: "UI/UX design" },

  { name: "PostgreSQL", key: "Q", category: "data", icon: "https://cdn.simpleicons.org/postgresql/4169E1", description: "Relational DB" },
  { name: "MongoDB", key: "M", category: "data", icon: "https://cdn.simpleicons.org/mongodb/47A248", description: "Document DB" },
  { name: "MySQL", key: "Y", category: "data", icon: "https://cdn.simpleicons.org/mysql/4479A1", description: "SQL engine" },
  { name: "Supabase", key: "S", category: "data", icon: "https://cdn.simpleicons.org/supabase/3FCF8E", description: "BaaS & Postgres" },
  { name: "Redis", key: "E", category: "data", icon: "https://cdn.simpleicons.org/redis/DC382D", description: "In-memory cache" },

  { name: "AWS", key: "A", category: "cloud", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg", description: "Cloud infra", mono: true },
  { name: "Docker", key: "C", category: "cloud", icon: "https://cdn.simpleicons.org/docker/2496ED", description: "Containers" },
  { name: "GitHub Actions", key: "H", category: "cloud", icon: "https://cdn.simpleicons.org/githubactions/2088FF", description: "CI/CD pipelines" },
  { name: "Git", key: "G", category: "cloud", icon: "https://cdn.simpleicons.org/git/F05032", description: "Version control" },

  { name: "Gemini", key: "U", category: "ai", icon: "https://cdn.simpleicons.org/googlegemini/8E75B2", description: "LLMs & multimodal" },
];

const rows: { category: Category; label: string; glyph: string }[] = [
  { category: "backend", label: "Backend", glyph: "⇥" },
  { category: "frontend", label: "Frontend", glyph: "⇪" },
  { category: "data", label: "Data", glyph: "⌥" },
  { category: "cloud", label: "Cloud", glyph: "⇧" },
  { category: "ai", label: "AI", glyph: "⌘" },
];

type Readout =
  | { kind: "idle" }
  | { kind: "tool"; tech: TechSkill }
  | { kind: "group"; category: Category; label: string };

let audioCtx: AudioContext | null = null;

/** A short filtered noise burst — sounds like a mechanical switch bottoming out. */
const playClick = () => {
  try {
    audioCtx ??= new AudioContext();
    const ctx = audioCtx;
    const length = Math.floor(ctx.sampleRate * 0.035);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 5);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800 + Math.random() * 900;
    filter.Q.value = 0.9;
    const gain = ctx.createGain();
    gain.gain.value = 0.6;
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  } catch {
    /* Audio is a nicety; ignore unsupported environments. */
  }
};

const Keycap = ({
  tech,
  pressed,
  lit,
  onPress,
  onRelease,
  onHover,
}: {
  tech: TechSkill;
  pressed: boolean;
  lit: boolean;
  onPress: () => void;
  onRelease: () => void;
  onHover: () => void;
}) => (
  <button
    type="button"
    data-pressed={pressed}
    data-lit={lit}
    onPointerDown={onPress}
    onPointerUp={onRelease}
    onPointerLeave={onRelease}
    onPointerEnter={(e) => e.pointerType === "mouse" && onHover()}
    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPress()}
    onKeyUp={onRelease}
    aria-label={`${tech.name}: ${tech.description}. Shortcut ${tech.key}`}
    className="keycap flex h-[var(--u)] min-w-0 flex-col justify-between p-2 text-left sm:min-w-[var(--u)] sm:flex-1 sm:p-2.5"
  >
    <span className="flex w-full items-start justify-between">
      <img
        src={tech.icon}
        alt=""
        loading="lazy"
        className={`h-4 w-4 object-contain sm:h-5 sm:w-5 ${tech.mono ? "brightness-0 invert" : ""}`}
        onError={(e) => ((e.target as HTMLImageElement).style.visibility = "hidden")}
      />
      <span className="font-mono text-[10px] leading-none text-white/35">{tech.key}</span>
    </span>
    <span className="line-clamp-2 break-words text-[9.5px] font-medium leading-[1.15] tracking-tight sm:text-[11px]">{tech.name}</span>
  </button>
);

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [pressed, setPressed] = useState<string | null>(null);
  const [litGroup, setLitGroup] = useState<Category | null>(null);
  const [readout, setReadout] = useState<Readout>({ kind: "idle" });
  const [sound, setSound] = useState(false);
  const [presses, setPresses] = useState(0);
  const litTimer = useRef<ReturnType<typeof setTimeout>>();

  const pressTool = useCallback(
    (tech: TechSkill) => {
      setPressed(tech.name);
      setReadout({ kind: "tool", tech });
      setPresses((n) => n + 1);
      if (sound) playClick();
    },
    [sound]
  );

  const pressGroup = (row: (typeof rows)[number]) => {
    setPressed(row.category);
    setLitGroup(row.category);
    setReadout({ kind: "group", category: row.category, label: row.label });
    if (sound) playClick();
    clearTimeout(litTimer.current);
    litTimer.current = setTimeout(() => setLitGroup(null), 1400);
  };

  const shuffle = () => {
    pressTool(techSkills[Math.floor(Math.random() * techSkills.length)]);
    setPressed("shuffle");
  };

  const release = () => setPressed(null);

  // Physical keyboard: typing a letter presses the matching cap while the section is on screen.
  useEffect(() => {
    if (!inView) return;
    const isTyping = (el: EventTarget | null) =>
      el instanceof HTMLElement && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      const tech = techSkills.find((t) => t.key === e.key.toUpperCase());
      if (tech) pressTool(tech);
    };
    const onKeyUp = () => setPressed(null);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [inView, pressTool]);

  useEffect(() => () => clearTimeout(litTimer.current), []);

  const groupTools = readout.kind === "group" ? techSkills.filter((t) => t.category === readout.category) : [];

  return (
    <section id="techstack" ref={sectionRef} className="relative w-full overflow-hidden bg-[#040404] px-5 py-24 sm:px-8 md:py-36">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="04">Stack</SectionLabel>
          <h2 className="mt-8 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
            The <span className="font-serif font-normal italic text-[#f0eadd]">toolkit</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-white/50 md:text-right">
          Go ahead and type. Every key on your keyboard maps to a tool I use. On a phone, tap the caps.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 18 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1600 }}
        className="chassis mx-auto mt-14 w-full max-w-[1040px] p-3 sm:p-5 md:mt-20"
      >
        {/* Top deck: display + controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="oled relative min-h-[132px] flex-1 overflow-hidden rounded-2xl p-4 font-mono sm:p-5" aria-live="polite">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#f0eadd]/45">
              <span>toolkit.v26</span>
              <span className="tabular-nums">
                {String(presses).padStart(4, "0")} presses · {techSkills.length} tools
              </span>
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
              {readout.kind === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5">
                  <p className="text-2xl text-[#f0eadd] sm:text-3xl">
                    PRESS ANY KEY<span className="animate-blink">_</span>
                  </p>
                  <p className="mt-2 text-[11px] text-[#f0eadd]/45">Try R, P or Q. Modifiers light up a whole group.</p>
                </motion.div>
              )}
              {readout.kind === "tool" && (
                <motion.div
                  key={readout.tech.name + presses}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="mt-5 flex items-end justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#B6443A]">
                      [{readout.tech.category}] · key {readout.tech.key}
                    </p>
                    <p className="mt-1 truncate text-2xl text-[#f0eadd] sm:text-4xl">{readout.tech.name}</p>
                    <p className="mt-1 text-[11px] text-[#f0eadd]/55">{readout.tech.description}</p>
                  </div>
                  <img
                    src={readout.tech.icon}
                    alt=""
                    className={`h-12 w-12 shrink-0 object-contain opacity-90 sm:h-16 sm:w-16 ${readout.tech.mono ? "brightness-0 invert" : ""}`}
                  />
                </motion.div>
              )}
              {readout.kind === "group" && (
                <motion.div key={readout.category} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="mt-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#B6443A]">group · {groupTools.length} tools</p>
                  <p className="mt-1 text-2xl text-[#f0eadd] sm:text-4xl">{readout.label}</p>
                  <p className="mt-1 truncate text-[11px] text-[#f0eadd]/55">{groupTools.map((t) => t.name).join(" / ")}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-2xl px-2 sm:w-44 sm:flex-col sm:items-stretch sm:justify-between sm:py-1">
            <div className="speaker-grill h-10 flex-1 rounded-xl sm:h-auto sm:flex-1" aria-hidden />
            <button
              type="button"
              onClick={() => setSound((s) => !s)}
              aria-pressed={sound}
              className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50"
            >
              Sound
              <span className={`relative h-5 w-9 rounded-full transition-colors ${sound ? "bg-[#B6443A]" : "bg-white/10"}`}>
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-[#f0eadd] shadow transition-all ${sound ? "left-[18px]" : "left-0.5"}`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Key well */}
        <div className="key-well mt-3 flex flex-col gap-2 rounded-2xl p-2 [--u:62px] sm:mt-4 sm:gap-2.5 sm:p-4 sm:[--u:78px] lg:[--u:88px]">
          {rows.map((row) => {
            const tools = techSkills.filter((t) => t.category === row.category);
            // Phones lay each row on a 4-wide grid; blank caps pad the last line like a real board.
            const cells = 1 + tools.length + (row.category === "ai" ? 2 : 0);
            const blanks = (4 - (cells % 4)) % 4;
            return (
              <div key={row.category} className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
                <button
                  type="button"
                  data-pressed={pressed === row.category}
                  onPointerDown={() => pressGroup(row)}
                  onPointerUp={release}
                  onPointerLeave={release}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pressGroup(row)}
                  onKeyUp={release}
                  className="keycap keycap-paper flex h-[var(--u)] shrink-0 flex-col sm:w-[calc(var(--u)*1.6)] justify-between p-2 text-left sm:p-2.5"
                  aria-label={`Highlight ${row.label} tools`}
                >
                  <span className="text-sm leading-none text-black/50">{row.glyph}</span>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-wider">{row.label}</span>
                </button>

                {tools.map((tech) => (
                    <Keycap
                      key={tech.name}
                      tech={tech}
                      pressed={pressed === tech.name}
                      lit={litGroup === tech.category}
                      onPress={() => pressTool(tech)}
                      onRelease={release}
                      onHover={() => setReadout({ kind: "tool", tech })}
                    />
                  ))}

                {row.category === "ai" && (
                  <button
                    type="button"
                    data-pressed={pressed === "shuffle"}
                    onPointerDown={shuffle}
                    onPointerUp={release}
                    onPointerLeave={release}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && shuffle()}
                    onKeyUp={release}
                    className="keycap keycap-brick col-span-2 flex h-[var(--u)] items-end sm:min-w-[calc(var(--u)*2)] sm:flex-[3] justify-between p-2 sm:p-2.5"
                  >
                    <span className="font-mono text-[10px] font-medium uppercase tracking-wider">Shuffle</span>
                    <span className="font-mono text-[10px] text-white/60">rand()</span>
                  </button>
                )}

                {Array.from({ length: blanks }, (_, i) => (
                  <span key={i} aria-hidden className="keycap h-[var(--u)] opacity-50 sm:hidden" />
                ))}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default TechStack;
