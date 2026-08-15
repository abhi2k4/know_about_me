import { useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    `w-full px-0 py-4 bg-transparent text-foreground placeholder-muted-foreground border-b-2 text-lg focus:outline-none transition-colors rounded-none ${
      focusedField === field ? "border-primary" : "border-white/10"
    }`;

  return (
    <section
      id="contact"
      className="relative w-full bg-[#080808]"
    >
      {/* Massive Let's Connect + Form Section */}
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className="w-full px-6 py-20 sm:px-12 bg-white/[0.02] border-t border-white/5"
      >
        <div className="w-full flex flex-col xl:flex-row justify-between items-start gap-16 xl:gap-24">
          
          {/* Left: Massive Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >

            <h2 className="text-[12vw] sm:text-[10vw] xl:text-[8vw] font-medium leading-[0.9] tracking-tighter text-foreground">
              Let's Connect <br />
              There
            </h2>
            <p className="mt-8 text-muted-foreground max-w-sm">
              Open to freelance projects, internships, and collaborations. 
              Drop me a message, I typically respond within 24 hours.
            </p>
          </motion.div>

          {/* Right: Minimal Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full xl:w-[500px]"
          >
            <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="What's your name?"
                  className={inputClass("name")}
                  required
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className={inputClass("email")}
                  required
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={4}
                  className={`${inputClass("message")} resize-none`}
                  required
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-6 rounded-full bg-white text-black hover:bg-white/90 text-sm font-medium flex items-center justify-center gap-3 transition-colors"
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      Send Message <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
