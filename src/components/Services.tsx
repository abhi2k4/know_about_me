import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";

const ease = [0.16, 1, 0.3, 1] as const;

const capabilities = [
  {
    title: "Full-stack architecture",
    desc: "Resilient, production-ready platforms, from the database schema to a fast React front end.",
    stack: "Postgres · Django · Node · React",
  },
  {
    title: "APIs & backend systems",
    desc: "High-throughput REST services, async worker queues and secure third-party integrations.",
    stack: "FastAPI · Redis · Queues",
  },
  {
    title: "Frontend & performance",
    desc: "Accessible interfaces with fast page loads and interactions that hold 60fps.",
    stack: "TypeScript · Next.js · Motion",
  },
  {
    title: "Cloud & delivery",
    desc: "Containerised deploys, CI/CD pipelines and infrastructure that scales without drama.",
    stack: "AWS · Docker · Actions",
  },
];

const Services = () => (
  <section id="services" className="relative w-full bg-[#040404] px-5 py-24 sm:px-8 md:py-36">
    <SectionLabel index="05">Capabilities</SectionLabel>
    <h2 className="mt-8 max-w-4xl text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
      What I bring to an <span className="font-serif font-normal italic text-[#f0eadd]">engineering team</span> on day one
    </h2>

    <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-24 xl:grid-cols-4">
      {capabilities.map((item, i) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease, delay: i * 0.08 }}
          className="group relative pt-6"
        >
          <span className="absolute inset-x-0 top-0 h-px bg-white/10" />
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease, delay: 0.2 + i * 0.08 }}
            className="absolute inset-x-0 top-0 h-px origin-left bg-[#f0eadd]/60"
          />
          <span className="font-serif text-6xl italic leading-none text-white/15 transition-colors duration-500 group-hover:text-[#B6443A]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/55">{item.desc}</p>
          <p className="mt-5 font-mono text-[11px] text-white/35">{item.stack}</p>
        </motion.article>
      ))}
    </div>
  </section>
);

export default Services;
