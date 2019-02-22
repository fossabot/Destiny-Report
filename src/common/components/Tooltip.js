import React from "react";
import "../styles/components/Tooltip.scss";

const Tooltip = ({ name, tooltip }) => {
	return (
		<div className="tooltip-container">
			<div className="tooltip-container--tooltip">{tooltip}</div>
			<div className="tooltip-container--item">{name}</div>
		</div>
	);
};

export default Tooltip;
