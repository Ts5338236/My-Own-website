"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#05060A] pt-24 pb-16">
      {/* Background Radial Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-[160px] pointer-events-none z-0" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Interactive Neural Canvas */}
      <HeroCanvas />

      {/* Content */}
      <div className="relative max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24 w-full z-10 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Eyebrow Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md mb-8 select-none"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-gray-300 font-sans">
              AI-Native Software Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-8"
          >
            We Engineer{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent glow-text">
              Intelligence
            </span>{" "}
            Into Every Product
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12"
          >
            Building production-ready AI tools, enterprise software systems,
            intelligent workflow automation agents, and state-of-the-art full-stack SaaS.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("contact")}
              className="glow-btn w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white font-sans font-medium px-8 py-4 rounded-full shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScrollTo("work")}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-sans font-medium px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
            >
              <span>See Our Work</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none select-none"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll to Explore</span>
          <div className="w-6 h-10 border border-white/10 rounded-full flex justify-center p-1.5">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
