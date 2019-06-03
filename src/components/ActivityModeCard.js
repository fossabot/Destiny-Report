import React from "react";
import withStyles from "react-jss";

const styles = {
  activityModeWrapper: {
    display: "flex",
    alignItems: "center"
  },
  activityModeHeader: {},
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

  activityModeStatBox: {
    backgroundColor: "rgba(0, 0, 0, 0.493)",
    padding: "10px 20px",
    textAlign: "center"
  },
  activityModeStatName: {
    color: "#a9a9a9",
    fontSize: "10px"
  },
  "@media (max-width: 768px)": {
    activityModeStats: {
      marginLeft: "40px"
    }
  },
  "@media (max-width: 480px)": {
    activityModeStats: {
      marginLeft: "10px"
    },
    activityModeHeaderText: {
      fontSize: "16px"
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
const ActivityModeCard = ({ classes }) => {
  return (
    <div className={classes.activityModeWrapper}>
      <div className={classes.activityModeHeader}>
        <div className={classes.activityModeHeaderText}>Survival</div>
        <div className={classes.activityModeHeaderMatches}>225 Matches</div>
      </div>
      <div className={classes.activityModeStats}>
        <div className={classes.activityModeStatBox}>
          <div className={classes.activityModeStatValue}>225</div>
          <div className={classes.activityModeStatName}>win</div>
        </div>
        <div className={classes.activityModeStatBox}>
          <div className={classes.activityModeStatValue}>225</div>
          <div className={classes.activityModeStatName}>win</div>
        </div>
        <div className={classes.activityModeStatBox}>
          <div className={classes.activityModeStatValue}>225</div>
          <div className={classes.activityModeStatName}>win</div>
        </div>
        <div className={classes.activityModeStatBox}>
          <div className={classes.activityModeStatValue}>225</div>
          <div className={classes.activityModeStatName}>win</div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ActivityModeCard);
