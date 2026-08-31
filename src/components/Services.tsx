import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Wrench } from "lucide-react";

const Services = () => {

  const services = [
    {
      title: "Full-Stack Architecture",
      desc: "Designing and shipping resilient, production-ready web platforms from database schemas to performant React applications.",
      highlight: true
    },
    {
      title: "API & Backend Engineering",
      desc: "Building high-performance REST microservices, async worker queues, and secure backend integrations.",
      highlight: false
    },
    {
      title: "Frontend & Web Performance",
      desc: "Developing pixel-perfect, accessible user interfaces with ultra-fast page loads and 60fps interaction polish.",
      highlight: false
    },
    {
      title: "Cloud Operations & DevOps",
      desc: "Deploying and managing scalable applications using AWS, Docker, Vercel, and modern CI/CD automation pipelines.",
      highlight: false
    }
  ];

  return (
    <section
      id="services"
      className="relative w-full px-6 py-20 sm:px-12 md:py-32 bg-[#080808] border-t border-white/5"
    >
      <div 
        className="w-full flex flex-col xl:flex-row gap-16 lg:gap-24"
      >
        {/* Left Column: Title */}
        <div className="flex-1 max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground mb-6"
          >
            Technical capabilities I bring to engineering teams
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-muted-foreground/80 font-normal max-w-sm"
          >
            Combining scalable architecture, system efficiency, and product execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Discuss Opportunities
            </a>
          </motion.div>
        </div>

        {/* Right Column: 2x2 Grid */}
        <div className="w-full xl:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
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
