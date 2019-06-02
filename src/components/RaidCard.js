import React from "react";
import "../../static/styles/RaidCard.scss";

const RaidCard = ({ name, stats }) => {
  return (
    <div className="raid-card--wrapper">
      <h1 className="raid-card__header">SCOURGE OF THE PAST</h1>
      <div className="raid-card__stats">
        <div className="raid-card__stats-box">
          <div className="raid-card__stats-primary">120</div>
          <div className="raid-card__stats-secondary">Raids Played</div>
        </div>
        <div className="raid-card__stats-box">
          <div className="raid-card__stats-primary">83</div>
          <div className="raid-card__stats-secondary">Normal</div>
        </div>
        <div className="raid-card__stats-box">
          <div className="raid-card__stats-primary">20</div>
          <div className="raid-card__stats-secondary">Guided</div>
        </div>
        <div className="raid-card__stats-box">
          <div className="raid-card__stats-primary">23</div>
          <div className="raid-card__stats-secondary">Prestige</div>
        </div>
      </div>
      <div className="raid-card__badges">
        <div
          className="raid-card__badges-text"
          data-tip="Completed the raid within 24 hours"
        >
          Day One
        </div>
        <div
          className="raid-card__badges-text"
          data-tip="Completed the raid within 24 hours"
        >
          Day One
        </div>
        <div
          className="raid-card__badges-text"
          data-tip="Completed the raid within 24 hours"
        >
          Day One
        </div>
        <div
          className="raid-card__badges-text"
          data-tip="Completed the raid within 24 hours"
        >
          Day One
        </div>
        <div
          className="raid-card__badges-text"
          data-tip="Completed the raid within 24 hours"
        >
          Day One
        </div>
      </div>
    </div>
  );
};

export default RaidCard;
