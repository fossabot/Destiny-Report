import React from "react";
import {
  resetTheStateAction,
  setMembershipInfoAction,
  setGambitProgressionAction,
  setCrucibleProgressionAction,
  setRaidProgressionAction,
  setActiveMembership
} from "../actions/playerActions";
import { connect } from "react-redux";
import Loading from "../components/Loading";

class Home extends React.Component {
  state = {
    isMore: false
  };
  componentDidMount() {
    this.props.resetTheStateAction();
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
      const playerGamerTag = event.target.value.toLowerCase();
      try {
        const memberships = await this.props.setMembershipInfoAction(
          playerGamerTag,
          "gambit"
        );
        if (
          memberships.length > 1 &&
          this.props.player.activeMembership === -1
        ) {
          this.setState({ isMore: true });
          return;
        }
        await this.props.setActiveMembership(0);
        await this.props.setGambitProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
        this.props.setRaidProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
        this.props.setCrucibleProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );

        this.props.history.push(`/gambit/${memberships[0].displayName}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleMembershipType = async event => {
    const index = event.target.value;
    const memberships = this.props.player.memberships;
    await this.props.setActiveMembership(index);
    const activeMembership = this.props.player.activeMembership;
    await this.props.setGambitProgressionAction(
      memberships[activeMembership].membershipType,
      memberships[activeMembership].membershipId
    );
    this.props.setRaidProgressionAction(
      memberships[activeMembership].membershipType,
      memberships[activeMembership].membershipId
    );
    this.props.setCrucibleProgressionAction(
      memberships[activeMembership].membershipType,
      memberships[activeMembership].membershipId
    );

    this.props.history.push(
      `/gambit/${memberships[activeMembership].displayName}`
    );
  };

  render() {
    const { error, gambitIsLoading } = this.props.player;
    console.log(gambitIsLoading);
    const errorPopup = (
      <div className="error_popup">This player doesn't exist</div>
    );
    const multiMembershipPopup = (
      <div className="error_popup multi_membership_popup">
        <ul className="membershipsUL">
          {this.props.player.memberships.map((elem, index) => {
            let platform = "";
            if (elem.membershipType === 2) {
              platform = "fab fa-playstation membershipLi";
              platform += " psn";
            } else if (elem.membershipType === 1) {
              platform = "fab fa-xbox membershipLi";
              platform += " xbox";
            } else {
              platform = "fas fa-desktop membershipLi";
              platform += " pc";
            }
            return (
              <li
                key={index}
                value={index}
                onClick={this.handleMembershipType}
                className={`${platform}`}
              >
                {" "}
                {elem.displayName}
              </li>
            );
          })}
        </ul>
      </div>
    );
    const inputPlayerId = (
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
    );
    const isPlayerDataLoading = gambitIsLoading ? <Loading /> : inputPlayerId;
    return (
      <div className="home-wrapper">
        {error && errorPopup}
        {this.state.isMore && multiMembershipPopup}

        {isPlayerDataLoading}
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
  {
    resetTheStateAction,
    setMembershipInfoAction,
    setGambitProgressionAction,
    setCrucibleProgressionAction,
    setRaidProgressionAction,
    setActiveMembership
  }
)(Home);
