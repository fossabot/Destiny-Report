import React, { useState, useEffect } from "react";
import "../../static/styles/SearchForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchForm = () => {
  const [user, setUserChange] = useState({
    guardianName: "",
    platform: {
      name: "PSN",
      id: 2
    }
  });
  const [showPlatfoms, setShowPlatforms] = useState(false);

  useEffect(() => {
    window.addEventListener("click", e => {
      if (!e.target.classList.contains("dropbtn")) {
        setShowPlatforms(false);
      }
    });

    return () => window.removeEventListener("click");
  }, []);

  const showPlatformDropdown = () => {
    setShowPlatforms(prev => !prev);
  };
  const handleUserFormChange = event => {
    if (event.target.tagName === "INPUT") {
      const value = event.target.value;
      setUserChange(prevState => ({
        ...prevState,
        guardianName: value
      }));
      return;
    }
    const name = event.target.getAttribute("name");
    const value = event.target.getAttribute("value");
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
            <button
              type="button"
              className="dropbtn"
              onClick={showPlatformDropdown}
            >
              {user.platform.name}
            </button>
            <div className={`dropdown-content ${showPlatfoms ? "active" : ""}`}>
              <div value={2} name="PSN" onClick={handleUserFormChange}>
                PSN
              </div>
              <div value={1} name="XBOX" onClick={handleUserFormChange}>
                XBOX
              </div>
              <div value={4} name="Blizzard" onClick={handleUserFormChange}>
                Blizzard
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
