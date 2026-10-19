import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import LocalTime from "@/components/LocalTime";
import Magnetic from "@/components/Magnetic";
import { copyEmail } from "@/components/CommandMenu";
import { EMAIL, SOCIALS } from "@/lib/site";

const TOPICS = ["a full-time role", "a freelance project", "a collaboration", "just saying hi"];

type Status = "idle" | "sending" | "sent";

/** An input that sits inline in a sentence; an invisible twin of its text sizes it exactly. */
const BlankField = ({
  value,
  onChange,
  placeholder,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & { value: string; onChange: (v: string) => void }) => (
  <span className="relative inline-block max-w-full align-baseline font-serif italic">
    <span aria-hidden className="invisible whitespace-pre px-0.5">
      {value || placeholder}
    </span>
    <input
      {...props}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="absolute inset-0 w-full border-b border-white/20 bg-transparent px-0.5 text-[#f0eadd] outline-none transition-colors placeholder:text-white/20 focus:border-[#f0eadd]"
    />
  </span>
);

const Contact = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const params = {
      name,
      email,
      company,
      topic,
      message: [`Topic: ${topic}`, company && `Company: ${company}`, details].filter(Boolean).join("\n\n"),
    };
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        params,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
        params,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setName("");
      setCompany("");
      setEmail("");
      setDetails("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("idle");
      toast.error("That didn't go through. Try again, or email me directly.");
    }
  };

  const onCopy = async () => {
    await copyEmail();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#040404] px-5 pb-24 pt-24 sm:px-8 md:pb-32 md:pt-36">
      {/* Warm ember glow anchoring the final section */}
      <div className="pointer-events-none absolute -right-[20%] top-[8%] h-[55%] w-[70%] rounded-[100%] bg-[#B6443A]/[0.13] blur-[140px]" />

      <div className="relative">
        <SectionLabel index="06">Contact</SectionLabel>
        <h2 className="mt-8 text-[clamp(3rem,10vw,10rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-white">
          Let's build
          <br />
          something <span className="font-serif font-normal italic text-[#f0eadd]">real.</span>
        </h2>

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
          <form onSubmit={handleSubmit} className="max-w-3xl">
            <p className="text-[clamp(1.35rem,2.6vw,2.25rem)] leading-[1.75] tracking-[-0.02em] text-white/45">
              Hi Abhishek, I'm{" "}
              <BlankField name="name" required value={name} onChange={setName} placeholder="your name" autoComplete="name" aria-label="Your name" />{" "}
              from{" "}
              <BlankField name="company" value={company} onChange={setCompany} placeholder="company" autoComplete="organization" aria-label="Company (optional)" />. I'd like to talk about{" "}
              <span role="radiogroup" aria-label="Topic" className="inline">
                {TOPICS.map((t, i) => (
                  <span key={t}>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={topic === t}
                      onClick={() => setTopic(t)}
                      className={`rounded-md transition-colors ${
                        topic === t ? "bg-[#f0eadd] px-1.5 font-serif italic text-black" : "text-white/30 hover:text-white/70"
                      }`}
                    >
                      {t}
                    </button>
                    {i < TOPICS.length - 2 ? ", " : i === TOPICS.length - 2 ? " or " : ""}
                  </span>
                ))}
              </span>
              . You can reach me at{" "}
              <BlankField
                type="email"
                name="email"
                required
                value={email}
                onChange={setEmail}
                placeholder="you@company.com"
                autoComplete="email"
                aria-label="Your email"
              />
              .
            </p>

            <label className="mt-10 block">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">Anything else? (optional)</span>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Links, the role, the problem you're solving…"
                className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-[15px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/30"
              />
            </label>

            <div className="mt-8">
              <Magnetic strength={0.25}>
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="group relative flex h-14 items-center gap-3 overflow-hidden rounded-full bg-[#f0eadd] pl-6 pr-2 text-[15px] font-semibold text-black transition-colors hover:bg-white disabled:cursor-default"
                >
                  <span className="relative h-5 overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={status}
                        initial={{ y: 24 }}
                        animate={{ y: 0 }}
                        exit={{ y: -24 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="block leading-5"
                      >
                        {status === "idle" ? "Send message" : status === "sending" ? "Sending…" : "Sent. Talk soon."}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-[#f0eadd]">
                    {status === "sent" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className={`h-4 w-4 transition-transform duration-500 ${status === "sending" ? "animate-spin" : "group-hover:rotate-45"}`} />
                    )}
                  </span>
                </button>
              </Magnetic>
            </div>
          </form>

          <aside className="flex flex-col gap-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">Or skip the form</p>
              <button
                onClick={onCopy}
                className="group mt-3 flex w-full items-center justify-between gap-4 border-b border-white/15 pb-3 text-left transition-colors hover:border-white/50"
              >
                <span className="truncate text-lg font-medium tracking-tight text-white sm:text-xl">{EMAIL}</span>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40 group-hover:text-white">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">Local time</p>
              <p className="mt-3 text-white/70">
                It's <LocalTime seconds={false} className="text-white" /> in Mumbai. I usually reply within a day.
              </p>
            </div>

            <ul>
              {SOCIALS.filter((s) => s.name !== "Email").map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-white/[0.07] py-3.5 text-white/60 transition-colors hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <social.icon className="h-4 w-4" />
                      {social.name}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[11px] text-white/30 group-hover:text-white/60">
                      {social.handle}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
