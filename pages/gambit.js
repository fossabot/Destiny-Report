import React from "react";
import { UserAndNav, Loading } from "../src/components";

const gambit = ({ name, platform }) => {
  return (
    <div className="gambit--wrapper" style={{ height: "100%" }}>
      <UserAndNav name={name} platform={platform} />
    </div>
  );
};

gambit.getInitialProps = ({ query }) => {
  return { name: query.name, platform: query.platform };
};

export default gambit;
