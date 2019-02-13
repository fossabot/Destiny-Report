"use strict";
import App from "../common/containers/App";
import { Provider } from "react-redux";
import React from "react";
import configureStore from "../common/store/configureStore";
import express from "express";
import initialState from "../common/utility/initials.json";
import { renderToString } from "react-dom/server";
import serialize from "serialize-javascript";
import { StaticRouter as Router } from "react-router-dom";
import { getCharactersIds } from "./utility/endpoints";
import Player from "./models/player";
import checkForBadges from "./controllers/checkForBadges";
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

const getEnv = c => process.env[c];

axios.defaults.headers.common["X-API-KEY"] = getEnv("RAZZLE_API_KEY");

if (process.env.NODE_ENV === "production") {
  server.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });

  const corsOptions = {
    origin: "https://destiny.report",
    optionsSuccessStatus: 200
  };
  server.use(cors(corsOptions));
} else {
  server.use(cors());
}

mongoose.connect(
  `mongodb://${getEnv("RAZZLE_DB_USERNAME")}:${getEnv(
    "RAZZLE_DB_PASSWORD"
  )}@ds253922.mlab.com:53922/destinyreport`,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

mongoose.Promise = global.Promise;

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/api/getbadges/:id", async (req, res) => {
    const membershipId = req.params.id;
    const membershipType = req.query.platform;
    if (membershipId === undefined || membershipType === undefined) {
      res.status(400).json({ message: "Missing the param or query" });
      return;
    }

    Player.findById(membershipId, (err, doc) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(doc);
      }
    });
  })
  .get("/api/checkbadges/:id", async (req, res) => {
    const membershipId = req.params.id;
    const membershipType = req.query.platform;
    if (membershipId === undefined || membershipType === undefined) {
      res.status(400).json({ message: "Missing the param or query" });
      return;
    }

    try {
      const result = await getCharactersIds(membershipType, membershipId);
      const characterIds = result.data.Response.profile.data.characterIds;
      await checkForBadges(membershipType, membershipId, characterIds);

      const currentDateAndTime = new Date();
      currentDateAndTime.setDate(currentDateAndTime.getDate() - 1);
      Player.findOneAndUpdate(
        {
          _id: membershipId
        },
        {
          last_date: currentDateAndTime.toISOString()
        },
        { upsert: true, setDefaultsOnInsert: true },
        err => {
          if (err) {
            console.log(err);
          }
        }
      );

      Player.findById(membershipId, (err, doc) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(doc);
        }
      });
    } catch (err) {
      console.log(err);
    }
  })
  .get("/*", (req, res) => {
    const store = configureStore(initialState);

    const context = {};
    const markup = renderToString(
      <Router context={context} location={req.url}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    res.send(`<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Destiny Report</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">

        <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msvalidate.01" content="1783612DFC4A33BD0DE2888D6ABA30BE" />
  
      <meta
        name="google-site-verification"
        content="ErfANa7juH3P6bJa9lGx6p3uj-pMQ1P0WRRFCBkSZ8M"
      />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Check your Destiny 2 Gambit, Crucible and Raid stats"
      />
      <meta
        name="keywords"
        content="Destiny Report, Destiny 2, Raid, Crucible, KD, destiny 2 tracker, Gambit, Flawless, Raid Badges, Destiny 2 raid stats, last wish, leviathan, scourge of the past, eater of worlds, spire of stars"
      />
  
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="/${assets.client.css}">`
            : ""
        }
          ${
            process.env.NODE_ENV === "production"
              ? `<script src="/${assets.client.js}" defer></script>`
              : `<script src="/${assets.client.js}" defer crossorigin></script>`
          }
    </head>
    <body>
        <noscript> You need to enable JavaScript to run this app. </noscript>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
    </body>
</html>`);
  });

export default server;
