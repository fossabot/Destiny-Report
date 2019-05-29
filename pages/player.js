import React from "react";
import { UserAndNav, Loadout } from "../src/components";
import "../static/styles/Player.scss";

const player = ({ name, platform }) => {
  return (
    <div className="player--wrapper">
      <UserAndNav name={name} platform={platform} />
      <div className="loadouts--wrapper">
        <Loadout />
        <Loadout />
        <Loadout />
      </div>
    </div>
  );
};

player.getInitialProps = ({ query }) => {
  return { name: query.name, platform: query.platform };
};
export default player;
