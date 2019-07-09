import React from "react";
import { ActivityMatch, Spacer } from "./";
import Link from "./Link";

const MatchesHistory = ({ matches }) => {
  return (
    <div>
      <div>
        <h1>MATCHES SUMMARY</h1>
      </div>
      <Spacer height="20px" />
      {matches.data.map(match => (
        <Link
          key={match.activityDetails.instanceId}
          href={`/pgcr?id=${match.activityDetails.instanceId}`}
          as={`/pgcr/${match.activityDetails.instanceId}`}
        >
          <a>
            <ActivityMatch data={match} />
          </a>
        </Link>
      ))}
      <Spacer height="20px" />
    </div>
  );
};

export default MatchesHistory;
