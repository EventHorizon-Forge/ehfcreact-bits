import React from "react";
import "./GlassIcons.css";

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: "glass-icon-blue",
  purple: "glass-icon-purple",
  red: "glass-icon-red",
  indigo: "glass-icon-indigo",
  orange: "glass-icon-orange",
  green: "glass-icon-green",
};

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getColorClass = (color: string): string => {
    return gradientMapping[color] || "";
  };

  return (
    <div className={`glass-icons-container grid ${className || ""}`}>
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          aria-label={item.label}
          className={`glass-icon-button group ${item.customClass || ""}`}
        >
          {/* Back layer */}
          <span
            className={`glass-icon-back ${getColorClass(item.color)}`}
          ></span>

          {/* Front layer */}
          <span className="glass-icon-front">
            <span className="glass-icon-content" aria-hidden="true">
              {item.icon}
            </span>
          </span>

          {/* Label */}
          <span className="glass-icon-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;
