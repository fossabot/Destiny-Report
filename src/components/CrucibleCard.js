import React from "react";
import "../../static/styles/CrucibleCard.scss";
import { ActivityModeCard } from "./";

const CrucibleCard = ({ name }) => {
  return (
    <div className="crucible-card__wrapper">
      <h1>{name}</h1>
      <div className="crucible-card__stats">
        <div className="crucible-card__stats-box crucible-card__stats-img ">
          <img
            src="https://www.bungie.net/common/destiny2_content/icons/d0cf2b35891cd4f07a355af2af568221.png"
            alt=""
          />
        </div>
        <div className="crucible-card__stats-box">
          <div className="crucible-card__stats-primary">2020</div>
          <div className="crucible-card__stats-secondary">Matches</div>
        </div>
        <div className="crucible-card__stats-box">
          <div className="crucible-card__stats-primary">
            <span className="color-green">1200</span> -{" "}
            <span className="color-red">1200</span>
          </div>
          <div className="crucible-card__stats-secondary">Win - Loss</div>
        </div>
        <div className="crucible-card__stats-box">
          <div className="crucible-card__stats-primary">100%</div>
          <div className="crucible-card__stats-secondary">Win Ratio</div>
        </div>
        <div className="crucible-card__stats-box">
          <div className="crucible-card__stats-primary">1350h</div>
          <div className="crucible-card__stats-secondary">Hours</div>
        </div>
      </div>
      <div className="crucibe-card__report">
        <ActivityModeCard />
      </div>
    </div>
  );
};

export default CrucibleCard;
