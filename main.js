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

if (process.env.NODE_ENV === "production") {
  const whitelist = ["https://destinyreport.app", "https://destiny.report"];
  const corsOptions = {
    origin: function(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  };
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}
const PORT = process.env.PORT || 8080;
axios.defaults.headers.common["X-API-KEY"] = process.env.BUNGIE_API_KEY;

mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${
    process.env.DB_PASSWORD
  }@ds253922.mlab.com:53922/destinyreport`,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

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
    console.log("Done");
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
    console.log(err);
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
