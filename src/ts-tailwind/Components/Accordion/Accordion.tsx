import React, { useState } from "react";
import "./Accordion.css";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="accordion-item">
      <button
        className={`accordion-header ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg
          className={`accordion-icon ${isOpen ? "open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path d="M8 12L2 6L3.4 4.6L8 9.2L12.6 4.6L14 6L8 12Z" />
        </svg>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  className = "",
}) => {
  return <div className={`accordion ${className}`}>{children}</div>;
};
