import React, { useContext } from "react";
import { Nav } from "./";
import "../../static/styles/UserAndNav.scss";

const UserAndNav = ({ name, platform }) => {
  return (
    <div className="user-and-nav--wrapper">
      <div className="uan__user__nav">
        <h1 className="user__id">{name}</h1>
        <Nav />
      </div>
      <div className="user__platform">{platform.toUpperCase()}</div>
    </div>
  );
};

export default UserAndNav;
