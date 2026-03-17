import { useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { IconMail, IconMapPin, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconSend } from "@tabler/icons-react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { motion, useScroll, useTransform } from "framer-motion";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: animRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const socialLinks = [
    { name: "GitHub", icon: IconBrandGithub, url: "https://github.com/abhi2k4" },
    { name: "LinkedIn", icon: IconBrandLinkedin, url: "https://linkedin.com/in/thormotheabhishek" },
    { name: "Twitter / X", icon: IconBrandTwitter, url: "https://x.com/amt_official04" },
    { name: "Email", icon: IconMail, url: "mailto:thormothe.abhishek@gmail.com" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const contactResult = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        form.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      if (contactResult.text === 'OK') {
        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
          form.current!,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        toast.success("Message sent! I'll get back to you soon.");
        form.current?.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error("Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-transparent text-white/80 placeholder-white/20 border-b font-mono text-sm focus:outline-none transition-colors ${
      focusedField === field ? "border-primary" : "border-white/10"
    }`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0c0c0c" }}
    >
      {/* Parallax bg */}
      <motion.div
        className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none"
        style={{ y: bgY }}
      />

      <div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
        ref={animRef as React.RefObject<HTMLDivElement>}
      >
        {/* Header */}
        <div className={`mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-subtitle">Contact</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="section-title">
              Let's build<br />
              <span style={{ color: "hsl(var(--primary))" }}>something.</span>
            </h2>
            <p className="max-w-sm text-white/30 text-sm leading-relaxed pb-2">
              Open to freelance projects, internships, and collaborations. Drop me a message — I typically respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Main 2-col */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px border border-white/8 bg-white/8">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 bg-background p-8 md:p-10"
          >
            <span className="num-accent mb-6 block">[ 02 — REACH ]</span>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-3">
                <IconMail size={14} className="text-primary/60 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase mb-0.5">Email</p>
                  <a href="mailto:thormothe.abhishek@gmail.com" className="text-sm text-white/40 hover:text-white transition-colors no-underline">
                    thormothe.abhishek@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IconMapPin size={14} className="text-primary/60 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase mb-0.5">Location</p>
                  <p className="text-sm text-white/40">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase mb-4">Find me on</p>
              <div className="flex flex-col gap-2">
                {socialLinks.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 py-2.5 border-b border-white/5 text-white/30 hover:text-white transition-colors group no-underline"
                    >
                      <Icon size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                      <span className="text-xs font-mono">{s.name}</span>
                      <span className="ml-auto text-white/10 group-hover:text-white/30 text-xs">→</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            ref={form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 bg-background p-8 md:p-10"
          >
            <span className="num-accent mb-6 block">[ 03 — MESSAGE ]</span>

            <div className="space-y-8">
              <div>
                <label htmlFor="user_name" className="font-mono text-[10px] tracking-[0.15em] text-white/25 uppercase block mb-3">Your Name</label>
                <input
                  type="text"
                  id="user_name"
                  name="name"
                  placeholder="John Doe"
                  className={inputClass("name")}
                  required
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div>
                <label htmlFor="user_email" className="font-mono text-[10px] tracking-[0.15em] text-white/25 uppercase block mb-3">Email Address</label>
                <input
                  type="email"
                  id="user_email"
                  name="email"
                  placeholder="your@email.com"
                  className={inputClass("email")}
                  required
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div>
                <label htmlFor="message" className="font-mono text-[10px] tracking-[0.15em] text-white/25 uppercase block mb-3">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={`${inputClass("message")} resize-none`}
                  required
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full rounded-none bg-primary hover:bg-primary/90 text-white font-mono text-xs uppercase tracking-[0.2em] py-6 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <IconSend size={14} />
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="font-mono text-[10px] text-white/15 text-center tracking-widest">
                I'll respond within 24 hours.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
