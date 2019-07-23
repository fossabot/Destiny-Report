import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Spacer, Xur } from "../src/components";

import { setXurData } from "../src/actions";

const World = ({ xur, setXurData }) => {
  useEffect(() => {
    if (!xur.isFetched) {
      setXurData();
    }
  }, []);

  return (
    <div className="home--wrapper">
      <Spacer height="50px" />
      <Xur />
    </div>
  );
};

const mapStateToProps = state => ({ xur: state.world.xur });
export default connect(
  mapStateToProps,
  { setXurData }
)(World);
