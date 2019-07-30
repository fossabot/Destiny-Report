import React from "react";
import "../styles/Infamy.scss";

const Infamy = ({ data }) => {
  return (
    <div className="infamy--wrapper">
      <div className="infamy-icon__container">
        <img className="infamy-icon" src={`${data.icon}`} alt="infamy icon" />
      </div>
      <div className="infamy__progression">
        <div className="infamy__progression-box">
          <div className="infamy__progression-primary">{data.stepName}</div>
          <div className="infamy__progression-secondary">Step</div>
        </div>
        <div className="infamy__progression-box">
          <div className="infamy__progression-primary">
            {data.currentPoints}
          </div>
          <div className="infamy__progression-secondary">current</div>
        </div>
        <div className="infamy__progression-box">
          <div className="infamy__progression-primary">{data.rank}</div>
          <div className="infamy__progression-secondary">Rank</div>
        </div>
        <div className="infamy__progression-box">
          <div className="infamy__progression-primary">{data.resets}</div>
          <div className="infamy__progression-secondary">Resets</div>
        </div>
      </div>
    </div>
  );
};

export default Infamy;
