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
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState("tt1570728");
  const [watched, setWatched] = useState(tempWatchedData);

  useEffect(() => {
    if (query.length > 3) {
      async function fetchMovie() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=2dbf7c33`);
          if (!res.ok) {
            throw new Error("Ocurrio un error");
          }
          const data = await res.json();
          console.log(res, data);
          if (data.Response === "False") {
            throw new Error(data.Error);
          }
          setMovies(data.Search);
        } catch (e) {
          console.log(e, e.message);
          setError(e.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovie();
    } else {
      setMovies([]);
      setError("");
    }
  }, [query]);
  console.log(selectedId);
  const handleSelectMovie = (id) => {
    setSelectedId(id);
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
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
              <MovieList movies={movies} setSelectedId={setSelectedId} />
            ) : (
              <ErrorMessage message={error} />
            )
          }
        />
        <Box
          element={
            <Watch
              watched={watched}
              onSelectMovie={handleSelectMovie}
              onCloseMovie={handleCloseMovie}
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
