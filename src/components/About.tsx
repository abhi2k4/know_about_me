import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

const memories = [
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/ccd25_xji8tt.jpg", label: "Google Cloud Community Days", date: "2025" },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/dsaclub_fzgcjx.jpg", label: "DSA Club Drive", date: "2024" },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/ms_qkhpiq.jpg", label: "GitTogether @ Microsoft", date: "2025" },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/next_j02zzm.jpg", label: "Next.js Summit", date: "2024" },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/aws_fikp28.jpg", label: "AWS Summit", date: "2025" }
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full px-5 sm:px-8 py-16 sm:py-20 md:px-12 md:py-32 bg-[#040404] border-b border-white/5"
    >
      <div className="w-full flex flex-col gap-12 lg:gap-20">
        {/* Top: Header & Memories */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] text-white max-w-4xl">
              Crafting systems at the intersection of{" "}
              <span className="block sm:inline-block">
                <FlipWords 
                  words={["Full-Stack Engineering", "Data Architecture", "Applied AI"]} 
                  className="text-[#B6443A] font-semibold pl-0 pr-2"
                />
              </span>
            </h2>
          </div>

          {/* 3D Fanning Deck of Memories */}
          <div className="flex-1 w-full flex items-center justify-center lg:justify-end lg:p-8 lg:pr-28">
            <motion.div 
              className="relative flex items-center justify-center h-48 sm:h-64 md:h-72 w-full max-w-[480px]"
              onMouseLeave={() => {
                if (!isMobile) {
                  setHoveredCardIndex(null);
                }
              }}
            >
              {memories.map((photo, i) => {
                const totalCards = memories.length;
                const offset = i - Math.floor(totalCards / 2);
                
                // Always fanned out positions
                const xOffset = offset * (isMobile ? 55 : 90);
                const rotation = offset * 8;
                const yOffset = Math.abs(offset) * (isMobile ? 4 : 8);

                const isHovered = hoveredCardIndex === i;

                return (
                  <motion.div
                    key={i}
                    className="absolute w-[120px] sm:w-[160px] md:w-[200px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-[#0d0d0d] will-change-transform group cursor-pointer"
                    style={{ originY: 1 }} // Rotate from bottom edge for clean fan effect
                    animate={{
                      x: xOffset,
                      y: isHovered ? yOffset - (isMobile ? 16 : 25) : yOffset,
                      rotate: isHovered ? 0 : rotation,
                      scale: isHovered ? 1.15 : 1,
                      zIndex: isHovered ? 50 : i + 10,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 24,
                    }}
                    onMouseEnter={() => !isMobile && setHoveredCardIndex(i)}
                    onMouseLeave={() => !isMobile && setHoveredCardIndex(null)}
                    onClick={() => {
                      if (isMobile) {
                        setHoveredCardIndex(hoveredCardIndex === i ? null : i);
                      }
                    }}
                  >
                    {/* Dark gradient overlay for typography contrast */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 z-10 flex flex-col justify-end p-2 sm:p-3 ${
                      isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`} />
                    
                    <img
                      src={getOptimizedImageUrl(photo.src, 400)}
                      alt={photo.label}
                      className="w-full h-full object-cover filter contrast-[1.05] saturate-[0.8] brightness-[0.85] group-hover:saturate-100 group-hover:brightness-100 transition-all duration-300"
                    />

                    {/* Captions that slide up on hover/touch */}
                    <div className={`absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 z-20 transition-transform duration-300 ease-out ${
                      isHovered ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
                    }`}>
                      <p className="text-[8px] sm:text-[10px] font-mono text-white/50 uppercase tracking-wider">{photo.date}</p>
                      <h4 className="text-[10px] sm:text-xs font-semibold text-white truncate">{photo.label}</h4>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
