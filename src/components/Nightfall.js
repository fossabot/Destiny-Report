import React from "react";
import "../styles/Nightfall.scss";
import { Spinner } from ".";

const Nightfall = ({ isFetched, data }) => {
  return (
    <div className="nightfall--wrapper">
      <div className="nightfall-title">NIGHTFALLS</div>
      {isFetched ? (
        <div className="nightfall-current-nfs">
          {data.map((nf, idx) => (
            <div key={nf + idx}>{nf}</div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Nightfall;
