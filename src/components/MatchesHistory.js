import React from "react";
import { ActivityMatch, Spacer } from "./";

const MatchesHistory = ({ matches }) => {
  return (
    <div>
      <div>
        <h1>MATCHES SUMMARY</h1>
      </div>
      <Spacer height="20px" />
      {matches.data.map(match => (
        <ActivityMatch key={match.activityDetails.instanceId} data={match} />
      ))}
      <Spacer height="20px" />
    </div>
  );
};

export default MatchesHistory;
