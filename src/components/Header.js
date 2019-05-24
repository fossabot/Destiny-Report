import React from "react";
import Link from "next/link";
import "../../static/styles/Header.scss";

const Header = () => {
  return (
    <div className="header--wrapper">
      <div className="header--content">
        <div className="destiny-report--title">
          <Link href="/">
            <a>Destiny Report</a>
          </Link>
        </div>
        <div className="destiny-report--addon">
          <Link href="https://chrome.google.com/webstore/detail/destiny-report/bfddnieakjjggiojaipihpfjnimkjaoh">
            <a target="_blank">Add-on</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
