import React, { useState, useEffect } from "react";
import "./truefocus.css";

interface TrueFocusProps {
  text: string;
  focusWord: string;
  className?: string;
  onlyFocusWord?: boolean;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  text,
  focusWord,
  className = "",
  onlyFocusWord = false,
}) => {
  const [processed, setProcessed] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!text || !focusWord) {
      setProcessed([text]);
      return;
    }

    const regex = new RegExp(`(${focusWord})`, "gi");
    const parts = text.split(regex);

    const elements = parts.map((part, index) => {
      if (part.toLowerCase() === focusWord.toLowerCase()) {
        // This is our focus word
        return (
          <span key={index} className="true-focus-focus">
            {part}
          </span>
        );
      } else if (!onlyFocusWord) {
        // This is regular text, apply the blur effect
        return (
          <span key={index} className="true-focus-blur">
            {part}
          </span>
        );
      } else {
        // If onlyFocusWord is true, don't render non-matching parts
        return null;
      }
    });

    setProcessed(elements.filter((el) => el !== null));
  }, [text, focusWord, onlyFocusWord]);

  return <div className={className}>{processed}</div>;
};
