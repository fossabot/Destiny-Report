import React from "react";
import { UserAndNav } from "../src/components";

const raid = ({ name, platform }) => {
  return (
    <div>
      <UserAndNav name={name} platform={platform} />
    </div>
  );
};

raid.getInitialProps = ({ query }) => {
  return { name: query.name, platform: query.platform };
};

export default raid;
