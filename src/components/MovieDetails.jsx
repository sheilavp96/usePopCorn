import { useEffect, useState, useRef } from "react";
import "../styles.css";
import { StartRating } from "./StartRating";
import Loader from "./Loader";
import { useKey } from "../hooks/useKey";

export const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const countRef = useRef(0);
  useEffect(() => {
    console.log(countRef);
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
  const watchedUserRting = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Runtime: runtime,
    Plot: plot,
    imdbRating,
  } = movie;
  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      if (selectedId !== "") {
        const res = await fetch(
          `https://7wr88qxae0.execute-api.us-east-1.amazonaws.com/?i=${selectedId}`
        );
        if (!res.ok) {
          throw new Error("Ocurrio un error");
        }
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
      }
    };
    getMovieDetails();
  }, [selectedId]);
  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => (document.title = "usePopcorn");
  }, [title]);

  const handleAddMovie = () => {
    onAddWatched({
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split("").at(0)),
      userRating,
      countRatingDecision: countRef.current,
    });
    onCloseMovie();
  };
  useKey("Escape", onCloseMovie);
  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === "Escape") {
  //       onCloseMovie();
  //     }
  //   }
  //   document.addEventListener("keydown", callback);
  //   return function () {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StartRating maxRating={10} size={24} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>Ya calificaste la película: {watchedUserRting}</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};
