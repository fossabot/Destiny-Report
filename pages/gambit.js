import React, { useEffect } from "react";
import {
  UserAndNav,
  GambitHeader,
  Divider,
  MatchesHistory,
  Infamy
} from "../src/components";
import { getMembershipID } from "../src/utils/endpoints";
import {
  setError,
  setGambitData,
  setGambitMatches,
  setPlayerData
} from "../src/actions";
import { connect } from "react-redux";
import Router from "next/router";
import axios from "axios";
import getBaseUrl from "../src/utils/getBaseUrl";
import getActivityMatchesHistory from "../src/utils/getActivityMatchesHistory";

const Gambit = ({
  name,
  platform,
  gambitData,
  gambitMatches,
  error,
  setError
}) => {
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
    <div className="gambit--wrapper" style={{ height: "100%" }}>
      <UserAndNav name={name} platform={platform} />
      <GambitHeader data={gambitData.overall} />
      <Infamy data={gambitData.infamy} />
      <Divider />
      <GambitHeader data={gambitData.gambit} name="GAMBIT" />
      <Divider />
      <GambitHeader data={gambitData.gPrime} name="G. PRIME" />
      <Divider />
      <MatchesHistory matches={gambitMatches} />
    </div>
  );
};

Gambit.getInitialProps = async ({ query, req, reduxStore }) => {
  const platforms = { psn: 2, xbl: 1, bnet: 4 };
  const BASE_URL = getBaseUrl(req);

  let playerData = reduxStore.getState().player.data;

  try {
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

    const { membershipId, membershipType } = playerData;

    //getActivityHistory
    if (!reduxStore.getState().gambit.matches.isFetched) {
      getActivityMatchesHistory(
        BASE_URL,
        membershipType,
        membershipId,
        "gambit"
      ).then(result => {
        if (result.success) {
          reduxStore.dispatch(setGambitMatches(result.data));
        }
      });
    }

    if (reduxStore.getState().gambit.isFetched) {
      return {
        name: playerData.displayName,
        platform: query.platform
      };
    }
    const gambitDataResponse = await axios.get(
      `${BASE_URL}/api/gambit?membershipId=${membershipId}&membershipType=${membershipType}`
    );

    if (gambitDataResponse.data.success) {
      reduxStore.dispatch(setGambitData(gambitDataResponse.data.data));
      return {
        BASE_URL,
        name: playerData.displayName,
        platform: query.platform
      };
    } else {
      throw {
        ErrorStatus: gambitDataResponse.data.ErrorStatus,
        Message: gambitDataResponse.data.Message
      };
    }
  } catch (error) {
    return {
      error,
      BASE_URL,
      name: query.name,
      platform: query.platform
    };
  }
};

const mapStateToProps = state => ({
  gambitData: state.gambit.data,
  gambitMatches: state.gambit.matches
});

export default connect(
  mapStateToProps,
  { setError }
)(Gambit);
