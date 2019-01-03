import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ProgressBar from "./ProgressBar";

class NavBar extends React.Component {
  showProgressBarToggle = value => {
    this.setState({ showProgressBar: value });
  };

  render() {
    const path = this.props.location.pathname;
    let showProgressBar = true;
    const {
      isApiLoading,
      gambitIsLoading,
      crucibleIsLoading,
      raidIsLoading
    } = this.props.player;
    if (
      (path.includes("raid") && (isApiLoading || raidIsLoading)) ||
      (path.includes("crucible") && crucibleIsLoading) ||
      ((path.includes("gambit") || path === "/") && gambitIsLoading)
    ) {
      if (showProgressBar !== true) {
        showProgressBar = true;
      }
    } else {
      if (showProgressBar !== false) {
        showProgressBar = false;
      }
    }

    let displayName = this.props.location.pathname.split("/")[2];
    if (displayName === "") {
      if (
        this.props.player.activeMembership !== -1 &&
        this.props.player.memberships.length !== 0
      ) {
        displayName = this.props.player.memberships[
          this.props.player.activeMembership
        ].displayName;
      }
    }
    const linkHide = path === "/" || path.includes("pgcr") ? "link--hide" : "";

    let { error, privacyError, errorMessage } = this.props.player;

    if (privacyError) {
      errorMessage =
        "Due to player's privacy, you can't see most of his/her stats";
    }
    const ErrorBlock = <div className="api-issue">{errorMessage}</div>;

    return (
      <div className="navbar-wrapper">
        <div className="navbar">
          <ul className="navbar--home-item">
            <li>
              <NavLink exact to="/" className="link" replace={path === "/"}>
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
          {/* <div className="navbar--addon">Add-on</div> */}
        </div>
        {showProgressBar && <ProgressBar />}
        {(error || privacyError) && ErrorBlock}
      </div>
    );
  }
}

const mapStoreToProps = store => {
  return {
    player: store.player
  };
};

export default withRouter(connect(mapStoreToProps)(NavBar));
