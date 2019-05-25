import React from "react";
import { Nav } from "./";
import "../../static/styles/UserAndNav.scss";

const UserAndNav = () => {
  return (
    <div className="user-and-nav--wrapper">
      <div className="uan__user">
        <h1 className="user__id">xXSARKURDZz</h1>
        <div className="user__platform">PSN</div>
      </div>
      <Nav />
    </div>
  );
};

export default UserAndNav;
