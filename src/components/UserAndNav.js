import React, { useContext } from "react";
import { Nav } from "./";
import "../../static/styles/UserAndNav.scss";

const UserAndNav = ({ name, platform }) => {
  return (
    <div className="user-and-nav--wrapper">
      <div className="uan__user__nav">
        <h1 className="user__id">{name}</h1>
        <Nav
          name={encodeURIComponent(name)}
          platform={platform}
          className="top-nav"
        />
      </div>
      <div className="user-nav-platform">
        <div className="user__platform">{platform.toUpperCase()}</div>
        <Nav
          name={encodeURIComponent(name)}
          platform={platform}
          className="bottom-nav"
        />
      </div>
    </div>
  );
};

export default UserAndNav;
