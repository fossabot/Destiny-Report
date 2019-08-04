import React, { useEffect, Fragment } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import Router from "next/router";
import axios from "axios";

import {
  UserAndNav,
  ActivityHeader,
  CrucibleCard,
  Divider,
  MatchesHistory
} from "../../../../src/components";
import { getMembershipID } from "../../../../src/utils/endpoints";
import {
  setError,
  setCrucibleData,
  setCrucibleMatches,
  setPlayerData
} from "../../../../src/actions";
import getBaseUrl from "../../../../src/utils/getBaseUrl";
import getActivityMatchesHistory from "../../../../src/utils/getActivityMatchesHistory";

const Crucible = ({
  name,
  platform,
  crucibleData,
  crucibleMatches,
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

  if (error) {
    return <div />;
  }

  return (
    <div>
      <Head>
        <title>{name} | Crucible</title>
      </Head>
      <UserAndNav name={name} platform={platform} />
      <ActivityHeader name="OVERALL" data={crucibleData.overall} />
      <Divider />
      <CrucibleCard
        name="QUICK PLAY"
        overall={crucibleData.stats.overallCrucible.quickplay}
        progressionRank={crucibleData.valor}
        modes={crucibleData.stats.overallModesData.quickplay}
      />
      <Divider />
      <CrucibleCard
        name="COMPETITIVE"
        overall={crucibleData.stats.overallCrucible.comp}
        progressionRank={crucibleData.glory}
        modes={crucibleData.stats.overallModesData.comp}
      />
      <Divider />
      <CrucibleCard
        name="IRON BANNER"
        overall={crucibleData.stats.overallCrucible.ironBanner}
        progressionRank={crucibleData.valor}
        modes={crucibleData.stats.overallModesData.ironBanner}
      />
      {crucibleMatches.data.length > 0 && (
        <Fragment>
          <Divider />
          <MatchesHistory matches={crucibleMatches} />
        </Fragment>
      )}
    </div>
  );
};

Crucible.getInitialProps = async ({ query, req, reduxStore }) => {
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
    if (!reduxStore.getState().crucible.matches.isFetched) {
      getActivityMatchesHistory(
        BASE_URL,
        membershipType,
        membershipId,
        "crucible"
      ).then(result => {
        if (result.success) {
          reduxStore.dispatch(setCrucibleMatches(result.data));
        }
      });
    }

    if (reduxStore.getState().crucible.isFetched) {
      return {
        name: playerData.displayName,
        platform: query.platform
      };
    }
    const crucibleDataResponse = await axios.get(
      `${BASE_URL}/api/crucible?membershipId=${membershipId}&membershipType=${membershipType}`
    );

    if (crucibleDataResponse.data.success) {
      reduxStore.dispatch(setCrucibleData(crucibleDataResponse.data.data));
      return {
        BASE_URL,
        name: playerData.displayName,
        platform: query.platform
      };
    } else {
      throw {
        ErrorStatus: crucibleDataResponse.data.ErrorStatus,
        Message: crucibleDataResponse.data.Message
      };
    }
  } catch (error) {
    return {
      error: error.response ? error.response.data : error,
      BASE_URL,
      name: query.name,
      platform: query.platform
    };
  }
};

const mapStateToProps = state => ({
  crucibleData: state.crucible.data,
  crucibleMatches: state.crucible.matches
});

export default connect(
  mapStateToProps,
  { setError }
)(Crucible);
