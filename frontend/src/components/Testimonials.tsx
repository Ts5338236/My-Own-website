"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="relative w-full py-24 bg-[#05060A] overflow-hidden z-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Testimonials</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Trusted By Forward-Thinking Teams
          </h2>
          <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed">
            Read comments from our enterprise partners and startup founders who collaborated with us.
          </p>
        </div>

        {/* Carousel Content */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          <div className="absolute top-0 left-0 text-white/5 pointer-events-none">
            <Quote className="w-24 h-24 rotate-180" />
          </div>

          <div className="min-h-[250px] flex flex-col justify-between relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-sans text-xl md:text-2xl font-light text-gray-200 leading-relaxed mb-8 max-w-3xl italic">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Client Profile */}
                <div className="flex items-center space-x-4">
                  <img
                    src={current.avatar}
                    alt={current.clientName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/30"
                  />
                  <div className="text-left">
                    <h4 className="font-display text-base font-bold text-white">
                      {current.clientName}
                    </h4>
                    <p className="font-sans text-xs text-cyan-400">
                      {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mt-12 relative z-10">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIndex === idx ? "w-6 bg-cyan-400" : "w-1.5 bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
