import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { X, ArrowRight, MessageSquareCode } from "lucide-react";

export const ContactPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user already dismissed or interacted with the popup in this session
    const hasSeenPopup = sessionStorage.getItem("has_seen_contact_popup");
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // 1 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("has_seen_contact_popup", "true");
  };

  const handleTalk = () => {
    handleClose();
    if (location.pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      // Wait for navigation and then scroll to contact
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-8 pointer-events-none">
          {/* Subtle backdrop overlay for focus on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto sm:hidden"
          />

          {/* Modal / Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-[#0c0c0c]/95 border border-white/15 rounded-3xl p-6 md:p-7 shadow-2xl shadow-black/80 backdrop-blur-xl pointer-events-auto overflow-hidden group"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#B6443A]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#B6443A]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Indicator */}
            <div className="flex items-center gap-2 mb-3">
              <MessageSquareCode className="w-4 h-4 text-[#B6443A]" />
              <span className="font-mono text-xs tracking-wider uppercase text-white/50">
                Open for Roles
              </span>
            </div>

            {/* Content */}
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white mb-2.5">
              Hiring for your engineering team?
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6 font-light">
              I'm actively seeking full-time software engineering roles where I can drive system design, performance, and product scale. Let's connect!
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <motion.button
                onClick={handleTalk}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-[#B6443A] hover:bg-[#c94f44] text-white font-medium text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-red-950/30 transition-all duration-300 group"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <button
                onClick={handleClose}
                className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40 hover:text-white/80 transition-colors text-center"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;
