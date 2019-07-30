import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import "../styles/SearchForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer } from "./";
import UserContext from "../context/UserContext";
import { getMembershipID } from "../utils/endpoints";
import { connect } from "react-redux";
import {
  setError,
  setLoader,
  resetPlayerData,
  setPlayerData
} from "../actions";
import safeJsonParse from "../utils/safeJsonParse";

const SearchForm = props => {
  const [user, setUserChange] = useState({
    name: "",
    platform: {
      name: "psn",
      icon: "playstation",
      id: 2
    }
  });
  const [showPlatfoms, setShowPlatforms] = useState(false);

  useEffect(() => {
    window.addEventListener("click", e => {
      setShowPlatforms(false);
    });

    return () => {
      window.removeEventListener("click", () => {});
    };
  }, []);

  const showPlatformDropdown = e => {
    e.stopPropagation();
    setShowPlatforms(prev => !prev);
  };
  const handleUserFormChange = event => {
    event.stopPropagation();

    if (event.currentTarget.tagName === "INPUT") {
      const value = event.currentTarget.value;
      setUserChange(prevState => ({
        ...prevState,
        name: value
      }));
      return;
    }
    const name = event.currentTarget.getAttribute("name");
    const value = event.currentTarget.getAttribute("value");
    const icon = event.currentTarget.getAttribute("data-platform");
    setShowPlatforms(prev => !prev);
    setUserChange(prevState => ({
      ...prevState,
      platform: {
        ...prevState.platform,
        name,
        icon,
        id: value
      }
    }));
  };
  const formSubmitHandler = async e => {
    e.preventDefault();
    props.setLoader(true);

    try {
      const res = await getMembershipID(user.name, user.platform.id);

      if (res.data.ErrorCode === 1 && res.data.Response.length > 0) {
        props.resetPlayerData();
        const nakedDisplayName = res.data.Response[0].displayName;
        const displayName = encodeURIComponent(
          res.data.Response[0].displayName
        );

        let previousHistory =
          safeJsonParse(localStorage.getItem("searchHistory")) || [];

        previousHistory = previousHistory.filter(
          player => player.name.trim() !== nakedDisplayName.trim()
        );

        previousHistory.unshift({
          name: nakedDisplayName,
          platform: {
            id: user.platform.id,
            name: user.platform.name
          }
        });

        previousHistory.splice(10);
        localStorage.setItem("searchHistory", JSON.stringify(previousHistory));

        props.setPlayerData(res.data.Response[0]);

        Router.push(
          `/player/[platform]/[name]`,
          `/player/${user.platform.name}/${displayName}`
        );
      } else {
        const errorStatus = "Guardian Not Found";
        const errorMessage =
          "Battle.net IDs Must Be In This Format, Example: Gladd#11693";
        props.setError(true, errorStatus, errorMessage);
      }
    } catch (error) {
      if (error.response) {
        const { ErrorStatus, Message } = error.response.data;

        props.setError(true, ErrorStatus, Message);
      } else {
        props.setError(true);
      }
    }
  };

  return (
    <div className="search--wrapper">
      <form className="search--form" onSubmit={formSubmitHandler}>
        <label>Search for a Guardian</label>
        <div className="input--wrapper">
          <div className="dropdown">
            <div className="dropbtn" onClick={showPlatformDropdown}>
              <FontAwesomeIcon
                className="platform--icon"
                icon={["fab", user.platform.icon]}
              />
              <Spacer width="10px" />
              <FontAwesomeIcon icon="chevron-down" size="1x" color="#9E9E9E" />
            </div>
            <div className={`dropdown-content ${showPlatfoms ? "active" : ""}`}>
              <div
                className="dropdown-item"
                value={2}
                name="psn"
                data-platform="playstation"
                onClick={handleUserFormChange}
              >
                <FontAwesomeIcon icon={["fab", "playstation"]} />
                <span>PSN</span>
              </div>
              <div
                className="dropdown-item"
                value={1}
                name="xbl"
                data-platform="xbox"
                onClick={handleUserFormChange}
              >
                <FontAwesomeIcon icon={["fab", "xbox"]} />
                <span>Xbox</span>
              </div>
              <div
                className="dropdown-item"
                value={4}
                name="bnet"
                data-platform="windows"
                onClick={handleUserFormChange}
              >
                <FontAwesomeIcon icon={["fab", "windows"]} />
                <span>Battle.net</span>
              </div>
            </div>
          </div>
          <input
            className="search--input"
            type="text"
            id="guardian-input"
            placeholder="Enter a Guardian"
            autoComplete="off"
            value={user.name}
            onChange={handleUserFormChange}
          />
          <FontAwesomeIcon
            onClick={formSubmitHandler}
            className="search-button"
            icon="arrow-right"
          />
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  { setLoader, setError, resetPlayerData, setPlayerData }
)(SearchForm);
