import { useState, useEffect } from "react";
import "./styles.css";
import { tempMovieData, tempWatchedData } from "./dummyData/dummyData";
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
// import { StartRating } from "./components/StartRating";
// import { Expander } from "./expander/Expander";

const key = "2dbf7c33";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=2dbf7c33`, {
          signal: controller.signal,
        });
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
    fetchMovie();
    return function () {
      controller.abort();
    };
  }, [query]);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
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
      {/* <Expander /> */}
      {/* <StartRating message={["Terrible", "Bad", "Okay", "Good", "Amazing"]} /> */}
      {/* <StartRating color="pink" maxRating={10} /> */}
    </>
  );
}
