import { useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const Contact = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

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

        toast.success("Message sent successfully! Check your email for confirmation.");
        if (form.current) {
          form.current.reset();
        }
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Subtle background effect */}
      <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true" />

      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h2>
          <motion.h3
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Contact Me
          </motion.h3>
          <motion.p
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind or just want to chat? Feel free to reach out.
            I'm always open to discussing new opportunities and ideas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isSectionVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-2xl font-bold mb-6">Let's Talk</h4>
            <p className="text-muted-foreground mb-8">
              Whether you have a question, want to start a project, or simply want to connect, feel free to reach out. I'm here to help!
            </p>

            <div className="space-y-6">
              <motion.div
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500/10 text-blue-500 mr-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="h-5 w-5" />
                </motion.div>
                <div>
                  <h5 className="font-medium">Email</h5>
                  <a href="mailto:thormothe.abhishek@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    thormothe.abhishek@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500/10 text-blue-500 mr-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="h-5 w-5" />
                </motion.div>
                <div>
                  <h5 className="font-medium">Location</h5>
                  <p className="text-muted-foreground">Mumbai, Maharashtra, India</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10"
            >
              <h5 className="font-medium mb-4">Connect With Me</h5>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/abhi2k4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="GitHub"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/thormotheabhishek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="LinkedIn"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://x.com/amt_official04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="X (Twitter)"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:thormothe.abhishek@gmail.com"
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Email"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isSectionVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.form
              ref={form}
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-8 relative overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 0 40px rgba(var(--primary), 0.1)',
                }}
              />

              <h4 className="text-2xl font-bold mb-6 relative">Send a Message</h4>

              <div className="mb-4 space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <motion.input
                  type="text"
                  id="user_name"
                  name="name"
                  className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none transition-all font-mono text-base ${
                    focusedField === 'name'
                      ? 'border-primary ring-2 ring-primary/20 shadow-lg'
                      : 'border-input'
                  }`}
                  required
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <div className="mb-4 space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="user_email"
                  name="email"
                  className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none transition-all font-mono text-base ${
                    focusedField === 'email'
                      ? 'border-primary ring-2 ring-primary/20 shadow-lg'
                      : 'border-input'
                  }`}
                  required
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <div className="mb-6 space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none transition-all resize-none font-mono text-base ${
                    focusedField === 'message'
                      ? 'border-primary ring-2 ring-primary/20 shadow-lg'
                      : 'border-input'
                  }`}
                  required
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="submit"
                  data-cursor="button"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
