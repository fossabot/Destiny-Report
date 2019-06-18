import React from "react";
import { CrucibleMatch, Spacer } from "./";
import { connect } from "react-redux";

const MatchesHistory = ({ matches }) => {
  return (
    <div>
      <div>
        <h1>MATCHES SUMMARY</h1>
      </div>
      <Spacer height="20px" />
      {matches.data.map(match => (
        <CrucibleMatch key={match.activityDetails.instanceId} data={match} />
      ))}
      <Spacer height="20px" />
    </div>
  );
};

export default connect(state => ({ matches: state.crucible.matches }))(
  MatchesHistory
);
