const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  _id: String,
  last_date: {
    type: String,
    default: new Date().toISOString()
  },
  leviathan: {
    flawless: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    dayOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    weekOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    minPlayersCount: {
      value: { type: Number, default: 6 },
      instanceId: { type: String, default: "" }
    }
  },
  EoW: {
    flawless: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    dayOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    weekOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    minPlayersCount: {
      value: { type: Number, default: 6 },
      instanceId: { type: String, default: "" }
    }
  },
  SoS: {
    flawless: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    dayOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    weekOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    minPlayersCount: {
      value: { type: Number, default: 6 },
      instanceId: { type: String, default: "" }
    }
  },
  lastWish: {
    flawless: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    dayOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    weekOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    minPlayersCount: {
      value: { type: Number, default: 6 },
      instanceId: { type: String, default: "" }
    }
  },
  SotP: {
    flawless: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    dayOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    weekOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    minPlayersCount: {
      value: { type: Number, default: 6 },
      instanceId: { type: String, default: "" }
    }
  },
  CoS: {
    flawless: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    dayOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    weekOne: {
      value: { type: Boolean, default: false },
      instanceId: { type: String, default: "" }
    },
    minPlayersCount: {
      value: { type: Number, default: 6 },
      instanceId: { type: String, default: "" }
    }
  }
});

module.exports = mongoose.model("Player", playerSchema);
