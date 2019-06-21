import React, { useEffect } from "react";
import {
  UserAndNav,
  GambitHeader,
  Divider,
  MatchesHistory,
  Infamy
} from "../src/components";
import { getMembershipID } from "../src/utils/endpoints";
import { setError, setGambitData, setGambitMatches } from "../src/actions";
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
      setError(true, error.ErrorStatus, error.Message);
      Router.push("/");
    }
  });

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

  try {
    const response = await getMembershipID(
      query.name,
      platforms[query.platform]
    );

    const { membershipId, membershipType } = response.data.Response[0];

    if (response.data.ErrorCode === 1 && response.data.Response.length > 0) {
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

      // console.log("store: ", reduxStore.getState().gambit.isFetched);
      if (reduxStore.getState().gambit.isFetched) {
        return {
          name: response.data.Response[0].displayName,
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
          name: response.data.Response[0].displayName,
          platform: query.platform
        };
      } else {
        throw {
          ErrorStatus: gambitDataResponse.data.ErrorStatus,
          Message: gambitDataResponse.data.Message
        };
      }
    } else {
      throw {
        ErrorStatus: "Guardian Not Found",
        Message: "Battle.net IDs Must Be In This Format, Example: Gladd#11693"
      };
    }
  } catch (error) {
    console.log(error);
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
