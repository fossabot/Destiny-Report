import React from "react";
import "../styles/ActivityHeader.scss";
import { Spacer } from ".";
import getRatio from "../utils/getRatio";

const ActivityHeader = ({
  overall = "OVERALL",
  secondary = "Matches",
  data = {
    activitiesWon: 1,
    activitiesEntered: 1,
    totalActivityDuration: "0"
  }
}) => {
  const winLossRatio = getRatio(data.activitiesEntered, data.activitiesWon);

  return (
    <div className="rh--wrapper">
      <div className="rh__overall">
        <div className="rh__overall-text">{overall}</div>
        <Spacer height="5px" />
        <div className="rh__overall-games">
          {data.totalActivityDuration || "0d 0h"}
        </div>
      </div>
      <div className="rh__stats">
        <div className="rh__stats-box">
          <div className="rh__stats-primary">{data.activitiesEntered}</div>
          <div className="rh__stats-secondary">{secondary}</div>
        </div>
        <div className="rh__stats-box">
          <div className="rh__stats-primary">
            <span className="color-green">{data.activitiesWon}</span> -{" "}
            <span className="color-red">
              {data.activitiesEntered - data.activitiesWon}
            </span>
          </div>
          <div className="rh__stats-secondary">Wins - Loss</div>
        </div>
        <div className="rh__stats-box">
          <div className="rh__stats-primary">{winLossRatio}%</div>
          <div className="rh__stats-secondary">Win%</div>
        </div>
        <div className="rh__stats-box">
          <div className="rh__stats-primary">{data.kd || "0.00"}</div>
          <div className="rh__stats-secondary">K/D</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeader;
