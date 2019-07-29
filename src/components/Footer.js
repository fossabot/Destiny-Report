import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../static/styles/Footer.scss";

const Footer = () => {
  return (
    <div className="footer--wrapper">
      <div className="footer--content">
        <div className="footer--developer">
          <Link href="https://destiny.report/player/psn/xXSARKURDZz">
            <a className="footer--link_a" rel="noopener noreferrer">
              <FontAwesomeIcon size="lg" icon="code" /> SarKurd
            </a>
          </Link>
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

export default Footer;
