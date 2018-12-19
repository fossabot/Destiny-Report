import React from "react";

class AdUnit extends React.Component {
  componentDidUpdate() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render() {
    return (
      <div className="ad-wrapper">
        <ins
          className="adsbygoogle"
          data-ad-client="ca-pub-9210265394268724"
          data-ad-slot="6432818314"
        />
      </div>
    );
  }
}

export default AdUnit;
