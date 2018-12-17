import React from "react";
import { connect } from "react-redux";

const MultiMembershipPopup = props => {
  return (
    <div className="multi_membership_popup">
      <ul className="membershipsUL">
        {props.player.memberships.map((elem, index) => {
          let platform = "";
          if (elem.membershipType === 2) {
            platform = "fab fa-playstation membershipLi";
            platform += " psn";
          } else if (elem.membershipType === 1) {
            platform = "fab fa-xbox membershipLi";
            platform += " xbox";
          } else {
            platform = "fas fa-desktop membershipLi";
            platform += " pc";
          }
          return (
            <li
              key={index}
              value={index}
              onClick={props.handleMembershipType}
              className={`${platform}`}
            >
              {" "}
              {elem.displayName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStoreToProps = store => {
  return {
    player: store.player
  };
};

export default connect(mapStoreToProps)(MultiMembershipPopup);
