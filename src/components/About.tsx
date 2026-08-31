import { useRef } from "react";
import { motion } from "framer-motion";
import { FlippingWordSwap } from "@/components/ui/flipping-word-swap";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

const memories = [
  { 
    src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/ccd25_xji8tt.jpg", 
    label: "Google Cloud Days", 
    date: "2025", 
    span: "col-span-2 aspect-[16/11]" 
  },
  { 
    src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/ms_qkhpiq.jpg", 
    label: "Microsoft GitTogether", 
    date: "2025", 
    span: "col-span-2 aspect-[16/11]" 
  },
  { 
    src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/aws_fikp28.jpg", 
    label: "AWS Summit", 
    date: "2025", 
    span: "col-span-2 aspect-[16/11]" 
  },
  { 
    src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/next_j02zzm.jpg", 
    label: "Next.js Summit", 
    date: "2024", 
    span: "col-span-3 aspect-[16/8]" 
  },
  { 
    src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/dsaclub_fzgcjx.jpg", 
    label: "DSA Club Drive", 
    date: "2024", 
    span: "col-span-3 aspect-[16/8]" 
  },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full px-6 py-16 sm:px-12 md:py-24 bg-[#040404] border-b border-white/5 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Heading & Subtext */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Architecting code where <br />
            performance meets <br />
            <span className="text-[#B6443A] font-extrabold inline-block">
              <FlippingWordSwap
                words={["Full-Stack Scale", "Distributed Systems", "Applied AI"]}
                autoplay={true}
                interval={3200}
                duration={400}
                stagger={35}
                className="text-[#B6443A] font-extrabold"
                toClassName="text-[#B6443A] font-extrabold"
              />
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-white/70 leading-relaxed font-normal max-w-xl">
            I transform complex technical challenges into high-throughput, production-ready software engineered for speed and scale.
          </p>
        </div>

        {/* Right Column: Compact Photo Grid matching left text height */}
        <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end">
          <div className="grid grid-cols-6 gap-2.5 w-full max-w-lg">
            {memories.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`relative rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/15 shadow-xl group cursor-pointer ${
                  photo.span
                }`}
              >
                <img
                  src={getOptimizedImageUrl(photo.src, 500)}
                  alt={photo.label}
                  className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.9] group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                />

                {/* Gradient overlay & photo caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-2 flex flex-col justify-end opacity-85 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] font-mono text-white/50 uppercase tracking-wider">{photo.date}</span>
                  <h4 className="text-[10px] sm:text-xs font-semibold text-white truncate leading-snug">{photo.label}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
