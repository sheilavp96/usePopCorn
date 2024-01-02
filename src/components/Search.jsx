import { useState, useEffect, useRef } from "react";
import "../styles.css";
import { useKey } from "../hooks/useKey";

export const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);
  const clearQuery = () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  };
  useKey("Enter", clearQuery);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
