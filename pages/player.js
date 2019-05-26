import React from "react";
import { UserAndNav } from "../src/components";

const player = ({ name, platform }) => {
  return (
    <div>
      <UserAndNav name={name} platform={platform} />
    </div>
  );
};

player.getInitialProps = ({ query }) => {
  return { name: query.name, platform: query.platform };
};
export default player;
