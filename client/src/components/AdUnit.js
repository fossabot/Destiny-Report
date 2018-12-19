import React from "react";
import AdSense from "react-adsense";

class AdUnit extends React.Component {
  componentDidUpdate() {}
  render() {
    return (
      <div className="ad-wrapper">
        <AdSense.Google client="ca-pub-9210265394268724" slot="6432818314" />
      </div>
    );
  }
}

export default AdUnit;
