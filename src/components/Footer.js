import React from "react";
import Link from "next/link";
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
          <Link href="https://github.com/SarKurd/Destiny-Report">
            <a
              target="_blank"
              className="footer--link_a"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon size="lg" icon={["fab", "github"]} />
            </a>
          </Link>
        </div>
        <div className="footer--twitter">
          <Link href="https://twitter.com/sarkurd">
            <a
              target="_blank"
              className="footer--link_a"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon size="lg" icon={["fab", "twitter"]} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { resetPlayerData }
)(Footer);
