"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code, Layers, Sparkles } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  tags: string;
}

interface CaseStudiesProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  const getIcon = (tags: string) => {
    const lower = tags.toLowerCase();
    if (lower.includes("ai") || lower.includes("learning")) return Sparkles;
    if (lower.includes("saas") || lower.includes("stack")) return Layers;
    return Code;
  };

  return (
    <section id="work" className="relative w-full py-24 bg-[#05060A] overflow-hidden z-20">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Featured Work</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Case Studies in Engineering Innovation
            </h2>
            <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed">
              Explore how we design and deploy advanced technology to solve complex problems for modern enterprises.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => {
            const StudyIcon = getIcon(study.tags);
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-panel group flex flex-col justify-between overflow-hidden relative cursor-pointer"
              >
                {/* Image Section */}
                <div className="h-60 w-full overflow-hidden relative border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d19] to-transparent z-10 opacity-60" />
                  <img
                    src={study.coverImage}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                    {study.tags.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="bg-black/60 backdrop-blur-md text-[10px] font-bold text-cyan-400 px-2.5 py-1 rounded-md border border-white/5"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center space-x-2 text-cyan-400 mb-3 text-xs font-semibold uppercase tracking-wider">
                      <StudyIcon className="w-3.5 h-3.5" />
                      <span>{study.tags.split(",")[0]} Project</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                      {study.title}
                    </h3>
                    <p className="font-sans text-gray-400 text-sm leading-relaxed mb-6">
                      {study.summary}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors duration-300">
                      View Project Analysis
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-purple-600 group-hover:border-purple-600 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
