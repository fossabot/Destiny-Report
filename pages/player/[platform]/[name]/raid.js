import React, { useEffect } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import Router from "next/router";
import axios from "axios";

import {
  UserAndNav,
  RaidOverallHeader,
  RaidCard,
  Divider,
  Spacer
} from "../../../../src/components";
import { getMembershipID } from "../../../../src/utils/endpoints";
import {
  setRaidData,
  updateRaidBadges,
  failUpdateRaidBadges,
  setError,
  setRaidBadges,
  setPlayerData,
  setRaidActivitiesPlayed
} from "../../../../src/actions";
import getBaseUrl from "../../../../src/utils/getBaseUrl";
import "../../../../src/styles/Raid.scss";

const Raid = ({
  name,
  platform,
  BASE_URL,
  membershipId,
  membershipType,
  error,
  raidData,
  updateRaidBadges,
  failUpdateRaidBadges,
  setRaidActivitiesPlayed,
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
    } else {
      const updateBadgesHandler = () => {
        axios
          .get(
            `${BASE_URL}/api/raid/updateBadges?membershipId=${membershipId}&membershipType=${membershipType}`
          )
          .then(updatedBadges => {
            if (updatedBadges.status === 524) {
              failUpdateRaidBadges();
            } else {
              if (updatedBadges.data.data) {
                updateRaidBadges(updatedBadges.data.data);
              }
            }
          })
          .catch(err => {
            failUpdateRaidBadges();
          });
      };

      if (!raidData.isUpdated) {
        updateBadgesHandler();
      }

      if (!raidData.activities.isFetched) {
        setRaidActivitiesPlayed(membershipId, membershipType);
      }
    }
  }, []);

  if (error) {
    return <div />;
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <Head>
        <title>{name} | Raid</title>
        <meta name="description" content={`${name}'s Raid stats and badges`} />
      </Head>

      <UserAndNav name={name} platform={platform} />
      {raidData.isFetched && (
        <React.Fragment>
          <RaidOverallHeader
            data={{
              clears: raidData.data.clears,
              timePlayed: raidData.data.combinedTimePlayed
            }}
          />
          <Spacer height="40px" />
          <RaidCard
            name="CROWN OF SORROW"
            stats={raidData.data.CoS}
            badges={raidData.badges.data && raidData.badges.data.CoS}
            activitiesPlayed={raidData.activities.data.CoS}
          />
          <Divider />
          <RaidCard
            name="SCOURGE OF THE PAST"
            stats={raidData.data.SotP}
            badges={raidData.badges.data && raidData.badges.data.SotP}
            activitiesPlayed={raidData.activities.data.SotP}
          />
          <Divider />
          <RaidCard
            name="LAST WISH"
            stats={raidData.data.lastWish}
            badges={raidData.badges.data && raidData.badges.data.lastWish}
            activitiesPlayed={raidData.activities.data.lastWish}
          />
          <Divider />
          <RaidCard
            name="SPIRE OF STARS"
            stats={raidData.data.SoS}
            badges={raidData.badges.data && raidData.badges.data.SoS}
            activitiesPlayed={raidData.activities.data.SoS}
            isPrestige={true}
          />
          <Divider />
          <RaidCard
            name="EATER OF WORLDS"
            stats={raidData.data.EoW}
            badges={raidData.badges.data && raidData.badges.data.EoW}
            activitiesPlayed={raidData.activities.data.EoW}
            isPrestige={true}
          />
          <Divider />
          <RaidCard
            name="LEVIATHAN"
            stats={raidData.data.leviathan}
            badges={raidData.badges.data && raidData.badges.data.leviathan}
            activitiesPlayed={raidData.activities.data.leviathan}
            isPrestige={true}
          />
        </React.Fragment>
      )}
      {!raidData.isUpdated && (
        <div className="raid--update_modal">Updating Raid Badges...</div>
      )}
      {raidData.isUpdateFailed && (
        <div className="raid--update_modal-error">
          You have Played Too Many Raid Activites Which Takes Longer To Process
          All Of Them Or Something Went Wrong
          <div className="color-red">
            Please Refresh Your Browser After A Few Minutes
          </div>
        </div>
      )}
    </div>
  );
};

Raid.getInitialProps = async ({ query, reduxStore, req }) => {
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

    if (
      reduxStore.getState().raid.isFetched &&
      reduxStore.getState().raid.badges.isFetched
    ) {
      return {
        BASE_URL,
        name: playerData.displayName,
        platform: query.platform
      };
    }

    const raidDataResponse = await axios.get(
      `${BASE_URL}/api/raid?membershipId=${membershipId}&membershipType=${membershipType}`
    );
    const raidBadgesResponse = await axios.get(
      `${BASE_URL}/api/raid/getBadges?membershipId=${membershipId}&membershipType=${membershipType}`
    );

    if (raidDataResponse.data.success) {
      reduxStore.dispatch(setRaidData(raidDataResponse.data.data));
      reduxStore.dispatch(setRaidBadges(raidBadgesResponse.data.data));
      return {
        BASE_URL,
        membershipId,
        membershipType,
        name: playerData.displayName,
        platform: query.platform
      };
    } else {
      throw {
        ErrorStatus: raidDataResponse.data.ErrorStatus,
        Message: raidDataResponse.data.Message
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
  raidData: state.raid
});

export default connect(
  mapStateToProps,
  { setError, updateRaidBadges, failUpdateRaidBadges, setRaidActivitiesPlayed }
)(Raid);
