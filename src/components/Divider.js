import React from "react";
import withStyles from "react-jss";

const styles = {
  horizontalLine: {
    display: " block",
    height: "1px",
    width: "100%",
    border: "0",
    borderTop: "1px solid #ffd700a6",
    margin: "2em 0",
    padding: "0"
  }
};
const Divider = ({ classes }) => {
  return <hr className={classes.horizontalLine} />;
};

export default withStyles(styles)(Divider);
