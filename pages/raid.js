import React from "react";
import { UserAndNav, RaidHeader, RaidCard, Divider } from "../src/components";

const raid = ({ name, platform }) => {
  return (
    <div>
      <UserAndNav name={name} platform={platform} />
      <RaidHeader />
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

export default raid;
