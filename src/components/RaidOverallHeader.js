import React from "react";
import "../../static/styles/ActivityHeader.scss";
import { Spacer } from ".";

const RaidOverallHeader = ({ data }) => {
  return (
    <div className="rh--wrapper">
      <div className="rh__overall">
        <div className="rh__overall-text">OVERALL</div>
        <Spacer height="5px" />
        <div className="rh__overall-games">1D 1H</div>
      </div>
      <div className="rh__stats">
        <div className="rh__stats-box">
          <div className="rh__stats-primary">123</div>
          <div className="rh__stats-secondary">Raids Cleared</div>
        </div>
      </div>
    </div>
  );
};

export default RaidOverallHeader;
