import React, { useState, useEffect, useRef } from "react";
import "./decaycard.css";

interface DecayCardProps {
  children: React.ReactNode;
  className?: string;
  decay?: number; // How quickly the card fades (seconds)
  initialDelay?: number; // Delay before starting decay (seconds)
  onDecayComplete?: () => void;
}

export const DecayCard: React.FC<DecayCardProps> = ({
  children,
  className = "",
  decay = 5,
  initialDelay = 0,
  onDecayComplete,
}) => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial delay before starting decay
    const delayTimeout = setTimeout(() => {
      // Start the decay animation
      setOpacity(0);
      setTranslateY(20);

      // When decay animation is done, set to invisible
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        if (onDecayComplete) {
          onDecayComplete();
        }
      }, decay * 1000); // Convert to milliseconds
    }, initialDelay * 1000); // Convert to milliseconds

    return () => {
      clearTimeout(delayTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [decay, initialDelay, onDecayComplete]);

  if (!isVisible) return null;

  const decayCardStyle = `decay-transition decay-opacity-${Math.round(opacity * 100)} decay-translate-y-${translateY}`;

  return <div className={`${className} ${decayCardStyle}`}>{children}</div>;
};
