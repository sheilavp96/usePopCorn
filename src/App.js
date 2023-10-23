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

const key = "f84fc31d";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [watched, setWatched] = useState(tempWatchedData);
  const query = "asuhujhuhuh";
  useEffect(() => {
    setIsLoading(true);
    async function fetchMovie() {
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`);
        const data = await res.json();
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
  }, []);

  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <Results movies={movies} />
      </Navbar>
      <Main>
        <Box
          element={
            isLoading ? (
              <Loader />
            ) : !isLoading && !error ? (
              <MovieList movies={movies} />
            ) : (
              <ErrorMessage message={error} />
            )
          }
        />
        <Box element={<Watch watched={watched} />} />
      </Main>
      {/* <Expander /> */}
      {/* <StartRating message={["Terrible", "Bad", "Okay", "Good", "Amazing"]} /> */}
      {/* <StartRating color="pink" maxRating={10} /> */}
    </>
  );
}
