import React, { useEffect, useState } from "react";
import "../../static/styles/ActivityMatch.scss";
import { getEntityDefinition } from "../utils/endpoints";
import activityTypeModes from "../utils/activityTypeModes";
import moment from "moment";

const ActivityMatch = ({ data }) => {
  const { values, activityDetails: details, period } = data;
  const [activityDef, setActivityDef] = useState({
    mode: "Loading",
    loaction: "Loading",
    icon: "/common/destiny2_content/icons/1c17984345f393e728dc8d2b898eca66.png"
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: locationResult } = await getEntityDefinition(
        details.referenceId,
        "DestinyActivityDefinition"
      );

      const now = moment(new Date());
      const p = moment(period);

      setActivityDef({
        name: activityTypeModes[details.mode].name,
        location: locationResult.Response.displayProperties.name,
        icon: activityTypeModes[details.mode].icon,
        date: moment
          .duration(now.diff(p))
          .asDays()
          .toFixed(0)
      });
    };
    fetchData();
  }, []);

  const am = "activity-match";

  const standing = values.standing.basic.value;

  return (
    <div
      className={`${am}__wrapper ${
        standing === 1 ? "lost" : standing === 2 && "tied"
      }`}
    >
      <div className={`${am}__mode-info`}>
        <div className={`${am}__image`}>
          <img src={`${activityDef.icon}`} alt="mode icon" />
        </div>
        <div className={`${am}__name-location`}>
          <div className={`${am}__name`}>{activityDef.name}</div>
          <div className={`${am}__location`}>{activityDef.location}</div>
          <div className={`${am}__location`}>{activityDef.date} days ago</div>
        </div>
      </div>

      <div className={`${am}__stat-container`}>
        <div className={`${am}__stat`}>
          <div className={`${am}__stat-value`}>{values.kills.basic.value}</div>
          <div className={`${am}__stat-name`}>Kills</div>
        </div>
        <div className={`${am}__stat`}>
          <div className={`${am}__stat-value`}>{values.deaths.basic.value}</div>
          <div className={`${am}__stat-name`}>Deaths</div>
        </div>
        <div className={`${am}__stat ${am}__stat-mobile`}>
          <div className={`${am}__stat-value`}>
            {values.assists.basic.value}
          </div>
          <div className={`${am}__stat-name `}>Assists</div>
        </div>
        <div className={`${am}__stat`}>
          <div className={`${am}__stat-value`}>
            {values.killsDeathsRatio.basic.displayValue}
          </div>
          <div className={`${am}__stat-name`}>K/D</div>
        </div>
        <div className={`${am}__stat ${am}__stat-mobile`}>
          <div className={`${am}__stat-value`}>
            {values.teamScore.basic.value}
          </div>
          <div className={`${am}__stat-name`}>Score</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityMatch;
