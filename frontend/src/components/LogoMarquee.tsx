"use client";

export default function LogoMarquee() {
  const technologies = [
    { name: "NVIDIA AI", color: "text-[#76B900]" },
    { name: "OpenAI", color: "text-[#ffffff]" },
    { name: "Anthropic", color: "text-[#E0B883]" },
    { name: "PyTorch", color: "text-[#EE4C2C]" },
    { name: "Next.js", color: "text-[#ffffff]" },
    { name: "PostgreSQL", color: "text-[#336791]" },
    { name: "Prisma", color: "text-[#2D3748]" },
    { name: "Google Cloud", color: "text-[#4285F4]" },
    { name: "AWS", color: "text-[#FF9900]" },
    { name: "Supabase", color: "text-[#3ECF8E]" },
    { name: "Docker", color: "text-[#2496ED]" },
    { name: "TypeScript", color: "text-[#3178C6]" },
  ];

  // Double the list to support infinite loop spacing
  const doubleList = [...technologies, ...technologies, ...technologies];

  return (
    <div className="relative w-full py-10 bg-[#05060A]/80 border-y border-white/5 overflow-hidden z-20">
      {/* Side Blur Gradients to mask clipping */}
      <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#05060A] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#05060A] to-transparent z-10 pointer-events-none" />

      <div className="flex w-full overflow-hidden">
        <div className="animate-marquee flex items-center space-x-16 whitespace-nowrap">
          {doubleList.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center space-x-3 group cursor-default select-none"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 group-hover:scale-150 transition-all duration-300" />
              <span
                className={`font-display text-lg md:text-2xl font-semibold tracking-widest uppercase transition-all duration-300 group-hover:text-white text-gray-500 opacity-60 group-hover:opacity-100`}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
