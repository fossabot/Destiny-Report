import React from "react";
import Head from "next/head";

import { SearchForm, SearchHistory, Spacer } from "../src/components";
import "../src/styles/Home.scss";

const index = () => {
  return (
    <div className="home--wrapper">
      <Head>
        <title>Destiny Report</title>
        <meta
          name="description"
          content="Destiny 2 Gambit, Crucible and Raid stats. Loadout, Post game cargnage, Xur, Milestones"
        />
      </Head>
      <Spacer height="50px" />
      <SearchForm />
      <SearchHistory />
    </div>
  );
};

export default index;
