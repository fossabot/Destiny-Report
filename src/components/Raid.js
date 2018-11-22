import React, { Component } from "react";
import { connect } from "react-redux";
import {
  resetTheStateAction,
  setMembershipInfoAction,
  setAllProgressionAction,
  setActiveMembership
} from "../actions/playerActions";
import Loading from "../components/Loading";

class Raid extends Component {
  state = {
    isMore: false
  };
  async componentDidMount() {
    try {
      const { memberships } = this.props.player;
      if (memberships.length === 0 && this.props.match.params.id) {
        const playerGamerTag = this.props.match.params.id.toLowerCase();
        const playerMemberships = await this.props.setMembershipInfoAction(
          playerGamerTag
        );
        const activeMembership = this.props.player.activeMembership;

        if (
          this.props.player.memberships.length > 1 &&
          activeMembership === -1
        ) {
          this.setState({ isMore: true });
          return;
        }

        await this.props.setAllProgressionAction(
          playerMemberships[0].membershipType,
          playerMemberships[0].membershipId
        );
        return;
      }
      if (this.props.player.memberships.length === 0) {
        this.props.history.push("/");
      }
    } catch (err) {
      console.log(err);
      this.props.history.push("/");
    }
  }

  handleMembershipType = async event => {
    const index = event.target.value;
    const memberships = this.props.player.memberships;
    await this.props.setActiveMembership(index);
    await this.props.setAllProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );

    this.setState({ isMore: false });
    this.props.history.push(`/player/${memberships[index].displayName}`);
  };

  render() {
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

    const { isLoading } = this.props.player;

    const trackContainer = (
      <div className="track-wrapper">
        <div className="track-container">
          Development in progress for Raid, please comeback later
        </div>
      </div>
    );

    const progression = isLoading ? <Loading /> : trackContainer;
    return (
      <div className="infamy-container">
        {this.state.isMore && multiMembershipPopup}
        {progression}
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
    setAllProgressionAction,
    setActiveMembership
  }
)(Raid);
