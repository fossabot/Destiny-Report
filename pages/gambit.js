import React from "react";
import { UserAndNav } from "../src/components";

const gambit = ({ name, platform }) => {
  return (
    <div>
      <UserAndNav name={name} platform={platform} />
    </div>
  );
};

gambit.getInitialProps = ({ query }) => {
  return { name: query.name, platform: query.platform };
};

export default gambit;
