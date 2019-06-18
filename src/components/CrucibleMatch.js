import React, { useEffect, useState } from "react";
import "../../static/styles/CrucibleMatch.scss";
import { getEntityDefinition } from "../utils/endpoints";
import activityTypeModes from "../utils/activityTypeModes";
import moment from "moment";

const CrucibleMatch = ({ data }) => {
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

  const nm = "crucible-match";
  return (
    <div className={`${nm}__wrapper`}>
      <div className={`${nm}__mode-info`}>
        <div className={`${nm}__image`}>
          <img src={`${activityDef.icon}`} alt="mode icon" />
        </div>
        <div className={`${nm}__name-location`}>
          <div className={`${nm}__name`}>{activityDef.name}</div>
          <div className={`${nm}__location`}>{activityDef.location}</div>
          <div className={`${nm}__location`}>{activityDef.date} days ago</div>
        </div>
      </div>

      <div className={`${nm}__stat-container`}>
        <div className={`${nm}__stat`}>
          <div className={`${nm}__stat-value`}>{values.kills.basic.value}</div>
          <div className={`${nm}__stat-name`}>Kills</div>
        </div>
        <div className={`${nm}__stat`}>
          <div className={`${nm}__stat-value`}>{values.deaths.basic.value}</div>
          <div className={`${nm}__stat-name`}>Deaths</div>
        </div>
        <div className={`${nm}__stat`}>
          <div className={`${nm}__stat-value`}>
            {values.assists.basic.value}
          </div>
          <div className={`${nm}__stat-name`}>Assists</div>
        </div>
        <div className={`${nm}__stat`}>
          <div className={`${nm}__stat-value`}>
            {values.killsDeathsRatio.basic.displayValue}
          </div>
          <div className={`${nm}__stat-name`}>K/D</div>
        </div>
        <div className={`${nm}__stat`}>
          <div className={`${nm}__stat-value`}>{values.score.basic.value}</div>
          <div className={`${nm}__stat-name`}>Score</div>
        </div>
      </div>
    </div>
  );
};

export default CrucibleMatch;
