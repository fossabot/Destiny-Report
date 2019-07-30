import React from "react";
import "../styles/Leviathan.scss";
import { Spinner } from ".";

const Leviathan = ({ isFetched, data }) => {
  return (
    <div className="leviathan--wrapper">
      <div className="leviathan-title">LEVIATHAN</div>
      {isFetched ? (
        <div className="leviathan-current-order">
          {data.map((er, idx) => (
            <div key={er + idx}>{er}</div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Leviathan;
