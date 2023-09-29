import React from "react";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";

export const Watch = ({ watched }) => {
  return (
    <>
      <WatchedSummary watched={watched} />
      <WatchedList watched={watched} />
    </>
  );
};
