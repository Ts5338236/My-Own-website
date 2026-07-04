"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Tech", href: "#tech" },
  { name: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check which section is in view
      const scrollPos = window.scrollY + 200;
      for (const link of navLinks) {
        const el = document.getElementById(link.href.slice(1));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#05060A]/85 backdrop-blur-md border-white/5 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleScrollTo(e, "")}
          className="flex items-center space-x-2 font-display text-xl md:text-2xl font-bold tracking-wider text-white select-none"
        >
          <span>AETHERIC</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block self-end mb-1"></span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href.slice(1))}
              className={`font-sans text-sm tracking-wide transition-all duration-300 relative py-1 hover:text-white ${
                activeSection === link.href ? "text-cyan-400 font-medium" : "text-gray-400"
              }`}
            >
              {link.name}
              {activeSection === link.href && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              )}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="glow-btn inline-flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 backdrop-blur-sm"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-400 hover:text-white transition-colors focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 top-[73px] bg-[#05060A] border-t border-white/5 z-[998] lg:hidden flex flex-col justify-between py-12 px-8 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href.slice(1))}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`font-display text-2xl font-bold tracking-wide hover:text-cyan-400 transition-colors ${
                isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              } transition-all duration-500`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div
          className={`flex flex-col space-y-6 border-t border-white/10 pt-8 ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } transition-all duration-700 delay-300`}
        >
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium py-4 rounded-xl text-center flex items-center justify-center space-x-2"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
