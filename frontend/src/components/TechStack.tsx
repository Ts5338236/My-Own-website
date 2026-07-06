"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, BrainCircuit, Globe } from "lucide-react";

export default function TechStack() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", name: "All Tech", icon: Globe },
    { id: "ai", name: "AI / ML", icon: BrainCircuit },
    { id: "frontend", name: "Frontend", icon: Code2 },
    { id: "backend", name: "Backend / Database", icon: Server },
  ];

  const tools = [
    { name: "TypeScript", category: "frontend", icon: "TS", desc: "Type-safe interface engineering" },
    { name: "Next.js", category: "frontend", icon: "NX", desc: "Edge rendering & React orchestrator" },
    { name: "Tailwind CSS", category: "frontend", icon: "TW", desc: "Design system & layout styling" },
    { name: "Framer Motion", category: "frontend", icon: "FM", desc: "High-performance interface animations" },
    
    { name: "Python", category: "ai", icon: "PY", desc: "Model architecture & data parsing" },
    { name: "PyTorch", category: "ai", icon: "PT", desc: "Deep learning & neural networks" },
    { name: "LangChain", category: "ai", icon: "LC", desc: "AI agent orchestrations & chains" },
    { name: "Hugging Face", category: "ai", icon: "HF", desc: "Open-source model pipelines" },
    
    { name: "Rust", category: "backend", icon: "RS", desc: "High-concurrency systems & drivers" },
    { name: "PostgreSQL", category: "backend", icon: "PG", desc: "Robust relational data persistence" },
    { name: "Prisma", category: "backend", icon: "PR", desc: "Type-safe database ORM interface" },
    { name: "Redis", category: "backend", icon: "RD", desc: "Sub-millisecond data cache & rate limiting" },
  ];

  const filteredTools = activeTab === "all" ? tools : tools.filter(t => t.category === activeTab);

  return (
    <section id="tech" className="relative w-full py-24 bg-[#05060A] overflow-hidden z-20">
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Our Stack</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Optimized Technology Ecosystem
            </h2>
            <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed">
              We leverage production-hardened frameworks and modern AI tooling to build solutions that remain maintainable, secure, and fast.
            </p>
          </div>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap gap-3 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-sm self-start lg:self-end">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-sans text-xs md:text-sm font-medium tracking-wide transition-all duration-300 ${
                    activeTab === cat.id
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={tool.name}
                className="glass-panel p-6 flex flex-col justify-between hover:border-cyan-500/30 hover:bg-[#0b0d19]/80 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-display font-black text-xl text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300 mb-6">
                    {tool.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                    {tool.category === "ai" ? "Artificial Intel" : tool.category}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-cyan-500/30 group-hover:bg-cyan-400 group-hover:scale-150 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
