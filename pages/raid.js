import React from "react";
import {
  UserAndNav,
  ActivityHeader,
  RaidCard,
  Divider
} from "../src/components";
import withStyles from "react-jss";

const styles = {
  raidWrapper: {
    marginBottom: "20px"
  }
};

const raid = ({ classes, name, platform }) => {
  return (
    <div className={classes.raidWrapper}>
      <UserAndNav name={name} platform={platform} />
      <ActivityHeader name="OVERALL" />
      <RaidCard />
      <Divider />
      <RaidCard />
      <Divider />
      <RaidCard />
      <Divider />
      <RaidCard />
      <Divider />
      <RaidCard />
    </div>
  );
};

raid.getInitialProps = ({ query }) => {
  return { name: query.name, platform: query.platform };
};

export default withStyles(styles)(raid);
