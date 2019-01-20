import React from "react";

export default () => (
  <footer className="footer">
    <ul className="developer">
      <li>
        Developed by{" "}
        <a className="developer-anchor" href="https://www.github.com/sarkurd">
          SarKurd
        </a>
      </li>
    </ul>
    <ul className="source-and-contact">
      <li>
        <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CBDESK5LVTJPC&source=url">
          <i className="fa fa-paypal" /> <span>Donate</span>
        </a>
      </li>
      <li>
        <a href="https://github.com/SarKurd/Destiny-Report">
          <i className="fa fa-github" /> <span>Source </span>
        </a>
      </li>
    </ul>
    <ul className="info">
      <li>
        <a href="mailto:contact@destiny.report">contact@destiny.report</a>
      </li>
    </ul>
  </footer>
);
