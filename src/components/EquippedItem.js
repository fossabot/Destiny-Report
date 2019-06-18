import React from "react";
import "../../static/styles/EquippedItem.scss";

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
              <img src={`https://www.bungie.net${perk.icon}`} alt="perk icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipedItem;
