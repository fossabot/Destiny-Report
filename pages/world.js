import React, { useEffect } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Router from "next/router";

import {
  Spacer,
  Xur,
  Divider,
  Flashpoint,
  Leviathan,
  Nightfall
} from "../src/components";
import { setXurData, setWorldData } from "../src/actions";

const World = ({ world, setXurData, setWorldData }) => {
  useEffect(() => {
    if (!world.xur.isFetched) {
      setXurData().catch(() => {
        // Router.push("/");
      });
    }
    if (!world.isFetched) {
      setWorldData().catch(() => {
        Router.push("/");
      });
    }
  }, []);

  return (
    <div className="world--wrapper">
      <Head>
        <title>World</title>
      </Head>

      <Spacer height="50px" />
      <Xur data={world.xur} />
      <Divider />
      <Flashpoint isFetched={world.isFetched} data={world.data.flashpoint} />
      <Divider />
      <Nightfall isFetched={world.isFetched} data={world.data.nightfalls} />
      <Divider />
      <Leviathan isFetched={world.isFetched} data={world.data.leviathan} />
      <Spacer height="50px" />
    </div>
  );
};

const mapStateToProps = state => ({ world: state.world });
export default connect(
  mapStateToProps,
  { setXurData, setWorldData }
)(World);
