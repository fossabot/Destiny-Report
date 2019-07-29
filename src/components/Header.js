import React from "react";
import Link from "next/link";
import ActiveLink from "./Link";
import "../../static/styles/Header.scss";
import Spacer from "./Spacer";

const Header = () => {
  return (
    <div className="header--wrapper">
      <div className="header--content">
        <div className="destiny-report--title">
          <Link href="/">
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
          <Link href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CBDESK5LVTJPC&source=url">
            <a target="_blank" rel="noopener noreferrer">
              Donate
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
