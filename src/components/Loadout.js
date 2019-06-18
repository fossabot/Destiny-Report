import React from "react";
import "../../static/styles/Loadout.scss";
import { EquippedItem, Subclass } from ".";
import withStyles from "react-jss";
import secondsToDhm from "../utils/secondsToDhm";

const styles = {
  characterEmblem: {
    backgroundImage: props => `url(https://www.bungie.net${props.data.emblem})`,
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
    color: "#f3f3f3",
    fontWeight: "500",
    textShadow: "2px 4px 3px rgba(0,0,0,0.3)"
  },
  playerName: {
    fontSize: "20px",
    fontWeight: "bold"
    // marginBottom: "5px"
  },
  characterLightHours: {
    position: "absolute",
    right: "10px",
    top: "10px",
    fontWeight: "bold"
  },
  characterPowerLevel: {
    fontSize: "30px",
    color: "#2cb3ad"
  },
  characterHoursPlayed: {
    fontSize: "14px",
    textAlign: "right",
    textShadow: "2px 4px 3px rgba(0,0,0,0.3)",
    color: "#f3f3f3"
  }
};

const Loadout = ({ classes, data, name }) => {
  return (
    <div className="loadout--wrapper">
      <div className={classes.characterEmblem}>
        <div className={classes.playerNameClass}>
          <div className={classes.playerName}>{name}</div>
          <div className={classes.playerClass}>{`${data.class} ${data.race} ${
            data.gender
          } `}</div>
        </div>
        <div className={classes.characterLightHours}>
          <div className={classes.characterPowerLevel}>✧{data.light}</div>
          <div className={classes.characterHoursPlayed}>
            {secondsToDhm(Number(data.minutesPlayedTotal) * 60)}
          </div>
        </div>
      </div>
      <div className="loadout--container">
        <div className="loadout__subclass">
          <EquippedItem
            name={data.items[16][0].name}
            icon={`https://www.bungie.net${data.items[16][0].icon}`}
            category={data.items[16][0].type}
            perks={data.items[16][0].perks.reverse()}
          />
        </div>
        <div className="loadout__weapons">
          {data.items[3].map((item, index) => (
            <EquippedItem
              key={index}
              name={item.name}
              icon={`https://www.bungie.net/${item.icon}`}
              category={item.type}
              perks={item.perks}
            />
          ))}
        </div>
        {data.items[2].map((item, index) => (
          <EquippedItem
            key={index}
            name={item.name}
            icon={`https://www.bungie.net/${item.icon}`}
            category={item.type}
            perks={item.perks}
          />
        ))}
        <div className="loadout__armors" />
      </div>
    </div>
  );
};

export default withStyles(styles)(Loadout);
