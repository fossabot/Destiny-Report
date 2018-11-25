import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const navBar = (props) => {
  let displayName = "";
  if (
    props.player.activeMembership !== -1 &&
    props.player.memberships.length !== 0
  ) {
    displayName =
      props.player.memberships[props.player.activeMembership].displayName;
  }

  const path = props.location.pathname;

  return (
    <div className="navbar">
      <h2 className="navbar--home-item">
        <Link to="/" className="link" replace={path === "/"}>
          Home
        </Link>
        <Link
          to={`/gambit/${displayName}`}
          className="link"
          replace={path === `/gambit/${displayName}`}
        >
          Gambit
        </Link>
        <Link
          to={`/crucible/${displayName}`}
          className="link"
          replace={path === `/crucible/${displayName}`}
        >
          Crucible
        </Link>
        <Link
          to={`/raid/${displayName}`}
          className="link"
          replace={path === `/raid/${displayName}`}
        >
          Raid
        </Link>
      </h2>
    </div>
  );
};

const mapStoreToProps = (store) => {
  return {
    player: store.player
  };
};

export default withRouter(connect(mapStoreToProps)(navBar));
