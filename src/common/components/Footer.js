import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal, faGithub } from "@fortawesome/free-brands-svg-icons";
import "../styles/components/Footer.scss";

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
					<FontAwesomeIcon icon={faPaypal} size="lg" /> <span>Donate</span>
				</a>
			</li>
			<li>
				<a href="https://github.com/SarKurd/Destiny-Report">
					<FontAwesomeIcon icon={faGithub} size="lg" /> <span>Source </span>
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
