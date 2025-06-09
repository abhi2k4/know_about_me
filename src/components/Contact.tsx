import { useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send contact message to you
      const contactResult = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        form.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Send auto-reply to the user
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
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>

      <div
        className={`container mx-auto px-4 transition-all duration-700 ${
          isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="section-subtitle">Get In Touch</h2>
          <h3 className="section-title">Contact Me</h3>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Have a project in mind or just want to chat? Feel free to reach out.
            I'm always open to discussing new opportunities and ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h4 className="text-2xl font-bold mb-6">Let's Talk</h4>
            <p className="text-muted-foreground mb-8">
              Whether you have a question, want to start a project, or simply want to connect, feel free to reach out. I'm here to help!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500/10 text-blue-500 mr-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-medium">Email</h5>
                  <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  thormothe.abhishek@gmail.com
                  </a>
                </div>
              </div>
{/*               
              <div className="flex items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500/10 text-blue-500 mr-4">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-medium">Phone</h5>
                  <a href="tel:+918369098056" className="text-muted-foreground hover:text-foreground transition-colors">
                    +91 83690 98056
                  </a>
                </div>
              </div> */}
              
              <div className="flex items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500/10 text-blue-500 mr-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-medium">Location</h5>
                  <p className="text-muted-foreground">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h5 className="font-medium mb-4">Connect With Me</h5>
              <div className="flex gap-4">
                <a
                  href="https://github.com/abhi2k4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/thormotheabhishek" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/amt_official04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="X (Twitter)">
                    <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
                  </a>
                <a
                  href="mailto:thormothe.abhishek@gmail.com"
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <form ref={form} onSubmit={handleSubmit} className="bg-card rounded-xl p-8">
              <h4 className="text-2xl font-bold mb-6">Send a Message</h4>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-base"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-base"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none font-mono text-base"
                  required
                ></textarea>
              </div>
              
              <Button type="submit" data-cursor="button" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
