import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const navBar = props => {
  let displayName = props.location.pathname.split("/")[2];
  if (displayName === "") {
    if (
      props.player.activeMembership !== -1 &&
      props.player.memberships.length !== 0
    ) {
      displayName =
        props.player.memberships[props.player.activeMembership].displayName;
    }
  }
  const path = props.location.pathname;
  const linkHide = path === "/" ? "link--hide" : "";

  const { error } = props.player;
  const apiMaintenance = (
    <div className="api-issue">
      Bungie API is having issues at this moment, please try again later
    </div>
  );

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <h2 className="navbar--home-item">
          <Link to="/" className="link" replace={path === "/"}>
            Home
          </Link>
          <Link
            to={`/gambit/${displayName}`}
            className={`link ${linkHide}`}
            replace={path === `/gambit/${displayName}`}
          >
            Gambit
          </Link>
          <Link
            to={`/crucible/${displayName}`}
            className={`link ${linkHide}`}
            replace={path === `/crucible/${displayName}`}
          >
            Crucible
          </Link>
          <Link
            to={`/raid/${displayName}`}
            className={`link ${linkHide}`}
            replace={path === `/raid/${displayName}`}
          >
            Raid
          </Link>
        </h2>
      </div>
      {error && apiMaintenance}
    </div>
  );
};

const mapStoreToProps = store => {
  return {
    player: store.player
  };
};

export default withRouter(connect(mapStoreToProps)(navBar));
