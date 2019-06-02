import React from "react";
import "../../static/styles/ActivityHeader.scss";
import { Spacer } from ".";

const ActivityHeader = ({
  overall = "OVERALL",
  overallSecondary,
  win,
  loss,
  ratio,
  hoursPlayed
}) => {
  return (
    <div className="rh--wrapper">
      <div className="rh__overall">
        <div className="rh__overall-text">{overall}</div>
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

export default ActivityHeader;
