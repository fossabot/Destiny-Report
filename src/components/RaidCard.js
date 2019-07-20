import React, { Fragment } from "react";
import "../../static/styles/RaidCard.scss";
import ReactTooltip from "react-tooltip";
import secondsToDhm from "../utils/secondsToDhm";
import Link from "next/link";

const numberWords = {
  1: "Solo",
  2: "Two Man",
  3: "Three Man",
  4: "Four Man"
};
const RaidCard = ({ name, stats, badges, isPrestige }) => {
  let overAll = stats.normal + stats.guided;
  if (isPrestige) {
    overAll += stats.prestige;
  }
  return (
    <div className="raid-card--wrapper">
      <div className="raid-card__header">
        <h1>{name}</h1>
        <div className="raid-card__time-played">
          {secondsToDhm(stats.timePlayed)}
        </div>
      </div>

      <div className="raid-card__stats">
        <div className="raid-card__stats-box">
          <div className="raid-card__stats-primary">{overAll}</div>
          <div className="raid-card__stats-secondary">Raids Cleared</div>
        </div>
        <div className="raid-card__stats-box">
          <div className="raid-card__stats-primary">{stats.normal}</div>
          <div className="raid-card__stats-secondary">Normal</div>
        </div>
        {isPrestige && (
          <div className="raid-card__stats-box">
            <div className="raid-card__stats-primary">{stats.prestige}</div>
            <div className="raid-card__stats-secondary">Prestige</div>
          </div>
        )}
        <div className="raid-card__stats-box">
          <div className="raid-card__stats-primary">{stats.guided}</div>
          <div className="raid-card__stats-secondary">Guided</div>
        </div>
      </div>
      <div className="raid-card__badges">
        {badges && (
          <Fragment>
            {badges.dayOne.value && (
              <Link
                href={`/pgcr?id=${badges.dayOne.instanceId}`}
                as={`/pgcr/${badges.dayOne.instanceId}`}
              >
                <div
                  className="raid-card__badges-text"
                  data-tip="Completed the raid within 24 hours"
                >
                  Day One
                </div>
              </Link>
            )}
            {!badges.dayOne.value && badges.weekOne.value && (
              <Link
                href={`/pgcr?id=${badges.weekOne.instanceId}`}
                as={`/pgcr/${badges.weekOne.instanceId}`}
              >
                <div
                  className="raid-card__badges-text"
                  data-tip="Completed the raid within 7 days"
                >
                  Week One
                </div>
              </Link>
            )}
            {badges.flawless.value && (
              <Link
                href={`/pgcr?id=${badges.flawless.instanceId}`}
                as={`/pgcr/${badges.flawless.instanceId}`}
              >
                <div
                  className="raid-card__badges-text"
                  data-tip="Completed the raid without any fireteam member deaths"
                >
                  Flawless
                </div>
              </Link>
            )}
            {badges.minPlayersCount.value < 5 && (
              <Link
                href={`/pgcr?id=${badges.minPlayersCount.instanceId}`}
                as={`/pgcr/${badges.minPlayersCount.instanceId}`}
              >
                <div
                  className="raid-card__badges-text"
                  data-tip={`Completed the raid in a fireteam of ${
                    badges.minPlayersCount.value
                  }`}
                >
                  {numberWords[badges.minPlayersCount.value]}
                </div>
              </Link>
            )}
          </Fragment>
        )}
      </div>
      <ReactTooltip className="tooltip" effect="solid" />
    </div>
  );
};

export default RaidCard;
