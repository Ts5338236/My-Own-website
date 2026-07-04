"use client";

import { motion } from "framer-motion";
import { Search, Compass, Cpu, Sparkles, Rocket } from "lucide-react";

export default function ProcessTimeline() {
  const steps = [
    {
      title: "Discovery & Alignment",
      description: "We work directly with your stakeholders to define system boundaries, map critical database structures, analyze target metrics, and align on project specifications.",
      icon: Search,
      color: "from-blue-600 to-indigo-600",
      glow: "rgba(59, 130, 246, 0.4)",
    },
    {
      title: "Architectural Mapping",
      description: "We design resilient systems. Outlining database entity relations, caching layouts, custom microservices configurations, and server boundaries before writing code.",
      icon: Compass,
      color: "from-indigo-600 to-purple-600",
      glow: "rgba(99, 102, 241, 0.4)",
    },
    {
      title: "Engineered Construction",
      description: "Writing type-safe, scalable codebase using Next.js, Go, or Python. Setting up strict lint rules, staging pipelines, and writing comprehensive test structures.",
      icon: Cpu,
      color: "from-purple-600 to-pink-600",
      glow: "rgba(139, 92, 246, 0.4)",
    },
    {
      title: "AI Integration & Tuning",
      description: "We inject intelligence. Configuring multi-agent workflow systems, custom training/fine-tuning scripts, token tracing systems, and semantic memory vectors.",
      icon: Sparkles,
      color: "from-pink-600 to-cyan-500",
      glow: "rgba(236, 72, 153, 0.4)",
    },
    {
      title: "Optimization & Launch",
      description: "Edge network optimization, CDN mapping, CDN assets pre-compilation, query caching optimizations, and deploying to high-availability hosting networks.",
      icon: Rocket,
      color: "from-cyan-500 to-blue-500",
      glow: "rgba(6, 182, 212, 0.4)",
    },
  ];

  return (
    <section id="process" className="relative w-full py-24 bg-[#05060A] overflow-hidden z-20">
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Our Method</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Rigorous Development Pipeline
          </h2>
          <p className="font-sans text-gray-400 text-lg leading-relaxed">
            From initial alignment to model refinement and release, our delivery process is structured to guarantee velocity and visual excellence.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central bar */}
          <div className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-20" />

          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0"
              >
                {/* Node icon in the center */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] shadow-[0_0_30px_${step.glow}]`}
                  >
                    <div className="w-full h-full bg-[#0b0d19] rounded-2xl flex items-center justify-center text-white">
                      <StepIcon className="w-7 h-7" />
                    </div>
                  </motion.div>
                </div>

                {/* Left card (Desktop only) */}
                <div className={`hidden md:block w-[calc(50%-60px)] ${isEven ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                  {isEven && (
                    <motion.div
                      initial={{ x: -40, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="glass-panel p-8"
                    >
                      <span className="font-display text-4xl font-extrabold text-white/10 mb-2 block">
                        0{idx + 1}
                      </span>
                      <h3 className="font-display text-xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="font-sans text-gray-400 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Right card (Desktop) or main card (Mobile) */}
                <div
                  className={`w-full md:w-[calc(50%-60px)] pl-24 md:pl-0 ${
                    isEven ? "block md:hidden" : "block"
                  } ${!isEven ? "opacity-100" : "md:opacity-0 md:pointer-events-none"}`}
                >
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel p-8"
                  >
                    <span className="font-display text-4xl font-extrabold text-white/10 mb-2 block md:hidden">
                      0{idx + 1}
                    </span>
                    <span className="font-display text-4xl font-extrabold text-white/10 mb-2 hidden md:block">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="font-sans text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
