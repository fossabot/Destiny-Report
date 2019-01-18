import { VictoryScatter, VictoryContainer } from "victory";
import React from "react";
import CustomDataPoint from "./CustomDataPoint";

import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

class Chart extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <PerfectScrollbar>
        <VictoryScatter
          width={20 * data.length}
          containerComponent={<VictoryContainer responsive={false} />}
          height={30}
          padding={10}
          size={5}
          data={data}
          dataComponent={<CustomDataPoint />}
        />
      </PerfectScrollbar>
    );
  }
}

export default Chart;
