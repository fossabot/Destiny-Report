import React from "react";
import { NavLink, withRouter } from "react-router-dom";
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

  const { error, privacyError } = props.player;
  let errorMessage = "Bungie API returned an error, please try again later";
  if (privacyError) {
    errorMessage =
      "Due to player's privacy, you can't see most of his/her stats";
  }
  const apiMaintenance = <div className="api-issue">{errorMessage}</div>;

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <ul className="navbar--home-item">
          <li>
            <NavLink
              exact
              to="/"
              activeClassName="link-active"
              className="link"
              replace={path === "/"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/gambit/${displayName}`}
              activeClassName="link-active"
              className={`link ${linkHide}`}
              replace={path === `/gambit/${displayName}`}
            >
              Gambit
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/crucible/${displayName}`}
              activeClassName="link-active"
              className={`link ${linkHide}`}
              replace={path === `/crucible/${displayName}`}
            >
              Crucible
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/raid/${displayName}`}
              activeClassName="link-active"
              className={`link ${linkHide}`}
              replace={path === `/raid/${displayName}`}
            >
              Raid
            </NavLink>
          </li>
        </ul>
      </div>
      {(error || privacyError) && apiMaintenance}
    </div>
  );
};

const mapStoreToProps = store => {
  return {
    player: store.player
  };
};

export default withRouter(connect(mapStoreToProps)(navBar));
