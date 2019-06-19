import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer } from ".";
import Router from "next/router";
import "../../static/styles/SearchHistory.scss";
import { resetPlayerData } from "../actions";
import { connect } from "react-redux";

const SearchHistory = ({ resetPlayerData }) => {
  const platformsList = { 1: "xbox", 2: "playstation", 4: "windows" };
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const storageHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(storageHistory);
  }, []);

  const linkHandler = e => {
    const href = e.target.getAttribute("href");
    const as = e.target.getAttribute("as");

    resetPlayerData();
    Router.push(href, as);
  };

  return (
    <ul className="search--history">
      {history.map((player, index) => (
        <li
          key={index}
          className="search--history__item"
          href={`/player?platform=${
            player.platform.name
          }&name=${encodeURIComponent(player.name)}`}
          as={`/player/${player.platform.name}/${encodeURIComponent(
            player.name
          )}`}
          onClick={linkHandler}
        >
          <FontAwesomeIcon icon={["fab", platformsList[player.platform.id]]} />
          <Spacer width="10px" />
          {player.name}
        </li>
      ))}
    </ul>
  );
};

export default connect(
  null,
  { resetPlayerData }
)(SearchHistory);
