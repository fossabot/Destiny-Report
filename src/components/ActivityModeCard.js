import React from "react";
import withStyles from "react-jss";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const styles = {
  activityModeWrapper: {
    display: "flex",
    alignItems: "center"
  },
  activityModeHeader: {
    minWidth: "180px"
  },
  activityModeHeaderText: {
    fontSize: "20px"
  },
  activityModeHeaderMatches: {
    color: "#a9a9a9",
    fontSize: "14px"
  },
  activityModeStats: {
    height: "100%",
    display: "flex",
    marginLeft: "65px",
    padding: "5px"
  },
  activityModeStatValue: {
    fontSize: "18px"
  },
  activityModeStatBox: {
    backgroundColor: "rgba(0, 0, 0, 0.493)",
    padding: "10px 20px",
    textAlign: "center"
  },
  activityModeStatName: {
    color: "#a9a9a9",
    fontSize: "12px"
  },
  "@media (max-width: 768px)": {
    activityModeStats: {
      marginLeft: "40px"
    },
    activityModeHeader: {
      minWidth: "100px"
    }
  },
  "@media (max-width: 520px)": {
    activityModeHeader: {
      minWidth: "80px"
    },
    activityModeStats: {
      marginLeft: "0"
    },
    activityModeHeaderText: {
      fontSize: "14px"
    },
    activityModeHeaderMatches: {
      fontSize: "8px"
    },
    activityModeStatBox: {
      padding: "5px 10px"
    },
    activityModeStatValue: {
      fontSize: "10px"
    }
  }
};
const ActivityModeCard = ({ classes, name, stats }) => {
  return (
    <div className={classes.activityModeWrapper}>
      <div className={classes.activityModeHeader}>
        <div className={classes.activityModeHeaderText}>
          {capitalizeFirstLetter(name)}
        </div>
        <div className={classes.activityModeHeaderMatches}>
          {stats.matches} Matches
        </div>
      </div>
      <div className={classes.activityModeStats}>
        <div className={classes.activityModeStatBox}>
          <div className={classes.activityModeStatValue}>
            <span className="color-green">{stats.wins}</span>
          </div>
          <div className={classes.activityModeStatName}>wins</div>
        </div>
        <div className={classes.activityModeStatBox}>
          <div className={classes.activityModeStatValue}>
            <span className="color-red">{stats.matches - stats.wins}</span>
          </div>
          <div className={classes.activityModeStatName}>loss</div>
        </div>
        <div className={classes.activityModeStatBox}>
          <div className={classes.activityModeStatValue}>{stats.kills}</div>
          <div className={classes.activityModeStatName}>kills</div>
        </div>
        <div className={classes.activityModeStatBox}>
          <div className={classes.activityModeStatValue}>{stats.deaths}</div>
          <div className={classes.activityModeStatName}>deaths</div>
        </div>
        <div className={classes.activityModeStatBox}>
          <div className={classes.activityModeStatValue}>
            {(stats.kills / (stats.deaths || 1)).toFixed(2) || stats.kills}
          </div>
          <div className={classes.activityModeStatName}>k/d</div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ActivityModeCard);
