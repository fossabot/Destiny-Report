import React from "react";
import { UserAndNav, Loadout } from "../src/components";
import "../static/styles/Player.scss";

const player = ({ name, platform }) => {
  return (
    <div className="player--wrapper">
      <UserAndNav name={name} platform={platform} />
      <main className="loadouts--wrapper">
        <Loadout />
        <Loadout />
        <Loadout />
      </main>
    </div>
  );
};

player.getInitialProps = ({ query }) => {
  return { name: query.name, platform: query.platform };
};
export default player;
