import React from "react";
import { withRouter } from "react-router-dom";
import {
  VictoryScatter,
  VictoryTooltip,
  VictoryContainer,
  VictoryGroup
} from "victory";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";

class Chart extends React.Component {
  componentDidUpdate() {
    const activitiesScrollContainer = document.querySelectorAll(
      ".scrollbar-container"
    );
    for (let activityScrollContainer of activitiesScrollContainer)
      activityScrollContainer.scrollLeft =
        activityScrollContainer.scrollWidth -
        activityScrollContainer.clientWidth;
  }
  render() {
    const data = this.props.data;
    return (
      <PerfectScrollbar>
        <VictoryGroup
          data={data}
          width={20 * data.length}
          containerComponent={
            <VictoryContainer
              style={{ parent: { overflow: "visible" } }}
              responsive={false}
            />
          }
          style={{ marginTop: "20px" }}
          height={30}
          padding={10}
          size={5}
          labels={d =>
            moment
              .utc(d.period)
              .local()
              .format("DD MMMM YYYY HH:mm")
          }
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{ fill: "rgb(192, 177, 159)" }}
              orientation={prop => {
                if (prop.x <= 5) {
                  return "right";
                } else if (prop.x >= data.length - 5) {
                  return "left";
                } else {
                  return "top";
                }
              }}
            />
          }
        >
          <VictoryScatter
            size={6}
            style={{
              data: {
                fill: d => (d.y === 1 ? "green" : "red"),
                cursor: "pointer"
              }
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "data",
                        mutation: props => {
                          this.props.history.push(
                            `/pgcr/${data[props.index].instanceId}`
                          );
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
        </VictoryGroup>
      </PerfectScrollbar>
    );
  }
}

export default withRouter(Chart);
