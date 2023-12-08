import React, { useState } from "react";

import Start from "./Start";
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  color: "black",
};
const startContainerStyle = {
  display: "flex",
  gap: "4px",
};

export const StartRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className,
  message = [],
  defaultRating = 0,
  onSetRating,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    onSetRating(rating);
    setRating(rating);
  };
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size}px`,
  };
  return (
    <div style={containerStyle} className={className}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Start
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {message.length === maxRating
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};
