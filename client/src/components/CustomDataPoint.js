import React from "react";
import { Link } from "react-router-dom";

class CustomDataPoint extends React.Component {
  render() {
    const { x, y, datum } = this.props;
    console.log(this.props);
    const color = datum.y === 0 ? "red" : "green";
    return (
      <Link to={`/pgcr/${datum.instanceId}`}>
        <g fill={color}>
          <circle cx={x} cy={y} r="5" />
        </g>
      </Link>
    );
  }
}

export default CustomDataPoint;
