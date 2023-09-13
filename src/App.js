import { useState } from "react";
import "./styles.css";
import { tempMovieData, tempWatchedData } from "./dummyData/dummyData";
import { Navbar } from "./components/Navbar";
import { MoviesList } from "./components/MoviesList";
import { MoviesWatched } from "./components/MoviesWatched";

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <Navbar movies={movies} />
      <main className="main">
        <div className="box">
          <button className="btn-toggle" onClick={() => setIsOpen1((open) => !open)}>
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && <MoviesList movies={movies} />}
        </div>

        <div className="box">
          <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <MoviesWatched
              watched={watched}
              avgImdbRating={avgImdbRating}
              avgUserRating={avgUserRating}
              avgRuntime={avgRuntime}
            />
          )}
        </div>
      </main>
    </>
  );
}
