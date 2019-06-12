import React from "react";
import "../../static/styles/CrucibleCard.scss";
import { ActivityModeCard } from "./";
import getRatio from "../utils/getRatio";
import secondsToDhm from "../utils/secondsToDhm";

const CrucibleCard = ({ name, progressionRank, overall, modes }) => {
  const winLosssRatio = getRatio(overall.matches, overall.wins);

  return (
    <div className="crucible-card__wrapper">
      <h1>{name}</h1>
      <div className="crucible-card__stats">
        <div className="crucible-card__stats-box crucible-card__stats-img ">
          <div className="progression--icon">
            <img src={progressionRank.icon} alt="" />
          </div>
          <div className="progression--info">
            <div className="progression--info__header">
              {progressionRank.name}
            </div>
            <div className="progression--info__rank">
              {progressionRank.stepName}
            </div>
            <div className="progression--info__rank">
              {progressionRank.currentPoints}
            </div>
          </div>
        </div>
        <div className="crucible-card__stats-box">
          <div className="crucible-card__stats-primary">{overall.matches}</div>
          <div className="crucible-card__stats-secondary">Matches</div>
        </div>
        <div className="crucible-card__stats-box">
          <div className="crucible-card__stats-primary">
            <span className="color-green">{overall.wins}</span> -{" "}
            <span className="color-red">{overall.matches - overall.wins}</span>
          </div>
          <div className="crucible-card__stats-secondary">Win - Loss</div>
        </div>
        <div className="crucible-card__stats-box">
          <div className="crucible-card__stats-primary">{winLosssRatio}%</div>
          <div className="crucible-card__stats-secondary">Win Ratio</div>
        </div>
        <div className="crucible-card__stats-box">
          <div className="crucible-card__stats-primary">
            {secondsToDhm(overall.secondsPlayed)}
          </div>
          <div className="crucible-card__stats-secondary">Time Played</div>
        </div>
      </div>
      <div className="crucibe-card__report">
        {Object.keys(modes).map(name => (
          <ActivityModeCard name={name} stats={modes[name]} />
        ))}
      </div>
    </div>
  );
};

export default CrucibleCard;
