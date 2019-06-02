import React from "react";
import "../../static/styles/RaidHeader.scss";
import { Spacer } from ".";

const RaidHeader = () => {
  return (
    <div className="rh--wrapper">
      <div className="rh__overall">
        <div className="rh__overall-text">OVERALL</div>
        <Spacer height="5px" />
        <div className="rh__overall-games">223 Clears</div>
      </div>
      <div className="rh__stats">
        <div className="rh__stats-box">
          <div className="rh__stats-primary">
            <span className="color-green">120</span> -{" "}
            <span className="color-red">120</span>
          </div>
          <div className="rh__stats-secondary">Performance</div>
        </div>
        <div className="rh__stats-box">
          <div className="rh__stats-primary">60%</div>
          <div className="rh__stats-secondary">Completion Ratio</div>
        </div>
        <div className="rh__stats-box">
          <div className="rh__stats-primary">200h</div>
          <div className="rh__stats-secondary">Hours Played</div>
        </div>
      </div>
    </div>
  );
};

export default RaidHeader;
