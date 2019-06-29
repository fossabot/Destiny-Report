import React from "react";
import "../../static/styles/ActivityHeader.scss";
import { Spacer } from ".";
import secondsToDhm from "../utils/secondsToDhm";

const RaidOverallHeader = ({ data }) => {
  return (
    <div className="rh--wrapper">
      <div className="rh__overall">
        <div className="rh__overall-text">OVERALL</div>
        <Spacer height="5px" />
        <div className="rh__overall-games">{secondsToDhm(data.timePlayed)}</div>
      </div>
      <div className="rh__stats">
        <div className="rh__stats-box">
          <div className="rh__stats-primary">{data.clears}</div>
          <div className="rh__stats-secondary">Raids Cleared</div>
        </div>
      </div>
    </div>
  );
};

export default RaidOverallHeader;
