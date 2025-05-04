import React, { useState, useEffect, useRef } from "react";
import "./variableproximity.css";

interface VariableProximityProps {
  text: string;
  className?: string;
  proximityThreshold?: number; // Distance at which the effect starts
  maxOpacity?: number;
  minOpacity?: number;
}

export const VariableProximity: React.FC<VariableProximityProps> = ({
  text,
  className = "",
  proximityThreshold = 200,
  maxOpacity = 1,
  minOpacity = 0.3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [charOpacities, setCharOpacities] = useState<number[]>([]);
  const chars = text.split("");

  // Initialize character opacities at minimum
  useEffect(() => {
    setCharOpacities(Array(chars.length).fill(minOpacity));
  }, [chars.length, minOpacity]);

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
    setCharOpacities(Array(chars.length).fill(minOpacity));
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (!mousePosition || !containerRef.current) return;

    const charElements = containerRef.current.getElementsByClassName(
      "variable-proximity-text"
    );
    const newOpacities = [...charOpacities];

    for (let i = 0; i < charElements.length; i++) {
      const charEl = charElements[i] as HTMLSpanElement;
      const rect = charEl.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Get the center point of the character element
      const charCenterX = rect.left + rect.width / 2 - containerRect.left;
      const charCenterY = rect.top + rect.height / 2 - containerRect.top;

      // Calculate distance from mouse to character
      const distance = calculateDistance(
        mousePosition.x,
        mousePosition.y,
        charCenterX,
        charCenterY
      );

      // Calculate opacity based on proximity
      if (distance <= proximityThreshold) {
        // Linear interpolation: closer = more opaque
        const opacity =
          minOpacity +
          (maxOpacity - minOpacity) * (1 - distance / proximityThreshold);
        newOpacities[i] = opacity;
      } else {
        // Fade back to minimum opacity
        newOpacities[i] = minOpacity;
      }
    }

    setCharOpacities(newOpacities);
  }, [
    mousePosition,
    proximityThreshold,
    maxOpacity,
    minOpacity,
    charOpacities,
  ]);

  // Generate CSS classes for character opacities
  const getOpacityClass = (opacity: number) => {
    const opacityPercentage = Math.round(opacity * 100);
    return `variable-proximity-opacity-${opacityPercentage}`;
  };

  return (
    <div ref={containerRef} className={className}>
      {chars.map((char, index) => (
        <span
          key={index}
          className={`variable-proximity-text ${getOpacityClass(
            charOpacities[index]
          )}`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};
