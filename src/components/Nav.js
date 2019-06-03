import React, { useContext } from "react";
import { Link } from "./";
import "../../static/styles/Nav.scss";

const Nav = ({ name, platform }) => {
  return (
    <nav className="navbar">
      <Link
        href={`/player?name=${name}&platform=${platform}`}
        as={`/player/${platform}/${name}`}
        activeClassName="navbar__item-active"
      >
        <a className="navbar__item">Profile</a>
      </Link>

      <Link
        href={`/gambit?name=${name}&platform=${platform}`}
        as={`/player/${platform}/${name}/gambit`}
        activeClassName="navbar__item-active"
      >
        <a className="navbar__item">Gambit</a>
      </Link>

      <Link
        href={`/crucible?name=${name}&platform=${platform}`}
        as={`/player/${platform}/${name}/crucible`}
        activeClassName="navbar__item-active"
      >
        <a className="navbar__item">Crucible</a>
      </Link>

      <Link
        href={`/raid?name=${name}&platform=${platform}`}
        as={`/player/${platform}/${name}/raid`}
        activeClassName="navbar__item-active"
      >
        <a className="navbar__item">Raid</a>
      </Link>
    </nav>
  );
};

export default Nav;
