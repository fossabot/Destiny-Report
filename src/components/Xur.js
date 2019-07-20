import React from "react";
import { connect } from "react-redux";
import "../../static/styles/Xur.scss";
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
              Leaves on Tuesday
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
              Comes back on Friday
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
