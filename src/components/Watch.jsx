import React from "react";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";
import { MovieDetails } from "./MovieDetails";

export const Watch = ({
  watched,
  selectedId,
  onCloseMovie,
  onAddWatched,
  onDeleteWatched,
}) => {
  console.log(watched);
  return (
    <>
      {selectedId ? (
        <MovieDetails
          selectedId={selectedId}
          onCloseMovie={onCloseMovie}
          onAddWatched={onAddWatched}
          watched={watched}
        />
      ) : (
        <>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} onDeleteWatched={onDeleteWatched} />
        </>
      )}
    </>
  );
};
