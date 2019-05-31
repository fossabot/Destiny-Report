import React, { useContext } from "react";
import withStyles from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../context/GlobalContext";

const styles = {
  modalWrapper: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: "1",
    padding: "20px 10px",
    backgroundColor: "#0000007a",
    display: ({ active }) => (active ? "block" : "none")
  },
  modalContent: {
    position: "relative",
    height: "100px",
    backgroundColor: "#121f3a",
    borderRadius: "3px",
    maxWidth: "800px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 20px",
    marginTop: "100px",
    boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)"
  },
  primaryMessage: {
    fontSize: "30px"
  },
  secondaryMessage: {
    fontSize: "14px",
    color: "#828282"
  },
  modaleClose: {
    position: "absolute",
    top: "5px",
    right: "5px",
    padding: "5px",
    "&:hover": {
      backgroundColor: "rgb(189,189,189, 0.08)",
      borderRadius: "50%"
    }
  },
  "@media (max-width: 600px)": {
    secondaryMessage: {
      fontSize: "10px",
      textAlign: "center"
    },
    primaryMessage: {
      fontSize: "20px"
    }
  }
};

const Modal = ({ errorMessage, secondaryMessage, classes }) => {
  const { setGlobalState } = useContext(GlobalContext);

  const updateGlobalState = () => {
    setGlobalState(prev => ({
      ...prev,
      error: false,
      errorMessage: "Something went wrong!"
    }));
  };

  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modalContent}>
        <FontAwesomeIcon
          size="2x"
          className={classes.modaleClose}
          icon={["fa", "times"]}
          onClick={updateGlobalState}
        />
        <div className={classes.primaryMessage}>{errorMessage}</div>
        <div className={classes.secondaryMessage}>{secondaryMessage}</div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Modal);
