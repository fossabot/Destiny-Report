import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  _id: String,
  last_date: {
    type: String,
    default: "1993-01-01T10:00:00Z"
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

export default mongoose.models.Player || mongoose.model("Player", playerSchema);
