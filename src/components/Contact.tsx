import { useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { IconMail, IconMapPin, IconPhone, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";

const Contact = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const contactMethods = [
    {
      icon: IconMail,
      title: "Email",
      value: "thormothe.abhishek@gmail.com",
      href: "mailto:thormothe.abhishek@gmail.com",
    },
    {
      icon: IconMapPin,
      title: "Location",
      value: "Mumbai, Maharashtra, India",
      href: "#",
    },
    {
      icon: IconPhone,
      title: "Phone",
      value: "Available for opportunities",
      href: "tel:+919876543210",
    }
  ];

  const socialLinks = [
    { name: "GitHub", icon: IconBrandGithub, url: "https://github.com/abhi2k4" },
    { name: "LinkedIn", icon: IconBrandLinkedin, url: "https://linkedin.com/in/thormotheabhishek" },
    { name: "Twitter", icon: IconBrandTwitter, url: "https://x.com/amt_official04" },
    { name: "Email", icon: IconMail, url: "mailto:thormothe.abhishek@gmail.com" }
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
      className="relative py-24 md:py-32 overflow-hidden bg-background"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.02] bg-grid-pattern"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
      </div>

      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <div className="px-4 py-2">
              <p className="section-subtitle">Get In Touch</p>
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's Work Together
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind? Reach out and let's create something amazing together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Cards */}
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={index}
                href={method.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="max-w-[500px] w-full cursor-pointer
                  group relative bg-background rounded-lg overflow-hidden
                  shadow-[0_2px_10px_0px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_20px_40px_0px_rgba(0,0,0,0.15)]
                  dark:shadow-[0_2px_8px_0px_rgba(200,200,200,0.1)]
                  dark:hover:shadow-[0_20px_40px_0px_rgba(200,200,200,0.2)]
                  transition-all duration-500 ease-out transform p-6"
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-primary/10 p-2 mb-4 text-primary"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={32} stroke={2} />
                </motion.div>

                <h3 className="text-lg font-bold text-foreground mb-2">{method.title}</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{method.value}</p>
              </motion.a>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isSectionVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-background rounded-lg overflow-hidden
              shadow-[0_2px_10px_0px_rgba(0,0,0,0.05)]
              hover:shadow-[0_20px_40px_0px_rgba(0,0,0,0.15)]
              dark:shadow-[0_2px_8px_0px_rgba(200,200,200,0.1)]
              dark:hover:shadow-[0_20px_40px_0px_rgba(200,200,200,0.2)]
              p-6 h-full transition-all duration-500">
              <h3 className="text-2xl font-bold text-foreground mb-6">Connect</h3>
              <p className="text-muted-foreground mb-8">
                Reach out for collaboration or just to say hello.
              </p>

              <div className="space-y-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-primary/10 transition-all duration-300 group"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={20} stroke={2} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium text-foreground">{social.name}</span>
                      <motion.div
                        className="ml-auto text-muted-foreground group-hover:text-primary transition-colors"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                      >
                        →
                      </motion.div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isSectionVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <motion.form
              ref={form}
              onSubmit={handleSubmit}
              className="relative bg-background rounded-lg overflow-hidden
                shadow-[0_2px_10px_0px_rgba(0,0,0,0.05)]
                hover:shadow-[0_20px_40px_0px_rgba(0,0,0,0.15)]
                dark:shadow-[0_2px_8px_0px_rgba(200,200,200,0.1)]
                dark:hover:shadow-[0_20px_40px_0px_rgba(200,200,200,0.2)]
                transition-all duration-500 p-6"
            >
              <h3 className="text-2xl font-bold text-foreground mb-8">Send a Message</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <motion.input
                    type="text"
                    id="user_name"
                    name="name"
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-lg bg-secondary text-foreground placeholder-muted-foreground focus:outline-none transition-all ${
                      focusedField === 'name'
                        ? 'ring-2 ring-primary/20 shadow-lg shadow-primary/20'
                        : 'hover:bg-secondary/80'
                    }`}
                    required
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <motion.input
                    type="email"
                    id="user_email"
                    name="email"
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-lg bg-secondary text-foreground placeholder-muted-foreground focus:outline-none transition-all ${
                      focusedField === 'email'
                        ? 'ring-2 ring-primary/20 shadow-lg shadow-primary/20'
                        : 'hover:bg-secondary/80'
                    }`}
                    required
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">
                    Message <span className="text-primary">*</span>
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg bg-secondary text-foreground placeholder-muted-foreground focus:outline-none transition-all resize-none ${
                      focusedField === 'message'
                        ? 'ring-2 ring-primary/20 shadow-lg shadow-primary/20'
                        : 'hover:bg-secondary/80'
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
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    data-cursor="button"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.div>
                      </span>
                    )}
                  </Button>
                </motion.div>

                <p className="text-xs text-gray-500 text-center pt-2">
                  I'll get back to you within 24 hours.
                </p>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
