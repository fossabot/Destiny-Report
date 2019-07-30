import React from "react";
import "../styles/CrucibleCard.scss";
import { ActivityModeCard } from "./";
import getRatio from "../utils/getRatio";
import secondsToDhm from "../utils/secondsToDhm";
import ReactTooltip from "react-tooltip";

const CrucibleCard = ({ name, progressionRank, overall, modes }) => {
  const winLosssRatio = getRatio(overall.matches, overall.wins);

  return (
    <div className="crucible-card__wrapper">
      <div className="crucible-card__headr-container">
        <div className="cruble-card_header">
          <h1 style={{ marginBottom: "0" }}>{name}</h1>
          <div className="crucible-card__hours-played">
            {secondsToDhm(overall.secondsPlayed)}
          </div>
        </div>
        <div className="progression--icon">
          <img src={progressionRank.icon} alt="" />
        </div>
      </div>
      <div className="crucible-card__stats">
        <div className="crucible-card__stats-box crucible-card__stats-img ">
          <div className="progression--info">
            <div className="progression--info__header">
              {progressionRank.name}{" "}
              <span className="color-green" data-tip="Resets">
                {progressionRank.resets}
              </span>
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
            {(overall.kills / (overall.deaths || 1)).toFixed(2) ||
              overall.kills}
          </div>
          <div className="crucible-card__stats-secondary">K/D</div>
        </div>
      </div>
      <div className="crucibe-card__report">
        {Object.keys(modes).map((name, index) => (
          <ActivityModeCard
            key={`${name}-${index}`}
            name={name}
            stats={modes[name]}
          />
        ))}
      </div>
      <ReactTooltip className="tooltip" effect="solid" />
    </div>
  );
};

export default CrucibleCard;
