import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="navbar">
      <h2 className="navbar--home-item">
        <Link to="/" className="gambit-tracker-link">
          Gambit Tracker
        </Link>
      </h2>
      {/* <h2 className="navbar--donate-item">Donate</h2> */}
    </div>
  );
};
