import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer } from ".";
import { Link } from "./";
import "../../static/styles/SearchHistory.scss";

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const storageHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(storageHistory);
  }, []);

  const platformsList = { 1: "xbox", 2: "playstation", 4: "windows" };
  return (
    <ul className="search--history">
      {history.map((player, index) => (
        <li key={index} className="search--history__item">
          <Link
            href={`/player?platform=${
              player.platform.name
            }&name=${encodeURIComponent(player.name)}`}
            as={`/player/${player.platform.name}/${encodeURIComponent(
              player.name
            )}`}
          >
            <a>
              <FontAwesomeIcon
                icon={["fab", platformsList[player.platform.id]]}
              />
              <Spacer width="10px" />
              {player.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchHistory;
