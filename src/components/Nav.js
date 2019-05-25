import React from "react";
import { Link } from "./";
import "../../static/styles/Nav.scss";

const Nav = () => {
  return (
    <nav className="navbar">
      <Link
        href="/player?name=xXSARKURDZz&platform=psn"
        as="/player/psn/xXSARKURDZz"
        activeClassName="navbar__item-active"
      >
        <a className="navbar__item">Profile</a>
      </Link>

      <Link
        href="/gambit?name=xXSARKURDZz&platform=psn"
        as="/player/psn/xXSARKURDZz/gambit"
        activeClassName="navbar__item-active"
      >
        <a className="navbar__item">Gambit</a>
      </Link>

      <Link
        href="/crucible?name=xXSARKURDZz&platform=psn"
        as="/player/psn/xXSARKURDZz/crucible"
        activeClassName="navbar__item-active"
      >
        <a className="navbar__item">Crucible</a>
      </Link>

      <Link
        href="/raid?name=xXSARKURDZz&platform=psn"
        as="/player/psn/xXSARKURDZz/raid"
        activeClassName="navbar__item-active"
      >
        <a className="navbar__item">Raid</a>
      </Link>
    </nav>
  );
};

export default Nav;
