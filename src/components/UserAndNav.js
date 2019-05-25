import React from "react";
import { Nav } from "./";
import "../../static/styles/UserAndNav.scss";

const UserAndNav = () => {
  return (
    <div className="user-and-nav--wrapper">
      <div className="uan__user__nav">
        <h1 className="user__id">xXSARKURDZz</h1>
        <Nav />
      </div>
      <div className="user__platform">PSN</div>
    </div>
  );
};

export default UserAndNav;
