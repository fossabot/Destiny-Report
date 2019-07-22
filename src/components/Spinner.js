import React from "react";
import "../../static/styles/Spinner.scss";
const Spinner = ({ width = "60px", height = "60px" }) => {
  return (
    <svg
      class="spinner"
      width={width}
      height={height}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="path"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  );
};

export default Spinner;
