import React, { useState, useEffect } from "react";

export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    callback?.();
    async function fetchMovie() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://7wr88qxae0.execute-api.us-east-1.amazonaws.com/?s=${query}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) {
          throw new Error("Ocurrio un error");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
        setError("");
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    // callback();
    fetchMovie();
    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
};
