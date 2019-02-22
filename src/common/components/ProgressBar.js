import React from "react";
import "../styles/components/ProgressBar.scss";

export default () => {
	return (
		<div className="slider">
			<div className="line" />
			<div className="subline inc" />
			<div className="subline dec" />
		</div>
	);
};
