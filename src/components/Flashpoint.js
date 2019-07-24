import React from "react";
import "../../static/styles/Flashpoint.scss";
import { Spinner } from ".";

const Flashpoint = ({ data, isFetched }) => {
  return (
    <div className="flashpoint--wrapper">
      <div className="flashpoint-title">FLASHPOINT</div>
      {isFetched ? (
        <div className="flashpoint-location">{data}</div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Flashpoint;
