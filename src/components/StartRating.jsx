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
const textStyle = {
  lineHeight: "1",
  margin: "0",
};
export const StartRating = ({ maxRating = 5 }) => {
  const [rating, setRating] = useState(0);
  const handleRating = (rating) => {
    setRating(rating);
  };
  return (
    <div style={containerStyle}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Start key={i} onRate={() => handleRating(i + 1)} full={rating >= i + 1} />
        ))}
      </div>
      <p style={textStyle}>{rating || ""}</p>
    </div>
  );
};
