import { Code, Heart, ChevronUp, Sparkles } from "lucide-react";
import Logo from "./Logo";
import { LikeButton } from "./LikeButton";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
    <footer className="relative border-t py-12 bg-gradient-to-b from-secondary/5 to-secondary/20" ref={footerRef}>
      {/* Hidden audio for surprise effect */}
      <audio id="like-sound" src="/sounds/sparkle.mp3" preload="auto" />
      
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

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Enhanced Logo Section */}
          <div 
            className="flex items-center gap-3 mb-6 md:mb-0 group cursor-pointer relative"
            onClick={scrollToTop}
          >
            <div className="relative transition-all duration-500 ease-out hover:scale-110">
              <div className="absolute inset-0 bg-primary/20 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"></div>
              <div className="relative z-10">
                <Logo />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl font-audiowide bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                abhi codes
              </span>
              <span className="text-xs text-muted-foreground/80">
                Full Stack Developer
              </span>
            </div>
          </div>

          {/* Enhanced Like Button Section */}
          <div className="flex flex-col items-center gap-4 mb-6 md:mb-0">
            <div 
              onClick={handleLikeClick}
              className="relative group"
            >
              <div className="absolute   rounded-full filter blur-md opacity-0 group-hover:opacity-100 scale-150 transition-all duration-300"></div>
              <LikeButton 
                data-cursor-text="Show Some Love!" 
              />
            </div>
          </div>

          {/* Enhanced Footer Text Section */}
          <div className="text-sm text-muted-foreground text-center md:text-right flex flex-col gap-2">
            <p className="flex items-center gap-2 group">
              <span>Designed and built with</span>
              <span className="inline-flex items-center gap-1">
                <Heart 
                  size={16} 
                  className="text-red-500 group-hover:animate-heartbeat fill-red-500"
                />
                <Sparkles 
                  size={16} 
                  className="text-yellow-500 group-hover:animate-pulse"
                />
              </span>
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-xs opacity-70 hover:opacity-100 transition-opacity duration-300">
                © {currentYear} Abhishek Thormothe
              </p>
              <button 
                onClick={scrollToTop}
                className="text-xs text-primary/70 hover:text-primary flex items-center gap-1 justify-end group transition-colors duration-300"
              >
                Back to top
                <ChevronUp 
                  size={14} 
                  className="group-hover:-translate-y-1 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute -top-24 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-12 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-2xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
