import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer } from ".";
import { Link } from "./";
import "../../static/styles/SearchHistory.scss";

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const storageHistory = JSON.parse(
      localStorage.getItem("searchHistory")
    ) || [
      { name: "xXSARKURDZz", platform: { id: 2, value: "psn" } },
      { name: "PickleRick", platform: { id: 1, value: "xbl" } },
      { name: "Gladd#11111", platform: { id: 4, value: "bnet" } },
      { name: "xEdrisx", platform: { id: 2, value: "psn" } },
      { name: "xXSARKURDZz", platform: { id: 1, value: "xbl" } }
    ];

    setHistory(storageHistory);
  }, []);

  const platformsList = { 1: "xbox", 2: "playstation", 4: "windows" };
  return (
    <ul className="search--history">
      {history.map((player, index) => (
        <li key={index} className="search--history__item">
          <Link
            href={`/player?platform=${player.platform.value}&name=${
              player.name
            }`}
            as={`/player/${player.platform.value}/${player.name}`}
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
