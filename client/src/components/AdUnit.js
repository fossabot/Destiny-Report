import React from "react";

class AdUnit extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render() {
    return (
      <ins
        className="adsbygoogle"
        data-ad-client="ca-pub-9210265394268724"
        data-ad-slot="6432818314"
        data-ad-format="auto"
      />
    );
  }
}

export default AdUnit;
