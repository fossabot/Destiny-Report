"use strict";
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
const { getCharactersIds } = require("./utility/endpoints");
const Player = require("./models/player");
const checkForBadges = require("./controllers/checkForBadges");

const app = express();

const corsOptions = {
  origin: "http://destiny.report",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
axios.defaults.headers.common["X-API-KEY"] = process.env.BUNGIE_API_KEY;

mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${
    process.env.DB_PASSWORD
  }@ds253922.mlab.com:53922/destinyreport`,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

//Serve client
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/getbadges/:id", async (req, res) => {
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
});
app.get("/api/checkbadges/:id", async (req, res) => {
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

    Player.findById(membershipId, (err, doc) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(doc);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// The "catchall" handler
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
