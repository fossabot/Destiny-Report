import React, { useState, useEffect } from "react";
import "../../static/styles/SearchForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer } from "./";

const SearchForm = () => {
  const [user, setUserChange] = useState({
    guardianName: "",
    platform: {
      name: "playstation",
      id: 2
    }
  });
  const [showPlatfoms, setShowPlatforms] = useState(false);

  useEffect(() => {
    window.addEventListener("click", e => {
      setShowPlatforms(false);
    });

    return () => window.removeEventListener("click", () => {});
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
        guardianName: value
      }));
      return;
    }
    const name = event.currentTarget.getAttribute("name");
    const value = event.currentTarget.getAttribute("value");
    setShowPlatforms(prev => !prev);
    setUserChange(prevState => ({
      ...prevState,
      platform: {
        ...prevState.platform,
        name: name,
        id: value
      }
    }));
  };
  const onSubmit = () => {
    console.log("Submitted");
  };

  return (
    <div className="search--wrapper">
      <form className="search--form" onSubmit={onSubmit}>
        <label>Search for a Guardian</label>
        <div className="input--wrapper">
          <div className="dropdown">
            <div className="dropbtn" onClick={showPlatformDropdown}>
              <FontAwesomeIcon icon={["fab", user.platform.name]} />
              <Spacer width="10px" />
              <FontAwesomeIcon icon="chevron-down" size="1x" />
            </div>
            <div className={`dropdown-content ${showPlatfoms ? "active" : ""}`}>
              <div
                className="dropdown-item"
                value={2}
                name="playstation"
                onClick={handleUserFormChange}
              >
                <FontAwesomeIcon icon={["fab", "playstation"]} />
                <span>PSN</span>
              </div>
              <div
                className="dropdown-item"
                value={1}
                name="xbox"
                onClick={handleUserFormChange}
              >
                <FontAwesomeIcon icon={["fab", "xbox"]} />
                <span>Xbox</span>
              </div>
              <div
                className="dropdown-item"
                value={4}
                name="windows"
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
            value={user.guardianName}
            onChange={handleUserFormChange}
          />
          <FontAwesomeIcon className="search-button" icon="arrow-right" />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
