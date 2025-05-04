import React, { useState, useEffect } from "react";
import "./counter.css";

interface CounterProps {
  start?: number;
  end: number;
  duration?: number;
  separator?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  onComplete?: () => void;
}

export const Counter: React.FC<CounterProps> = ({
  start = 0,
  end,
  duration = 2000,
  separator = ",",
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  onComplete,
}) => {
  const [count, setCount] = useState(start);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = progress * (end - start) + start;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(countUp);
      } else {
        setCount(end);
        setAnimationComplete(true);
        if (onComplete) onComplete();
      }
    };

    animationFrame = requestAnimationFrame(countUp);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [start, end, duration, onComplete]);

  const formatNumber = (num: number) => {
    const numFixed = num.toFixed(decimals);

    if (separator) {
      const parts = numFixed.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return `${prefix}${parts.join(".")}${suffix}`;
    }

    return `${prefix}${numFixed}${suffix}`;
  };

  return (
    <div className={className}>
      <span className="font-bold">{formatNumber(count)}</span>
      {animationComplete ? (
        <span className="counter-transition counter-rotate-down ml-2">▲</span>
      ) : (
        <span className="counter-transition counter-rotate-up ml-2">▲</span>
      )}
    </div>
  );
};
