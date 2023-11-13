import React from "react";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";
import { MovieDetails } from "./MovieDetails";

export const Watch = ({ watched, selectedId, onCloseMovie }) => {
  return (
    <>
      {selectedId ? (
        <MovieDetails selectedId={selectedId} onCloseMovie={onCloseMovie} />
      ) : (
        <>
          <WatchedSummary watched={watched} />

          <WatchedList watched={watched} />
        </>
      )}
    </>
  );
};
