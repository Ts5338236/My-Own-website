"use client";

import { useRef, useEffect } from "react";
import { Brain, Cpu, Layers, Workflow, BarChart3, ArrowRight } from "lucide-react";

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = container.getElementsByClassName("spotlight-card");
      for (const card of cards as any) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const services = [
    {
      title: "AI/ML Solutions",
      description: "Custom deep learning architectures, custom large language model fine-tuning, computer vision classification, and predictive reinforcement models built for production deployment.",
      icon: Brain,
      size: "col-span-12 md:col-span-8",
      gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
      badge: "State of the Art",
    },
    {
      title: "AI Automation & Agents",
      description: "Autonomous multi-agent system workflows, LLM tool integrations, and agent-driven document/process pipelines that reduce hours of operations to seconds.",
      icon: Workflow,
      size: "col-span-12 md:col-span-4",
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      badge: "Hyper Efficiency",
    },
    {
      title: "Enterprise Systems",
      description: "Robust backends, resilient microservices meshes, high-availability setups, and bank-grade data security protocols designed to scale with millions of users.",
      icon: Cpu,
      size: "col-span-12 md:col-span-4",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      badge: "Scale First",
    },
    {
      title: "Full-Stack Web & Apps",
      description: "Interactive frontends utilizing Next.js, fluid layouts, ultra-fast caching systems, and highly optimized database integrations for maximum responsiveness.",
      icon: Layers,
      size: "col-span-12 md:col-span-8",
      gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
      badge: "Stunning Visuals",
    },
    {
      title: "SaaS Platforms",
      description: "Complete product engineering from conception to monetization: subscription layers, usage analytics, admin controls, and cloud deployment pipelines.",
      icon: BarChart3,
      size: "col-span-12",
      gradient: "from-cyan-500/20 via-purple-500/10 to-transparent",
      badge: "Complete Stack",
    },
  ];

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
    <section id="services" className="relative w-full py-24 bg-[#05060A] overflow-hidden z-20">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24">
        {/* Section Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Our Services</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Capabilities Built For The Intelligent Age
          </h2>
          <p className="font-sans text-lg text-gray-400 leading-relaxed">
            We merge cutting-edge AI orchestration with rigorous software craftsmanship to deliver digital systems that drive growth and structural efficiency.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={containerRef} className="grid grid-cols-12 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className={`spotlight-card glass-panel group flex flex-col justify-between p-8 md:p-10 min-h-[320px] relative overflow-hidden transition-all duration-300 ${service.size}`}
              >
                {/* Spotlight background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Icon wrapper */}
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all duration-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Badge */}
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-cyan-400 transition-colors duration-300">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-gray-400 text-sm md:text-base leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                  <span className="text-xs font-semibold text-gray-500 group-hover:text-white transition-colors duration-300">
                    Learn More
                  </span>
                  <button 
                    onClick={() => handleScrollTo("contact")}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:translate-x-1 transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
