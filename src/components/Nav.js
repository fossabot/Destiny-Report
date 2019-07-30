import React, { useContext } from "react";
import { Link } from "./";
import "../styles/Nav.scss";

const Nav = ({ name, platform, className }) => {
  return (
    <nav className={`navbar ${className}`}>
      <Link
        href={`/player/[platform]/[name]`}
        as={`/player/${platform}/${name}`}
        activeClassName="navbar__item-active"
        prefetch={false}
      >
        <a className="navbar__item">Profile</a>
      </Link>

      <Link
        href={`/player/[platform]/[name]/gambit`}
        as={`/player/${platform}/${name}/gambit`}
        activeClassName="navbar__item-active"
        prefetch={false}
      >
        <a className="navbar__item">Gambit</a>
      </Link>

      <Link
        href={`/player/[platform]/[name]/crucible`}
        as={`/player/${platform}/${name}/crucible`}
        activeClassName="navbar__item-active"
        prefetch={false}
      >
        <a className="navbar__item">Crucible</a>
      </Link>

      <Link
        href={`/player/[platform]/[name]/raid`}
        as={`/player/${platform}/${name}/raid`}
        activeClassName="navbar__item-active"
        prefetch={false}
      >
        <a className="navbar__item">Raid</a>
      </Link>
    </nav>
  );
};

export default Nav;
