import React from "react";
import "../../static/styles/Loadout.scss";
import { EquippedItem, Subclass } from ".";
import withStyles from "react-jss";

const icon =
  "https://www.bungie.net/common/destiny2_content/icons/8e7fec497d1649f736dc71f7c550a805.jpg";

const styles = {
  characterEmblem: {
    backgroundImage: `url(${icon})`,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    height: "80px",
    marginBottom: "5px",
    position: "relative"
  },
  playerNameClass: {
    position: "absolute",
    left: "70px",
    top: "10px"
  },
  playerClass: {
    fontSize: "15px",
    color: "#908a8a",
    fontWeight: "500"
  },
  playerName: {
    fontSize: "20px",
    fontWeight: "bold"
    // marginBottom: "5px"
  },
  characterPowerLevel: {
    position: "absolute",
    right: "10px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2cb3ad",
    top: "10px"
  }
};

const Loadout = ({ classes }) => {
  return (
    <div className="loadout--wrapper">
      <div className={classes.characterEmblem}>
        <div className={classes.playerNameClass}>
          <div className={classes.playerName}>xXSARKURDZz</div>
          <div className={classes.playerClass}>Titan Human</div>
        </div>
        <div className={classes.characterPowerLevel}>700</div>
      </div>
      <div className="loadout--container">
        <div className="loadout__subclass">
          <EquippedItem
            name="Sunbreaker"
            icon="https://www.bungie.net/common/destiny2_content/icons/ce681395733e3b2cfe86d538e74416b5.png"
            category="Titan Subclass"
            perks={[
              {
                name: "Vengeance",
                icon:
                  "https://www.bungie.net/common/destiny2_content/icons/015525bda9f4da320c9fad69532080dc.png"
              }
            ]}
          />
        </div>
        <div className="loadout__weapons">
          <EquippedItem
            name="One-Eyed Mask"
            icon="https://www.bungie.net/common/destiny2_content/icons/08cf83be64d4583ab0400722c79b7659.jpg"
            category="Titan Helmet"
            perks={[
              {
                name: "Vengeance",
                icon:
                  "https://www.bungie.net/common/destiny2_content/icons/015525bda9f4da320c9fad69532080dc.png"
              }
            ]}
          />
          <EquippedItem
            name="One-Eyed Mask"
            icon="https://www.bungie.net/common/destiny2_content/icons/08cf83be64d4583ab0400722c79b7659.jpg"
            category="Titan Helmet"
            perks={[
              {
                name: "Vengeance",
                icon:
                  "https://www.bungie.net/common/destiny2_content/icons/015525bda9f4da320c9fad69532080dc.png"
              }
            ]}
          />
          <EquippedItem
            name="One-Eyed Mask"
            icon="https://www.bungie.net/common/destiny2_content/icons/08cf83be64d4583ab0400722c79b7659.jpg"
            category="Titan Helmet"
            perks={[
              {
                name: "Vengeance",
                icon:
                  "https://www.bungie.net/common/destiny2_content/icons/015525bda9f4da320c9fad69532080dc.png"
              }
            ]}
          />
        </div>
        <div className="loadout__armors">
          <EquippedItem
            name="One-Eyed Mask"
            icon="https://www.bungie.net/common/destiny2_content/icons/08cf83be64d4583ab0400722c79b7659.jpg"
            category="Titan Helmet"
            perks={[
              {
                name: "Vengeance",
                icon:
                  "https://www.bungie.net/common/destiny2_content/icons/015525bda9f4da320c9fad69532080dc.png"
              }
            ]}
          />
          <EquippedItem
            name="One-Eyed Mask"
            icon="https://www.bungie.net/common/destiny2_content/icons/08cf83be64d4583ab0400722c79b7659.jpg"
            category="Titan Helmet"
            perks={[
              {
                name: "Vengeance",
                icon:
                  "https://www.bungie.net/common/destiny2_content/icons/015525bda9f4da320c9fad69532080dc.png"
              }
            ]}
          />
          <EquippedItem
            name="One-Eyed Mask"
            icon="https://www.bungie.net/common/destiny2_content/icons/08cf83be64d4583ab0400722c79b7659.jpg"
            category="Titan Helmet"
            perks={[
              {
                name: "Vengeance",
                icon:
                  "https://www.bungie.net/common/destiny2_content/icons/015525bda9f4da320c9fad69532080dc.png"
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Loadout);
