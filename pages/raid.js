import React, { useEffect } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import axios from "axios";
import {
  UserAndNav,
  RaidOverallHeader,
  RaidCard,
  Divider,
  Spacer
} from "../src/components";
import { getMembershipID } from "../src/utils/endpoints";
import {
  setRaidData,
  updateRaidBadges,
  failUpdateRaidBadges,
  setError,
  setRaidBadges,
  setPlayerData
} from "../src/actions";
import getBaseUrl from "../src/utils/getBaseUrl";
import "../static/styles/Raid.scss";

const Raid = ({
  name,
  platform,
  BASE_URL,
  membershipId,
  membershipType,
  error,
  raidData,
  updateRaidBadges,
  failUpdateRaidBadges
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
          console.log(err);
        });
    };

    if (!raidData.isUpdated) {
      updateBadgesHandler();
    }
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
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
            stats={raidData.data.CoS}
            badges={raidData.badges.data && raidData.badges.data.CoS}
            name="CROWN OF SORROW"
          />
          <Divider />
          <RaidCard
            stats={raidData.data.SotP}
            badges={raidData.badges.data && raidData.badges.data.SotP}
            name="SCOURGE OF THE PAST"
          />
          <Divider />
          <RaidCard
            stats={raidData.data.lastWish}
            badges={raidData.badges.data && raidData.badges.data.lastWish}
            name="LAST WISH"
          />
          <Divider />
          <RaidCard
            stats={raidData.data.SoS}
            badges={raidData.badges.data && raidData.badges.data.SoS}
            name="SPIRE OF STARS"
            isPrestige={true}
          />
          <Divider />
          <RaidCard
            stats={raidData.data.EoW}
            badges={raidData.badges.data && raidData.badges.data.EoW}
            name="EATER OF WORLDS"
            isPrestige={true}
          />
          <Divider />
          <RaidCard
            stats={raidData.data.leviathan}
            badges={raidData.badges.data && raidData.badges.data.leviathan}
            name="LEVIATHAN"
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
          All Of Them
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
      error,
      BASE_URL,
      membershipId,
      membershipType,
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
  { setError, updateRaidBadges, failUpdateRaidBadges }
)(Raid);
