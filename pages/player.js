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
  const BASE_URL =
    process.env.NODE_ENV !== "development"
      ? "https://destiny-report.sarkurd.now.sh"
      : "http://localhost:3000";

  try {
    const response = await getMembershipID(
      query.name,
      platforms[query.platform]
    );

    if (response.data.ErrorCode === 1 && response.data.Response.length > 0) {
      const { membershipId, membershipType } = response.data.Response[0];
      const { data: loadout } = await axios.get(
        `${BASE_URL}/api/player?membershipId=${membershipId}&membershipType=${membershipType}`
      );

      return {
        loadout,
        name: response.data.Response[0].displayName,
        platform: query.platform
      };
    } else {
      throw new Error("not found");
    }
  } catch (err) {
    if (err.message === "not found") {
      if (res) {
        res.writeHead(302, { Location: "/?error=1" });
        res.end();
        return;
      } else {
        Router.push(`/?error=1`, "/");
      }
    } else {
      if (res) {
        res.writeHead(302, { Location: "/?error=2" });
        res.end();
        return;
      } else {
        Router.push(`/?error=2`, "/");
      }
    }
  }
  return {};
};
export default player;
