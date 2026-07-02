import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Services = () => {
  const { ref: animRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const services = [
    {
      title: "API Development",
      desc: "Building robust, scalable backends and microservices tailored to your specific needs.",
      highlight: false
    },
    {
      title: "UI/UX Engineering",
      desc: "Crafting beautiful, intuitive interfaces that delight users and drive engagement.",
      highlight: false
    },
    {
      title: "Full-Stack Web",
      desc: "End-to-end web application development from database architecture to pixel-perfect UI.",
      highlight: true
    },
    {
      title: "Cloud Infrastructure",
      desc: "Deploying and managing scalable applications using AWS, Vercel, and modern DevOps tools.",
      highlight: false
    }
  ];

  return (
    <section
      id="services"
      className="relative w-full px-6 py-20 sm:px-12 md:py-32 bg-[#080808] border-t border-white/5"
    >
      <div 
        ref={animRef as React.RefObject<HTMLDivElement>}
        className="w-full flex flex-col xl:flex-row gap-16 lg:gap-24"
      >
        {/* Left Column: Title */}
        <div className="flex-1 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 w-fit mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs tracking-wider text-muted-foreground uppercase">Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-foreground mb-6"
          >
            A Comprehensive look at what I offer and how I deliver
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground max-w-md"
          >
            A comprehensive approach to software development combining deep technical expertise with thoughtful design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Let's Talk
            </a>
          </motion.div>
        </div>

        {/* Right Column: 2x2 Grid */}
        <div className="w-full xl:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
              className={`p-6 sm:p-7 rounded-2xl flex flex-col justify-between group cursor-pointer transition-all duration-300 ${
                service.highlight 
                  ? 'bg-primary/5 border border-primary/20 hover:border-primary/40' 
                  : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]'
              }`}
            >
              <div>
                <h3 className={`text-lg font-medium mb-3 ${service.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
