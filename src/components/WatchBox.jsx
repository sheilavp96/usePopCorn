import React, { useState } from "react";
import "../styles.css";

import { tempWatchedData } from "../dummyData/dummyData";
import { Watch } from "./Watch";

export const WatchBox = () => {
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && <Watch watched={watched} />}
    </div>
  );
};
