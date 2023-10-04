import React, { useState } from "react";

export const TextExpander = ({
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "#1f09cd",
  expanded = false,
  children,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  //separa por cantidad de palabras no por caracteres
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: buttonColor,
  };
  return (
    <div className={className} style={{ color: "black" }}>
      {displayText}
      <button style={buttonStyle} onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
};
