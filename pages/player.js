import React, { useEffect } from "react";
import Router from "next/router";
import { UserAndNav, Loadout, Xur, Divider } from "../src/components";
import "../static/styles/Player.scss";
import { getMembershipID } from "../src/utils/endpoints";
import axios from "axios";
import {
  setError,
  setLoadout,
  setPlayerData,
  setXurData
} from "../src/actions";
import { connect } from "react-redux";
import getBaseUrl from "../src/utils/getBaseUrl";

const player = ({ name, platform, loadout, error, setError }) => {
  useEffect(() => {
    if (error) {
      if (error.response) {
        const { ErrorStatus, Message } = error.response.data;

        setError(true, ErrorStatus, Message);
      } else if (error.ErrorStatus) {
        setError(true, error.ErrorStatus, error.Message);
      } else {
        setError(true);
      }
      Router.push("/");
    }
  }, []);

  return (
    <div className="player--wrapper">
      <UserAndNav name={name} platform={platform} />
      <Xur />
      <Divider />
      <div className="loadouts--wrapper">
        {loadout.map(data => (
          <Loadout key={data.characterId} data={data} name={name} />
        ))}
      </div>
    </div>
  );
};

player.getInitialProps = async ({ query, req, reduxStore }) => {
  const platforms = { psn: 2, xbl: 1, bnet: 4 };
  const BASE_URL = getBaseUrl(req);
  let playerData = reduxStore.getState().player.data;
  try {
    if (!reduxStore.getState().player.xur.isFetched) {
      reduxStore.dispatch(setXurData());
    }

    if (!reduxStore.getState().player.isFetched) {
      const response = await getMembershipID(
        query.name,
        platforms[query.platform]
      );
      if (response.data.ErrorCode !== 1 || response.data.Response.length < 1) {
        throw {
          ErrorStatus: "Guardian Not Found",
          Message: "Battle.net IDs Must Be In This Format, Example: Gladd#11693"
        };
      }

      playerData = response.data.Response[0];
      reduxStore.dispatch(setPlayerData(playerData));
    }

    if (reduxStore.getState().loadout.isFetched) {
      return {
        name: playerData.displayName,
        platform: query.platform
      };
    }

    const { membershipId, membershipType } = playerData;
    const loadoutResponse = await axios.get(
      `${BASE_URL}/api/player?membershipId=${membershipId}&membershipType=${membershipType}`
    );

    if (loadoutResponse.data.success) {
      reduxStore.dispatch(setLoadout(loadoutResponse.data.data));
      return {
        name: playerData.displayName,
        platform: query.platform
      };
    } else {
      throw {
        ErrorStatus: loadoutResponse.data.ErrorStatus,
        Message: loadoutResponse.data.Message
      };
    }
  } catch (error) {
    return {
      error,
      name: query.name,
      platform: query.platform
    };
  }
};

const mapStateToProps = state => ({ loadout: state.loadout.data });
export default connect(
  mapStateToProps,
  { setError, setLoadout }
)(player);
