import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import "../../static/styles/SearchForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer } from "./";
import UserContext from "../context/UserContext";
import GlobalContext from "../context/GlobalContext";
import { getMembershipID } from "../utils/endpoints";

const SearchForm = () => {
  const [user, setUserChange] = useState({
    name: "",
    platform: {
      name: "psn",
      icon: "playstation",
      id: 2
    }
  });
  const [showPlatfoms, setShowPlatforms] = useState(false);

  const { setUserState } = useContext(UserContext);
  const { setGlobalState } = useContext(GlobalContext);

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
    setGlobalState({ showLoader: true });
    const res = await getMembershipID(user.name, user.platform.id);

    if (res.data.ErrorCode === 1 && res.data.Response.length > 0) {
      const nakedDisplayName = res.data.Response[0].displayName;
      const displayName = encodeURIComponent(res.data.Response[0].displayName);

      let previousHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      previousHistory;

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

      setUserState({
        fetchinSucceed: true,
        fetchingFailed: false,
        user: res.data.Response[0]
      });

      Router.push(
        `/player?platform=${user.platform.name}&name=${displayName}`,
        `/player/${user.platform.name}/${displayName}`
      ).then(() => {
        setGlobalState(prev => ({
          ...prev,
          showLoader: false,
          error: false,
          errorMessage: "Something went wrong!"
        }));
      });
    } else {
      setGlobalState({
        showLoader: false,
        error: true,
        errorMessage: "Guardian Not Found"
      });
    }
  };

  return (
    <div className="search--wrapper">
      <form className="search--form" onSubmit={formSubmitHandler}>
        <label>Search for a Guardian</label>
        <div className="input--wrapper">
          <div className="dropdown">
            <div className="dropbtn" onClick={showPlatformDropdown}>
              <FontAwesomeIcon icon={["fab", user.platform.icon]} />
              <Spacer width="10px" />
              <FontAwesomeIcon icon="chevron-down" size="1x" />
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

export default SearchForm;
