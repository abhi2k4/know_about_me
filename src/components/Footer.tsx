import { Heart } from "lucide-react";
import Logo from "./Logo";
import { LikeButton } from "./LikeButton";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showConfetti, setShowConfetti] = useState(false);
  const [heartsArray, setHeartsArray] = useState([]);
  const likeCountRef = useRef(0);
  const footerRef = useRef(null);

  // Add global styles on component mount
  useEffect(() => {
    // Create style element
    const styleEl = document.createElement("style");
    styleEl.setAttribute("id", "footer-animations");
    
    // Define animations
    const animationStyles = `
      @keyframes float-up {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(0, -100vh) scale(0); opacity: 0; }
      }
      
      @keyframes confetti {
        0% { transform: translateY(0) rotate(0); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
      
      @keyframes bounce-in {
        0% { transform: translate(-50%, -20px); opacity: 0; }
        50% { transform: translate(-50%, 10px); opacity: 1; }
        75% { transform: translate(-50%, -5px); opacity: 1; }
        100% { transform: translate(-50%, 0); opacity: 1; }
      }
      
      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(1); }
        75% { transform: scale(1.2); }
      }
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }

      @keyframes glow {
        0% { box-shadow: 0 0 5px var(--primary-rgb); }
        50% { box-shadow: 0 0 20px var(--primary-rgb); }
        100% { box-shadow: 0 0 5px var(--primary-rgb); }
      }

      .hover-float:hover {
        animation: float 2s ease infinite;
      }

      .hover-glow:hover {
        animation: glow 2s ease infinite;
      }

      .scale-up {
        transition: transform 0.3s ease;
      }

      .scale-up:hover {
        transform: scale(1.05);
      }

      .animate-heartbeat {
        animation: heartbeat 1s ease infinite;
      }
      
      .animate-bounce-in {
        animation: bounce-in 0.8s ease forwards;
      }
      
      .animate-confetti {
        animation: confetti 3s linear forwards;
      }
    `;
    
    styleEl.textContent = animationStyles;
    document.head.appendChild(styleEl);
    
    // Cleanup on unmount
    return () => {
      const existingStyle = document.getElementById("footer-animations");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Handle like button click
  const handleLikeClick = () => {
    likeCountRef.current += 1;
    
    // Trigger confetti every 5 likes
    if (likeCountRef.current % 5 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      // Otherwise create floating hearts
      createFloatingHeart();
    }
  };

  // Create a floating heart that rises from the like button
  const createFloatingHeart = () => {
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 20 - 10, // Random horizontal offset
      scale: 0.5 + Math.random() * 1, // Random size
      opacity: 0.7 + Math.random() * 0.3, // Random opacity
    };
    
    setHeartsArray(prev => [...prev, newHeart]);
    
    // Remove heart after animation
    setTimeout(() => {
      setHeartsArray(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/6 py-12" style={{ backgroundColor: "#080808" }} ref={footerRef}>
      {/* No gradient - flat bg */}

      
      {/* Full page confetti effect */}
      {showConfetti && createPortal(
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 100 }).map((_, i) => (
              <div 
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-5%',
                  width: `${5 + Math.random() * 10}px`,
                  height: `${5 + Math.random() * 10}px`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '3px',
                  background: `hsl(${Math.random() * 360}, 90%, 70%)`,
                  animation: `confetti ${2 + Math.random() * 3}s linear forwards`,
                  animationDelay: `${Math.random() * 1}s`,
                }}
              />
            ))}
          </div>
          
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-primary/20 to-secondary/30 p-6 rounded-xl backdrop-blur-sm text-center animate-bounce-in">
            <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
            <p>Your support means the world to me!</p>
          </div>
        </div>,
        document.body
      )}
      
      {/* Floating hearts animation */}
      {heartsArray.map(heart => (
        <div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            bottom: '50%',
            transform: `translateX(${heart.x}px) scale(${heart.scale})`,
            opacity: heart.opacity,
            animation: 'float-up 2s ease-out forwards'
          }}
        >
          <span className="text-xl">❤️</span>
        </div>
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content - Simplified */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand Section */}
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={scrollToTop}
          >
            <div className="relative transition-all duration-300 hover:scale-110">
              <Logo />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground font-audiowide">
                abhi codes
              </span>
              <span className="text-xs text-muted-foreground">
                Full Stack Dev
              </span>
            </div>
          </div>

          {/* Like Button */}
          <div 
            onClick={handleLikeClick}
            className="relative group"
          >
            <LikeButton 
              data-cursor-text="Show Some Love!" 
            />
          </div>

          {/* Right Section - Credit */}
          <div className="text-center md:text-right flex flex-col gap-2">
            <p className="flex items-center justify-center md:justify-end gap-2 text-xs text-muted-foreground group">
              <span>Built with</span>
              <Heart 
                size={14} 
                className="text-primary fill-primary"
              />
            </p>
            <p className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              © {currentYear} Abhishek Thormothe
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
