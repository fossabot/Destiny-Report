import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import { connect } from "react-redux";

import "../styles/Footer.scss";
import { resetPlayerData } from "../actions";

const Footer = ({ resetPlayerData }) => {
  const developerClickHandler = () => {
    resetPlayerData();
    Router.push("/player/[platform]/[name]", "/player/psn/xXSARKURDZz");
  };

  return (
    <div className="footer--wrapper">
      <div className="footer--content">
        <div className="footer--developer" onClick={developerClickHandler}>
          <FontAwesomeIcon size="lg" icon="code" /> SarKurd
        </div>
        <div className="footer--source">
          <a
            target="_blank"
            href="https://github.com/SarKurd/Destiny-Report"
            className="footer--link_a"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon size="lg" icon={["fab", "github"]} />
          </a>
        </div>
        <div className="footer--twitter">
          <a
            href="https://twitter.com/sarkurd"
            target="_blank"
            className="footer--link_a"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon size="lg" icon={["fab", "twitter"]} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { resetPlayerData }
)(Footer);
