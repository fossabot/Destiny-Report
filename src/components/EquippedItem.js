import React from "react";
import "../../static/styles/EquippedItem.scss";
import ReactTooltip from "react-tooltip";

const EquipedItem = ({ icon, name, category, perks = [] }) => {
  return (
    <div className="et--container">
      <div className="et__icon">
        <img src={icon} alt="equipped item" />
      </div>
      <div className="et__description">
        <div className="et__name">{name}</div>
        <div className="et__category">{category}</div>
        <div className="et__perks">
          {perks.map((perk, index) => (
            <div className="et__perk-icon" key={index}>
              <img src={perk.icon} alt="perk icon" data-tip={perk.name} />
              <ReactTooltip className="tooltip" effect="solid" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipedItem;
