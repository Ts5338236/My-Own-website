"use client";

import { useState } from "react";
import { ArrowUpRight, Terminal, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
    <footer className="relative w-full bg-[#05060A] border-t border-white/5 pt-20 pb-10 z-20 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24">
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          {/* Logo + Pitch */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <a
              href="#"
              onClick={(e) => handleScrollTo(e, "")}
              className="flex items-center space-x-2 font-display text-2xl font-bold tracking-wider text-white"
            >
              <span>AETHERIC</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            </a>
            <p className="font-sans text-gray-400 text-sm max-w-sm leading-relaxed">
              We design and construct high-performance AI tools and enterprise applications designed for visual brilliance and structural scale.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Sitemaps */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Navigation</span>
              <a href="#services" onClick={(e) => handleScrollTo(e, "services")} className="font-sans text-sm text-gray-400 hover:text-white transition-colors">Services</a>
              <a href="#work" onClick={(e) => handleScrollTo(e, "work")} className="font-sans text-sm text-gray-400 hover:text-white transition-colors">Case Studies</a>
              <a href="#process" onClick={(e) => handleScrollTo(e, "process")} className="font-sans text-sm text-gray-400 hover:text-white transition-colors">Process</a>
              <a href="#tech" onClick={(e) => handleScrollTo(e, "tech")} className="font-sans text-sm text-gray-400 hover:text-white transition-colors">Stack</a>
            </div>
            <div className="flex flex-col space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Dashboard</span>
              <a href="/admin" className="font-sans text-sm text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                <span>Admin Login</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Newsletter</span>
            <p className="font-sans text-gray-400 text-sm leading-relaxed">
              Subscribe to stay updated with our newest research on AI agent workflows.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 p-4 rounded-xl text-sm">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>Subscription recorded!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="input-field py-2.5"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-black hover:bg-cyan-400 hover:text-black font-sans font-medium px-5 rounded-lg transition-colors duration-300"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Lower footer */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 text-xs text-gray-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Aetheric AI. All rights reserved.</span>
          <div className="flex items-center space-x-2 select-none border border-white/5 bg-white/5 py-1.5 px-3 rounded-full">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[10px]">VER_4K_BUILD_SUCCESS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
