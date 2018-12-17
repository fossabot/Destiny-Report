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
          <i className="fa fa-paypal" />
        </a>
      </li>
      <li>
        <a href="https://www.github.com/sarkurd">
          <i className="fa fa-github" />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/xXSARKURDZz">
          <i className="fa fa-twitter" />
        </a>
      </li>
    </ul>
    <ul className="info">
      <li>
        Contact:{" "}
        <a href="mailto:info@destinyreport.app">info@destinyreport.app</a>
      </li>
    </ul>
  </footer>
);
