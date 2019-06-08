import React, { useEffect } from "react";
import Router from "next/router";
import { UserAndNav, Loadout } from "../src/components";
import "../static/styles/Player.scss";
import { getMembershipID } from "../src/utils/endpoints";
import axios from "axios";
import { setLoader, setError } from "../src/actions";
import { connect } from "react-redux";

const player = ({ name, platform, loadout, error, setError }) => {
  useEffect(() => {
    if (error) {
      setError(error.ErrorStatus, error.Message);
      Router.push("/");
    }
  });

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

player.getInitialProps = async ({ query, reduxStore }) => {
  reduxStore.dispatch(setLoader(true));
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
      reduxStore.dispatch(setLoader(false));

      if (loadoutResponse.data.success) {
        return {
          loadout: loadoutResponse.data.data,
          name: response.data.Response[0].displayName,
          platform: query.platform
        };
      } else {
        throw {
          ErrorStatus: loadoutResponse.data.ErrorStatus,
          Message: loadoutResponse.data.Message
        };
      }
    } else {
      throw {
        ErrorStatus: "Guardian Not Found",
        Message: "Battle.net IDs Must Be In This Format, Example: Gladd#11693"
      };
    }
  } catch (error) {
    return {
      loadout: [],
      error,
      name: query.name,
      platform: query.platform
    };
  }
};
export default connect(
  null,
  { setLoader, setError }
)(player);
