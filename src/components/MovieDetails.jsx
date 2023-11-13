import React from "react";
import "../styles.css";

export const MovieDetails = ({ selectedId, onCloseMovie }) => {
  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie} />
      SelectedMovie
    </div>
  );
};
