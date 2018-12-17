const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  _id: String,
  leviathan: {
    flawless: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    dayOne: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    weekOne: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    fourMan: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    threeMan: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    twoMan: {
      value: Boolean,
      instanceId: String,
      default: false
    }
  },
  EoW: {
    flawless: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    dayOne: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    weekOne: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    fourMan: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    threeMan: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    twoMan: {
      value: Boolean,
      instanceId: String,
      default: false
    }
  },
  SoS: {
    flawless: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    dayOne: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    weekOne: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    fourMan: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    threeMan: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    twoMan: {
      value: Boolean,
      instanceId: String,
      default: false
    }
  },
  lastWish: {
    flawless: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    dayOne: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    weekOne: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    fourMan: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    threeMan: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    twoMan: {
      value: Boolean,
      instanceId: String,
      default: false
    }
  },
  SotP: {
    flawless: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    dayOne: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    weekOne: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    fourMan: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    threeMan: {
      value: Boolean,
      instanceId: String,
      default: false
    },
    twoMan: {
      value: Boolean,
      instanceId: String,
      default: false
    }
  }
});

module.exports = mongoose.model("Player", playerSchema);
