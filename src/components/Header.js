import React from "react";
import Link from "next/link";

import Spacer from "./Spacer";
import ActiveLink from "./Link";
import "../styles/Header.scss";

const Header = () => {
  return (
    <div className="header--wrapper">
      <div className="header--content">
        <div className="destiny-report--title">
          <Link href="/" as="/">
            <a>Destiny Report</a>
          </Link>
        </div>
        <div className="destiny-report--world">
          <ActiveLink href="/world" as="/world">
            <a className="destiny-report--world_link">World</a>
          </ActiveLink>
        </div>
        <Spacer width="100px" className="header--spacer" />
        <div className="destiny-report--donate">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CBDESK5LVTJPC&source=url"
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
