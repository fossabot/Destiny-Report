import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const navBar = props => {
  let displayName = "";
  if (props.player.activeMembership !== -1) {
    displayName =
      props.player.memberships[props.player.activeMembership].displayName;
  }
  return (
    <div className="navbar">
      <h2 className="navbar--home-item">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to={`/gambit/${displayName}`} className="link">
          Gambit
        </Link>
        <Link to={`/crucible/${displayName}`} className="link">
          Crucible
        </Link>
        <Link to={`/raid/${displayName}`} className="link">
          Raid
        </Link>
      </h2>
    </div>
  );
};

const mapStoreToProps = store => {
  return {
    player: store.player
  };
};

export default connect(mapStoreToProps)(navBar);
