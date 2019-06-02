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
        {loadout.map(data => (
          <Loadout key={data.characterId} data={data} name={name} />
        ))}
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
      const loadoutResponse = await axios.get(
        `${BASE_URL}/api/player?membershipId=${membershipId}&membershipType=${membershipType}`
      );

      if (loadoutResponse.data.success) {
        return {
          loadout: loadoutResponse.data.data,
          name: response.data.Response[0].displayName,
          platform: query.platform
        };
      } else {
        throw new Error(
          JSON.stringify({
            ErrorStatus: loadoutResponse.data.ErrorStatus,
            Message: loadoutResponse.data.Message
          })
        );
      }
    } else {
      throw new Error(
        JSON.stringify({
          ErrorStatus: "Guardian Not Found",
          Message: "Battle.net IDs Must Be In This Format, Example: Gladd#11693"
        })
      );
    }
  } catch (error) {
    console.log(error);
    let err = {
      ErrorStatus: "Something Went Wrong Or Bungie API Is Down",
      Message: "Please Try Again Later"
    };
    try {
      err = JSON.parse(error.message);
    } catch (err) {
      console.log(err);
    } finally {
      if (res) {
        res.writeHead(302, {
          Location: `/?error=${err.ErrorStatus}&message=${err.Message}`
        });
        res.end();
        return;
      } else {
        Router.push(`/?error=${err.ErrorStatus}&message=${err.Message}`, "/");
      }
    }
  }
  return { loadout: [], name: null, platform: null };
};
export default player;
