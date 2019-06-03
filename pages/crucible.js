import React from "react";
import {
  UserAndNav,
  ActivityHeader,
  CrucibleCard,
  Divider
} from "../src/components";

const crucible = ({ name, platform }) => {
  return (
    <div>
      <UserAndNav name={name} platform={platform} />
      <ActivityHeader name="OVERALL" />
      <Divider />
      <CrucibleCard name="QUICK PLAY" />
      <Divider />
      <CrucibleCard name="COMPETITIVE" />
    </div>
  );
};

crucible.getInitialProps = ({ query }) => {
  return { name: query.name, platform: query.platform };
};

export default crucible;
