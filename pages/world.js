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

const World = ({ world, error }) => {
  useEffect(() => {
    if (error) {
      Router.push("/");
    }
  }, []);

  return (
    <div className="world--wrapper">
      <Head>
        <title>Destiny Report | World</title>
        <meta
          name="description"
          content="Xur inventory, Weekly Flashpoint, Weekly Nightfall Strikes and Leviathan encounters order"
        />
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

World.getInitialProps = async ({ reduxStore }) => {
  try {
    if (!reduxStore.getState().world.xur.isFetched) {
      await reduxStore.dispatch(setXurData());
    }
    if (!reduxStore.getState().world.isFetched) {
      await reduxStore.dispatch(setWorldData());
    }
    return {};
  } catch (error) {
    return { error: true };
  }
};

const mapStateToProps = state => ({ world: state.world });
export default connect(
  mapStateToProps,
  { setXurData, setWorldData }
)(World);
