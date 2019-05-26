import React from "react";
import { UserAndNav } from "../src/components";

const crucible = ({ name, platform }) => {
  return (
    <div>
      <UserAndNav name={name} platform={platform} />
    </div>
  );
};

crucible.getInitialProps = ({ query }) => {
  return { name: query.name, platform: query.platform };
};

export default crucible;
