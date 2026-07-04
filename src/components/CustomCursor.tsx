"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect mobile/touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseMoveEvent) => {
      const { clientX, clientY } = e;
      
      // Instantly position the dot
      setDotPosition({ x: clientX, y: clientY });
      
      // Delay-based smooth follow for the outer ring using requestAnimationFrame
      const follow = () => {
        setPosition(prev => {
          const dx = clientX - prev.x;
          const dy = clientY - prev.y;
          // Interpolate position (0.15 easing)
          return {
            x: prev.x + dx * 0.15,
            y: prev.y + dy * 0.15
          };
        });
      };
      
      requestAnimationFrame(follow);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`custom-cursor ${isHovered ? "active" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className="custom-cursor-dot"
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
        }}
      />
    </>
  );
}

// Inline types to avoid reference issues
interface MouseMoveEvent {
  clientX: number;
  clientY: number;
}
