import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [cursorType, setCursorType] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [cursorSize, setCursorSize] = useState(16);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [gridPoints, setGridPoints] = useState([]);
  const [hoverElement, setHoverElement] = useState(null);
  const [showRings, setShowRings] = useState(false);
  const [particles, setParticles] = useState([]);
  const [glitchMode, setGlitchMode] = useState(false);
  const [shape, setShape] = useState("circle"); // 'diamond', 'square', 'circle'
  const [cursorScale, setCursorScale] = useState(1);
  const [trailPoints, setTrailPoints] = useState([]);
  const MAX_TRAIL_POINTS = 12; // Increased for more visible trail
  const TRAIL_LIFETIME = 500; // milliseconds
  const [energyLevel, setEnergyLevel] = useState(100);
  const shapeVariants = {
    diamond: {
      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      rotation: 45,
    },
    square: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      rotation: 0,
    },
    circle: {
      clipPath: "circle(50% at 50% 50%)",
      rotation: 0,
    },
  };
  const cursorRef = useRef(null);
  const gridRef = useRef([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());
  const glitchTimerRef = useRef(null);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      * {
        cursor: none !important;
      }
      
      @media (pointer: coarse) {
        * {
          cursor: auto !important;
        }
      }
      
      .technosphere-cursor {
        pointer-events: none;
        mix-blend-mode: exclusion;
      }
      
      .cursor-grid-point {
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out;
      }
      
      .cursor-ring {
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
      }
      
      .cursor-pulse {
        animation: pulse 2s infinite;
      }
      
      @keyframes scanline {
        0% { transform: translateY(-100%); opacity: 0.3; }
        50% { opacity: 1; }
        100% { transform: translateY(100%); opacity: 0.3; }
      }
      
      @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-4px, 2px); }
        40% { transform: translate(4px, -2px); }
        60% { transform: translate(-2px, -2px); }
        80% { transform: translate(2px, 2px); }
        100% { transform: translate(0); }
      }
      
      .glitch-effect {
        animation: glitch 0.2s ease-in-out infinite;
      }
      
      @keyframes crystallize {
        0%, 100% { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
        50% { clip-path: polygon(45% 0%, 100% 45%, 55% 100%, 0% 55%); }
      }
      
      .crystal-effect {
        animation: crystallize 2s ease-in-out infinite;
      }
      
      @keyframes energyRing {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
      }
      
      .energy-ring {
        animation: energyRing 3s linear infinite;
      }
      
      .matrix-bg {
        position: absolute;
        inset: 0;
        background: 
          linear-gradient(rgba(0, 255, 170, 0.1), rgba(0, 0, 0, 0)),
          repeating-linear-gradient(transparent, transparent 2px, rgba(0, 255, 170, 0.05) 2px, rgba(0, 255, 170, 0.05) 4px);
      }

      @keyframes floatEffect {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-2px) scale(1.05); }
      }

      @keyframes energyPulse {
        0% { filter: brightness(1) blur(0px); }
        50% { filter: brightness(1.2) blur(1px); }
        100% { filter: brightness(1) blur(0px); }
      }

      @keyframes trailFade {
        0% { opacity: 0.5; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.3); }
      }

      .energy-pulse {
        animation: energyPulse 1.5s ease-in-out infinite;
      }

      .cursor-trail {
        pointer-events: none;
        mix-blend-mode: screen;
        animation: trailFade 0.5s ease-out forwards;
      }

      .float-effect {
        animation: floatEffect 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleEl);
    
    const triggerRandomGlitch = () => {
      if (Math.random() < 0.1) {
        setGlitchMode(true);
        const duration = 200 + Math.random() * 400;
        setTimeout(() => setGlitchMode(false), duration);
      }
      glitchTimerRef.current = setTimeout(triggerRandomGlitch, 3000 + Math.random() * 7000);
    };
    
    glitchTimerRef.current = setTimeout(triggerRandomGlitch, 5000);
    
    return () => {
      document.head.removeChild(styleEl);
      if (glitchTimerRef.current) {
        clearTimeout(glitchTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const createGridPoints = () => {
      const points = [];
      const gridSize = 9; // Increased for more points
      const spacing = 6; // Tighter spacing
      
      for (let i = -Math.floor(gridSize/2); i <= Math.floor(gridSize/2); i++) {
        for (let j = -Math.floor(gridSize/2); j <= Math.floor(gridSize/2); j++) {
          if (i === 0 && j === 0) continue;
          
          const distance = Math.sqrt(i*i + j*j);
          // Only create points within a circular radius
          if (distance > gridSize/2) continue;
          
          if (Math.random() < 0.2) continue;
          
          const opacityFactor = 1 - Math.min(distance / (gridSize/2), 0.9);
          const randomFactor = 0.7 + Math.random() * 0.3;
          const opacity = opacityFactor * randomFactor;
          const xOffset = i * spacing + (Math.random() * 2 - 1);
          const yOffset = j * spacing + (Math.random() * 2 - 1);
          
          points.push({
            id: `grid-${i}-${j}`,
            x: xOffset,
            y: yOffset,
            opacity: opacity,
            size: 1 + Math.random() * 1.5,
            distance: distance // Store distance for potential effects
          });
        }
      }
      
      setGridPoints(points);
    };
    
    createGridPoints();
  }, []);

  useEffect(() => {
    let animationFrameId;
    let rotationAnimationId;
    let particleCleanupId;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTimeRef.current;
      
      if (deltaTime > 0) {
        const newVelocity = {
          x: (clientX - lastPosRef.current.x) / deltaTime * 10,
          y: (clientY - lastPosRef.current.y) / deltaTime * 10
        };
        setVelocity(newVelocity);
      }
      
      lastPosRef.current = { x: clientX, y: clientY };
      lastTimeRef.current = currentTime;
      
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updatePosition);
      }
      
      const target = e.target;
      
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || 
          target.closest('button') || target.closest('a') || 
          target.classList.contains('interactive') || 
          target.closest('.interactive')) {
        setCursorType('interactive');
        setCursorSize(28);
        setShowRings(true);
        
        const textAttr = target.getAttribute('data-cursor-text') || 
                       target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        if (textAttr) {
          setCursorText(textAttr);
        } else {
          setCursorText('');
        }
        
        setHoverElement(target);
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorType('text');
        setCursorSize(2);
        setShowRings(false);
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorSize(16);
        setShowRings(false);
        setCursorText('');
        setHoverElement(null);
      }

      // Add trail effect
      if (visible && cursorType === 'interactive') {
        setTrailPoints(prev => {
          const now = Date.now();
          // Filter out old points and add new one
          const newPoints = [
            {
              id: now,
              x: clientX,
              y: clientY,
              timestamp: now,
              size: cursorSize * 0.4, // Slightly smaller than cursor
              opacity: 0.8,
              color: glitchMode ? 
                `hsla(${Math.random() * 360}, 70%, 50%, 0.8)` : 
                'hsla(var(--primary), 0.8)'
            },
            ...prev.filter(p => now - p.timestamp < TRAIL_LIFETIME)
          ].slice(0, MAX_TRAIL_POINTS);

          return newPoints;
        });
      }
    };
    
    const updatePosition = () => {
      setPosition(lastPosRef.current);
      animationFrameId = null;
    };
    
    const handleMouseDown = () => {
      setClicked(true);
      createClickParticles();
    };
    
    const handleMouseUp = () => {
      setClicked(false);
    };
    
    const handleMouseEnter = () => {
      setVisible(true);
    };
    
    const handleMouseLeave = () => {
      setVisible(false);
    };
    
    const rotateGrid = () => {
      setRotationAngle(prev => (prev + 0.3) % 360);
      rotationAnimationId = requestAnimationFrame(rotateGrid);
    };
    
    const createClickParticles = () => {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: `particle-${Date.now()}-${i}`,
        x: position.x + Math.random() * 20 - 10,
        y: position.y + Math.random() * 20 - 10,
        size: 1 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15,
        opacity: 1,
        rotation: Math.random() * 360,
        color: cursorType === 'interactive' ? 'hsla(var(--primary), 0.8)' : 'rgba(255, 255, 255, 0.8)',
        life: 100
      }));
      
      setParticles(prev => [...prev, ...newParticles]);
    };
    
    const updateParticles = () => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vx: p.vx * 0.95,
          vy: p.vy * 0.95,
          opacity: p.opacity - 0.02,
          size: p.size * 0.97,
          life: p.life - 1
        }))
        .filter(p => p.life > 0 && p.opacity > 0)
      );
      
      particleCleanupId = requestAnimationFrame(updateParticles);
    };
    
    rotationAnimationId = requestAnimationFrame(rotateGrid);
    particleCleanupId = requestAnimationFrame(updateParticles);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      cancelAnimationFrame(rotationAnimationId);
      cancelAnimationFrame(particleCleanupId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [position]);

  useEffect(() => {
    if (!hoverElement) return;
    
    const highlightElement = () => {
      hoverElement.style.transition = 'all 0.3s ease';
      hoverElement.style.boxShadow = '0 0 0 1px rgba(var(--primary-rgb), 0.3), 0 0 10px rgba(var(--primary-rgb), 0.1)';
      
      return () => {
        if (hoverElement) {
          hoverElement.style.boxShadow = '';
        }
      };
    };
    
    const cleanup = highlightElement();
    return cleanup;
  }, [hoverElement]);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      if (cursorType === 'interactive') {
        setEnergyLevel(prev => Math.max(prev - 0.5, 20));
      } else {
        setEnergyLevel(prev => Math.min(prev + 1, 100));
      }
    }, 100);

    return () => clearInterval(energyInterval);
  }, [cursorType]);

  if (typeof window === 'undefined' || !('matchMedia' in window) || window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const glitchOffset = glitchMode ? `${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px` : '0, 0';

  const renderCursorCore = () => (
    <motion.div
      className={`absolute left-0 top-0 overflow-hidden ${
        energyLevel < 40 ? 'energy-pulse' : ''
      }`}
      animate={{
        width: cursorSize,
        height: cursorSize,
        x: -cursorSize/2 + (glitchMode ? Math.random() * 3 - 1.5 : 0),
        y: -cursorSize/2 + (glitchMode ? Math.random() * 3 - 1.5 : 0),
        opacity: visible ? 1 : 0,
        scale: clicked ? 0.8 : cursorScale,
        rotate: shapeVariants[shape].rotation + (glitchMode ? Math.random() * 20 - 10 : 0)
      }}
      style={{
        backgroundColor: cursorType === 'interactive' ? 
          `hsl(var(--primary) / ${energyLevel/100})` : 'white',
        clipPath: shapeVariants[shape].clipPath,
        boxShadow: cursorType === 'interactive' ? 
          `0 0 15px 3px hsl(var(--primary) / ${energyLevel/200}), 
           inset 0 0 4px hsl(var(--primary))` : 
          '0 0 8px rgba(255,255,255,0.6)',
        transform: `translate(${glitchOffset})`,
      }}
      transition={{
        scale: { type: "spring", stiffness: 500, damping: 10 },
        rotate: { type: "spring", stiffness: 200, damping: 10 },
        width: { type: "spring", stiffness: 500, damping: 30 },
        height: { type: "spring", stiffness: 500, damping: 30 },
      }}
    >
      {cursorType === 'interactive' && (
        <div className="matrix-bg crystal-effect"></div>
      )}
      {energyLevel < 40 && (
        <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay" />
      )}
    </motion.div>
  );

  const renderGridPoints = () => (
    <div className="absolute left-0 top-0" style={{
      width: cursorSize * 3,
      height: cursorSize * 3,
      transform: `translate(-50%, -50%)`,
      clipPath: 'circle(50% at 50% 50%)',
      overflow: 'hidden'
    }}>
      {cursorType !== 'text' && gridPoints.map((point, index) => (
        <motion.div
          key={point.id}
          className="cursor-grid-point absolute"
          style={{
            left: '50%',
            top: '50%',
            width: point.size * (clicked ? 2 : 1),
            height: point.size * (clicked ? 2 : 1),
            backgroundColor: glitchMode ? 
              `hsl(${(index * 40) % 360}, 100%, 70%)` : 
              cursorType === 'interactive' ? 
                `hsla(var(--primary), ${point.opacity})` : 
                'white',
            opacity: point.opacity * (clicked ? 1.5 : 1) * (visible ? 1 : 0) * (glitchMode ? Math.random() : 1),
            transform: `
              translate(-50%, -50%) 
              rotate(${rotationAngle + 45}deg) 
              translate(${point.x * (clicked ? 1.8 : 1) + (glitchMode ? Math.random() * 5 - 2.5 : 0)}px, 
                      ${point.y * (clicked ? 1.8 : 1) + (glitchMode ? Math.random() * 5 - 2.5 : 0)}px)
            `,
            boxShadow: glitchMode ? `0 0 2px ${Math.random() > 0.7 ? 'cyan' : 'magenta'}` : '',
          }}
        />
      ))}
    </div>
  );

  const renderRings = () => (
    <AnimatePresence>
      {showRings && (
        <>
          {[1, 2].map((ring) => (
            <motion.div
              key={`ring-${ring}`}
              className="cursor-ring absolute left-0 top-0"
              initial={{ 
                width: cursorSize, 
                height: cursorSize, 
                x: -cursorSize/2, 
                y: -cursorSize/2, 
                opacity: 0.8,
                clipPath: shapeVariants.diamond.clipPath,
              }}
              animate={{ 
                width: cursorSize + (ring * 20), 
                height: cursorSize + (ring * 20),
                x: -(cursorSize + (ring * 20))/2,
                y: -(cursorSize + (ring * 20))/2,
                opacity: 0,
                rotate: glitchMode ? Math.random() * 90 : 45,
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                repeat: Infinity,
                duration: 1.2,
                delay: ring * 0.2,
                ease: "easeOut"
              }}
              style={{
                border: `1px solid ${
                  glitchMode ? 
                    `hsla(${Math.random() * 360}, 100%, 50%, 0.8)` : 
                    'hsla(var(--primary), 0.8)'
                }`,
                transform: `translate(${glitchOffset})`,
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Trail Effect */}
      <AnimatePresence mode="popLayout">
        {trailPoints.map((point, i) => {
          const progress = 1 - ((Date.now() - point.timestamp) / TRAIL_LIFETIME);
          return (
            <motion.div
              key={point.id}
              className="fixed pointer-events-none"
              initial={{ 
                opacity: point.opacity,
                scale: 1,
                x: point.x,
                y: point.y
              }}
              animate={{ 
                opacity: 0,
                scale: 0.2,
                x: point.x,
                y: point.y
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: point.size * (1 - i * 0.05),
                height: point.size * (1 - i * 0.05),
                backgroundColor: point.color,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                filter: glitchMode ? 'blur(1px)' : 'none',
                zIndex: 89,
                mixBlendMode: 'screen',
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Rest of the cursor components */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed z-[90] pointer-events-none hidden md:block"
          initial={{ opacity: particle.opacity }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            boxShadow: '0 0 4px currentColor',
            transform: `rotate(${particle.rotation}deg)`
          }}
        />
      ))}

      <motion.div 
        className={`technosphere-cursor fixed z-[100] border-50 pointer-events-none hidden md:block ${glitchMode ? 'glitch-effect' : ''}`}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          damping: 15,
          stiffness: 400,
        }}
      >
        {renderCursorCore()}
        {renderGridPoints()}
        {renderRings()}
      </motion.div>

      <AnimatePresence>
        {cursorText && (
          <motion.div 
            className={`fixed z-[101] pointer-events-none hidden md:block px-4 py-2 bg-background/80 backdrop-blur-md rounded border shadow-lg ${glitchMode ? 'glitch-effect' : ''}`}
            initial={{ y: position.y + 24, x: position.x, opacity: 0 }}
            animate={{ 
              y: position.y + 26, 
              x: position.x, 
              opacity: 1,
              borderColor: glitchMode ? 
                `hsla(${Math.random() * 360}, 70%, 50%, 0.5)` : 
                'hsla(var(--primary), 0.3)'
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", mass: 0.1, damping: 20 }}
            style={{
              transform: `translate(-50%, 0) ${glitchMode ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : ''}`,
              boxShadow: glitchMode ? 
                `0 0 8px hsla(${Math.random() * 360}, 100%, 50%, 0.5), inset 0 0 20px rgba(0,0,0,0.2)` :
                '0 0 8px hsla(var(--primary), 0.2), inset 0 0 20px rgba(0,0,0,0.2)'
            }}
          >
            <div className={`text-primary font-mono text-xs ${glitchMode ? 'text-shadow' : ''}`}>
              {glitchMode ? cursorText.split('').map((char, i) => 
                Math.random() > 0.8 ? '_' : char
              ).join('') : cursorText}
            </div>
            {glitchMode && (
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-x-0 h-[1px] bg-primary/30 top-1/4" />
                <div className="absolute inset-x-0 h-[1px] bg-primary/30 top-2/4" />
                <div className="absolute inset-x-0 h-[1px] bg-primary/30 top-3/4" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cursorType === 'interactive' && (
          <motion.div
            className="fixed z-[99] pointer-events-none hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.15,
              x: position.x - 60,
              y: position.y - 60,
            }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="w-[120px] h-[120px] overflow-hidden rounded-full"
              style={{
                background: `radial-gradient(circle, 
                  ${glitchMode ? 'rgba(255, 0, 255, 0.15)' : 'rgba(var(--primary-rgb), 0.15)'} 0%, 
                  transparent 70%
                )`,
                boxShadow: 'inset 0 0 20px rgba(var(--primary-rgb), 0.1)',
              }}
            >
              <div 
                className="w-full h-[2px]"
                style={{
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    ${glitchMode ? 'cyan' : 'hsl(var(--primary))'} 50%, 
                    transparent 100%
                  )`,
                  animation: 'scanline 1.2s linear infinite',
                  opacity: 0.7,
                }}
              />
              <div 
                className="w-full h-[1px] mt-[30px]"
                style={{
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    ${glitchMode ? 'magenta' : 'hsl(var(--primary))'} 50%, 
                    transparent 100%
                  )`,
                  animation: 'scanline 1.7s linear infinite',
                  opacity: 0.5,
                  animationDelay: '-0.5s'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;