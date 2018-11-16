import React from "react";
import { setMembershipID } from "../actions/playerActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class Home extends React.Component {
  setActive = (e, blur) => {
    if (blur && e.target.value.length === 0) {
      e.target.parentNode.classList.remove("active");
      return;
    }
    e.target.parentNode.classList.add("active");
  };

  handlePress = event => {
    if (event.key === "Enter") {
      const id = event.target.value.toLowerCase();
      this.props.setMembershipID(id);
    }
  };

  render() {
    const { success, error } = this.props.player;
    if (success) {
      return <Redirect to={`/player/xxsarkurdzz`} />; //the actual gamertag will be fetched from API but for now it's my gamertag
    }

    return (
      <div className="home-wrapper">
        {error && <div className="error_popup">This player doesn't exist</div>}
        <div className="input-container">
          <label htmlFor="gamertag">Enter a player's name</label>
          <input
            type="text"
            name="gamertag"
            id="gamertag"
            onFocus={this.setActive}
            onBlur={event => this.setActive(event, true)}
            onKeyPress={this.handlePress}
          />
        </div>
      </div>
    );
  }
}

const mapStoreToProps = store => {
  return {
    player: store.player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMembershipID: id => {
      dispatch(setMembershipID(id));
    }
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Home);
