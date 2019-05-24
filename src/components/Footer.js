import React from "react";
import Link from "next/link";
import "../../static/styles/Footer.scss";

const Footer = () => {
  return (
    <div className="footer--wrapper">
      <div className="footer--content">
        <div className="under--construction">
          <Link href="https://github.com/SarKurd/Destiny-Report">
            <a>Under Construction</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
