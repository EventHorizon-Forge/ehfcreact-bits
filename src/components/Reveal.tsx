import React, { useRef, useEffect, FC, ReactNode, HTMLAttributes } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  width?: "fit" | "full";
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  reset?: boolean;
  className?: string;
}

export const Reveal: FC<RevealProps> = ({
  children,
  width = "fit",
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 50,
  reset = false,
  className = "",
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: !reset });
  const controls = useAnimation();

  // Determine the initial position based on direction
  const getDirectionalProps = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      case "none":
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, y: 0, opacity: 1 });
    } else if (reset) {
      controls.start(getDirectionalProps());
    }
  }, [controls, inView, reset, direction, distance]);

  return (
    <motion.div
      ref={ref}
      className={`${width === "fit" ? "w-fit" : "w-full"} ${className}`}
      initial={getDirectionalProps()}
      animate={controls}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth animation
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
