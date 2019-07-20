import React from "react";
import { connect } from "react-redux";
import "../../static/styles/Xur.scss";
import moment from "moment";

const dateFormat = "dddd [at] HH:mm";
let xurReset = moment.utc("2019-07-23T17:00:00.000Z");
xurReset = xurReset.local();
const xurLeavesOnDate = xurReset.format(dateFormat);
let xurComesback = moment.utc("2019-07-19T17:00:00.000Z");
xurComesback = xurComesback.local();
const xurComesbackOnDate = xurComesback.format(dateFormat);

const Xur = ({ xur }) => {
  if (!xur.isFetched) {
    return <div className="xur--container">Loading Xur...</div>;
  }
  if (xur.isHere) {
    return (
      <div className="xur--container">
        <div className="xur--location-map">
          <div className="xur--location-map_icon">
            <img
              src="https://www.bungie.net/img/destiny_content/vendor/icons/xur_map_icon.png"
              alt="hi"
            />
          </div>
          <div className="xur--location-map_descrption">
            <div className="xur--location-map_descrption-header">Xur</div>
            <div className="xur--location-map_descrption-planet">
              Location: Hidden
            </div>
            <div className="xur--location-map_descrption-area">
              Leaves on {xurLeavesOnDate}
            </div>
          </div>
        </div>
        <div className="xur--items">
          {xur.items.map((item, idx) => (
            <div className="xur--items_item" key={idx}>
              <div className="xur--items_item-img">
                <img
                  src={`https://www.bungie.net/${item.icon}`}
                  alt={item.name}
                />
              </div>
              <div className="xur--items_item-description">
                <div className="xur--items_item-description_name">
                  {item.name}
                </div>
                <div className="xur--items_item-description_type">
                  {item.description}
                </div>
                <div className="xur--items_item-description_cost">
                  {item.cost ? `${item.cost} Shards` : "Free"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="xur--container">
        <div className="xur--location-map">
          <div className="xur--location-map_icon">
            <img
              src="https://www.bungie.net/img/destiny_content/vendor/icons/xur_map_icon.png"
              alt="Xur icon"
            />
          </div>
          <div className="xur--location-map_descrption">
            <div className="xur--location-map_descrption-header">Xur</div>
            <div className="xur--location-map_descrption-planet">
              Location: Unkown
            </div>
            <div className="xur--location-map_descrption-area">
              Comesback on {xurComesbackOnDate}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(state => ({
  xur: state.player.xur
}))(Xur);
