import React, { useEffect } from "react";
import {
  UserAndNav,
  ActivityHeader,
  CrucibleCard,
  Divider
} from "../src/components";
import { getMembershipID } from "../src/utils/endpoints";
import { setError, setCrucibleData } from "../src/actions";
import { connect } from "react-redux";
import Router from "next/router";
import axios from "axios";
import getBaseUrl from "../src/utils/getBaseUrl";

const Crucible = ({ name, platform, crucibleData, error, setError }) => {
  useEffect(() => {
    if (error) {
      setError(error.ErrorStatus, error.Message);
      Router.push("/");
    }
  });

  return (
    <div>
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
    </div>
  );
};

Crucible.getInitialProps = async ({ query, req, reduxStore }) => {
  const platforms = { psn: 2, xbl: 1, bnet: 4 };
  const BASE_URL = getBaseUrl(req);

  try {
    const response = await getMembershipID(
      query.name,
      platforms[query.platform]
    );

    if (response.data.ErrorCode === 1 && response.data.Response.length > 0) {
      if (reduxStore.getState().crucible.isFetched) {
        return {
          name: response.data.Response[0].displayName,
          platform: query.platform
        };
      }
      const { membershipId, membershipType } = response.data.Response[0];
      const crucibleDataResponse = await axios.get(
        `${BASE_URL}/api/crucible?membershipId=${membershipId}&membershipType=${membershipType}`
      );

      if (crucibleDataResponse.data.success) {
        reduxStore.dispatch(setCrucibleData(crucibleDataResponse.data.data));
        return {
          name: response.data.Response[0].displayName,
          platform: query.platform
        };
      } else {
        throw {
          ErrorStatus: crucibleDataResponse.data.ErrorStatus,
          Message: crucibleDataResponse.data.Message
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
      name: query.name,
      platform: query.platform
    };
  }
};

const mapStateToProps = state => ({ crucibleData: state.crucible.data });

export default connect(
  mapStateToProps,
  { setError }
)(Crucible);
