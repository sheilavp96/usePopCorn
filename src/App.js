import { useState } from "react";
// import "./styles.css";
import { tempMovieData, tempWatchedData } from "./dummyData/dummyData";
import { Navbar } from "./components/Navbar";
import { Main } from "./components/Main";
import Results from "./components/Results";
import { Logo } from "./components/Logo";
import { Search } from "./components/Search";
import { Box } from "./components/Box";
import { MovieList } from "./components/MovieList";
import { Watch } from "./components/Watch";
import { StartRating } from "./components/StartRating";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      {/* <Navbar>
        <Logo />
        <Search />
        <Results movies={movies} />
      </Navbar>
      <Main>
        <Box element={<MovieList movies={movies} />} />
        <Box element={<Watch watched={watched} />} />
      </Main> */}
      <StartRating message={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
      <StartRating color="pink" maxRating={10} />
    </>
  );
}
