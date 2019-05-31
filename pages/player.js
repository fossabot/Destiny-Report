import React from "react";
import Router from "next/router";
import { UserAndNav, Loadout } from "../src/components";
import "../static/styles/Player.scss";

import { getMembershipID } from "../src/utils/endpoints";
import axios from "axios";

const player = ({ name, platform, loadout }) => {
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

player.getInitialProps = async ({ query, res }) => {
  const platforms = { psn: 2, xbl: 1, bnet: 4 };
  try {
    const response = await getMembershipID(
      query.name,
      platforms[query.platform]
    );

    if (response.data.ErrorCode === 1 && response.data.Response.length > 0) {
      const { membershipId, membershipType } = response.data.Response[0];
      const { data: loadout } = await axios.get(
        `http://localhost:3000/api/player?membershipId=${membershipId}&membershipType=${membershipType}`
      );

      return {
        loadout,
        name: response.data.Response[0].displayName,
        platform: query.platform
      };
    } else {
      throw new Error("notfound");
    }
  } catch (err) {
    if (res) {
      res.writeHead(302, { Location: "/?error=notfound" });
      res.end();
      return;
    } else {
      Router.push(`/?error=notfound`, "/");
    }
  }
};
export default player;
