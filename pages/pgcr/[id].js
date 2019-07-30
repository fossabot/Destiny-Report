import React, { useEffect, Fragment } from "react";
import Router from "next/router";
import moment from "moment";
import Head from "next/head";
import { connect } from "react-redux";

import { getPGCR, getEntityDefinition } from "../../src/utils/endpoints";
import "../../src/styles/Pgcr.scss";
import { setError } from "../../src/actions";
import { Spacer, Divider } from "../../src/components";

const Pgcr = ({ error, setError, pgcr, activity }) => {
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

  const activityDetails = {
    name: activity && activity.originalDisplayProperties.name,
    difficulty: "Normal"
  };

  if (activity && activity.selectionScreenDisplayProperties) {
    if (
      activity.selectionScreenDisplayProperties === "Normal" ||
      activity.selectionScreenDisplayProperties === "Prestige" ||
      activity.selectionScreenDisplayProperties === "Guided"
    ) {
      activityDetails.difficulty =
        activity.selectionScreenDisplayProperties.name;
    }
  }

  return (
    <div className="pgcr--wrapper">
      <Head>
        <title>PGCR</title>
      </Head>
      {activity && (
        <Fragment>
          <div className="pgcr--activity">
            <div className="pgcr--activity-details">
              <div className="pgcr--activity-details_name">
                {activityDetails.name.toUpperCase()}
              </div>
              {pgcr.activityDetails.mode === 4 && (
                <div className="pgcr--activity-details_type">
                  <div className="pgcr--activity-details_type_diff">
                    {activityDetails.difficulty}
                  </div>
                  <div className="pgcr--activity-details_type_sfi">
                    {pgcr.startingPhaseIndex === 0 ? "Fresh" : "Checkpoint"}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pgcr--players_container">
            {pgcr.activityDetails.mode !== 4 ? (
              <div className="border--info">
                <div className="border--info-won">Won</div>
                <div className="border--info-lost">Lost</div>
                <div className="border--info-quit">Quit</div>
              </div>
            ) : (
              <div className="border--info">
                <div className="border--info-won">Completed</div>
                <div className="border--info-quit">Quit</div>
              </div>
            )}
            <div className="pgcr-date">{moment(pgcr.period).format("LLL")}</div>
            <Spacer height="10px" />
            {pgcr.entries.map((player, index) => {
              if (player.standing === 1) {
                return null;
              }

              let isLost = "";

              if (pgcr.activityDetails.mode === 4) {
                isLost = player.values.completed.basic.value !== 1 && "quit";
              } else {
                isLost =
                  player.values.completed.basic.value !== 1 ? "quit" : "";
              }

              return (
                <div className="pgcr--players" key={index}>
                  <div className={`pgcr--player ${isLost}`}>
                    <div className="pgcr--player-icon">
                      <img
                        src={`https://stats.bungie.net${
                          player.player.destinyUserInfo.iconPath
                        }`}
                        alt="player emblem"
                      />
                    </div>
                    <div className="pgcr--player-details">
                      <div className="pgcr--player-details_gamertag">
                        {player.player.destinyUserInfo.displayName}
                      </div>
                      <div className="pgcr--player-details_class">
                        {player.player.characterClass}
                      </div>
                    </div>
                    <div className="pgcr--player-stats">
                      <div className="pgcr--player-stats-box">
                        <div className="pgcr--player-stats-box_primary">
                          {player.values.kills.basic.value}
                        </div>
                        <div className="pgcr--player-stats-box_secondary">
                          Kills
                        </div>
                      </div>
                      <div className="pgcr--player-stats-box">
                        <div className="pgcr--player-stats-box_primary">
                          {player.values.deaths.basic.value}
                        </div>
                        <div className="pgcr--player-stats-box_secondary">
                          Deaths
                        </div>
                      </div>
                      <div className="pgcr--player-stats-box">
                        <div className="pgcr--player-stats-box_primary">
                          {player.values.timePlayedSeconds.basic.displayValue}
                        </div>
                        <div className="pgcr--player-stats-box_secondary">
                          Time
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {pgcr.activityDetails.mode !== 4 && <Divider />}
            {pgcr.entries.map((player, index) => {
              if (player.standing === 0) {
                return null;
              }

              let isLost = "lost";

              if (pgcr.activityDetails.mode === 4) {
                isLost = player.values.completed.basic.value !== 1 && "quit";
              } else {
                isLost =
                  player.values.completed.basic.value !== 1 ? "quit" : "lost";
              }
              return (
                <div className="pgcr--players" key={index}>
                  <div className={`pgcr--player ${isLost}`}>
                    <div className="pgcr--player-icon">
                      <img
                        src={`https://stats.bungie.net${
                          player.player.destinyUserInfo.iconPath
                        }`}
                        alt="player emblem"
                      />
                    </div>
                    <div className="pgcr--player-details">
                      <div className="pgcr--player-details_gamertag">
                        {player.player.destinyUserInfo.displayName}
                      </div>
                      <div className="pgcr--player-details_class">
                        {player.player.characterClass}
                      </div>
                    </div>
                    <div className="pgcr--player-stats">
                      <div className="pgcr--player-stats-box">
                        <div className="pgcr--player-stats-box_primary">
                          {player.values.kills.basic.value}
                        </div>
                        <div className="pgcr--player-stats-box_secondary">
                          Kills
                        </div>
                      </div>
                      <div className="pgcr--player-stats-box">
                        <div className="pgcr--player-stats-box_primary">
                          {player.values.deaths.basic.value}
                        </div>
                        <div className="pgcr--player-stats-box_secondary">
                          Deaths
                        </div>
                      </div>
                      <div className="pgcr--player-stats-box">
                        <div className="pgcr--player-stats-box_primary">
                          {player.values.timePlayedSeconds.basic.displayValue}
                        </div>
                        <div className="pgcr--player-stats-box_secondary">
                          Time
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Pgcr.getInitialProps = async ({ query }) => {
  try {
    const response = await getPGCR(query.id);

    if (!response.data.Response) {
      throw response.data;
    }
    const {
      data: { Response: activity }
    } = await getEntityDefinition(
      response.data.Response.activityDetails.directorActivityHash,
      "DestinyActivityDefinition"
    );

    return { pgcr: response.data.Response, activity };
  } catch (error) {
    return {
      error
    };
  }
};

export default connect(
  null,
  { setError }
)(Pgcr);
