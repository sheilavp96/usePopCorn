import { useState, useEffect, useCallback } from "react";
import "./styles.css";
import { Navbar } from "./components/Navbar";
import { Main } from "./components/Main";
import Results from "./components/Results";
import { Logo } from "./components/Logo";
import { Search } from "./components/Search";
import { Box } from "./components/Box";
import { MovieList } from "./components/MovieList";
import { Watch } from "./components/Watch";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorage([], "watched");
  // const [watched, setWatched] = useState(() => {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });
  function handleCloseMovie() {
    setSelectedId(null);
  }
  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  };

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </Navbar>
      <Main>
        <Box
          element={
            isLoading ? (
              <Loader />
            ) : !isLoading && !error ? (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            ) : (
              <ErrorMessage message={error} />
            )
          }
        />
        <Box
          element={
            <Watch
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              onDeleteWatched={handleDeleteWatched}
            />
          }
        />
      </Main>
    </>
  );
}
