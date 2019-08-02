import React from "react";
import Link from "next/link";
import { ScatterChart, Scatter, XAxis, YAxis, Dot, Tooltip } from "recharts";
import moment from "moment";

const CustomActivityShape = ({ cx, cy, node, payload }) => {
  return (
    <Link href="/pgcr/[id]" as={`/pgcr/${payload.instanceId}`}>
      <a>
        <Dot r={6} cx={cx} cy={cy} fill={node.y === 0 ? "red" : "green"} />;
      </a>
    </Link>
  );
};

const CustomActivityTooltip = ({ payload }) => {
  if (payload[0]) {
    return (
      <div className="activity-chart-tooltip">
        {moment
          .utc(payload[0].payload.period)
          .local()
          .format("DD MMMM YYYY HH:mm")}

        <style jsx>{`
          .activity-chart-tooltip {
            background-color: white;
            color: black;
            padding: 5px;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }
  return null;
};

const ActivitiesChart = ({ data }) => {
  return (
    <div className="activities-chart-container">
      <ScatterChart
        width={20 * data.length}
        height={60}
        margin={{ top: 20, right: 20, bottom: 30, left: 10 }}
      >
        <XAxis hide dataKey="x" />
        <YAxis hide dataKey="y" />
        <Tooltip cursor={false} content={<CustomActivityTooltip />} />
        <Scatter data={data} shape={<CustomActivityShape />} />
      </ScatterChart>
      <style jsx>{`
        .activities-chart-container {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
        }
      `}</style>
    </div>
  );
};

export default ActivitiesChart;
