import React from "react";
import {
  setMembershipDataAction as setMembershipData,
  resetTheStateAction as resetTheState
} from "../actions/playerActions";
import { connect } from "react-redux";

class Home extends React.Component {
  componentWillMount() {
    this.props.resetTheState();
  }

  setActive = (e, blur) => {
    if (blur && e.target.value.length === 0) {
      e.target.parentNode.classList.remove("active");
      return;
    }
    e.target.parentNode.classList.add("active");
  };

  handlePress = async event => {
    if (event.key === "Enter") {
      const id = event.target.value.toLowerCase();
      try {
        await this.props.setMembershipData(id);
        this.props.history.push(`/player/${this.props.player.displayName}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    const { error } = this.props.player;
    const errorPopup = (
      <div className="error_popup">This player doesn't exist</div>
    );

    return (
      <div className="home-wrapper">
        {error && errorPopup}
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

export default connect(
  mapStoreToProps,
  { setMembershipData, resetTheState }
)(Home);
