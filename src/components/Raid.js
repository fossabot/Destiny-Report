import React, { Component } from "react";
import { connect } from "react-redux";
import {
  resetTheStateAction,
  setMembershipInfoAction,
  setGambitProgressionAction,
  setCrucibleProgressionAction,
  setRaidProgressionAction,
  setActiveMembership
} from "../actions/playerActions";
import MultiMembershipPopup from "./MultiMembershipPopup";
import Loading from "../components/Loading";

class Raid extends Component {
  state = {
    isMore: false
  };
  async componentWillMount() {
    try {
      const { memberships } = this.props.player;
      if (memberships.length === 0 && this.props.match.params.id) {
        const playerGamerTag = this.props.match.params.id.toLowerCase();
        const playerMemberships = await this.props.setMembershipInfoAction(
          playerGamerTag,
          "raid"
        );
        const activeMembership = this.props.player.activeMembership;

        if (
          this.props.player.memberships.length > 1 &&
          activeMembership === -1
        ) {
          this.setState({ isMore: true });
          return;
        }

        await this.props.setActiveMembership(0);
        await this.props.setRaidProgressionAction(
          playerMemberships[0].membershipType,
          playerMemberships[0].membershipId
        );
        this.props.setGambitProgressionAction(
          playerMemberships[0].membershipType,
          playerMemberships[0].membershipId
        );
        this.props.setCrucibleProgressionAction(
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
    this.setState({ isMore: false });
    await this.props.setActiveMembership(index);
    await this.props.setRaidProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );
    this.props.setGambitProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );
    this.props.setCrucibleProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );

    this.setState({ isMore: false });
    this.props.history.push(`/raid/${memberships[index].displayName}`);
  };

  render() {
    const { raidIsLoading } = this.props.player;

    const raid = {
      lastWish: { normalCompletions: 0 },
      EoW: {
        normalCompletions: 0,
        prestigeCompletions: 0
      },
      SoS: { normalCompletions: 0, prestigeCompletions: 0 },
      leviathan: { normalCompletions: 0, prestigeCompletions: 0 }
    };
    if (!raidIsLoading) {
      for (let i = 0; i < this.props.player.raid.length; ++i) {
        if (this.props.player.raid[i][`character${i + 1}`] !== undefined) {
          this.props.player.raid[i][`character${i + 1}`].forEach(elm => {
            if (elm.activityHash === 2122313384) {
              raid.lastWish.normalCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 3089205900) {
              raid.EoW.normalCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 809170886) {
              raid.EoW.prestigeCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 119944200) {
              raid.SoS.normalCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 3213556450) {
              raid.SoS.prestigeCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (
              elm.activityHash === 2693136600 ||
              elm.activityHash === 2693136601 ||
              elm.activityHash === 2693136602 ||
              elm.activityHash === 2693136603 ||
              elm.activityHash === 2693136604 ||
              elm.activityHash === 2693136605
            ) {
              raid.leviathan.normalCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (
              elm.activityHash === 417231112 ||
              elm.activityHash === 757116822 ||
              elm.activityHash === 1685065161 ||
              elm.activityHash === 2449714930 ||
              elm.activityHash === 3446541099 ||
              elm.activityHash === 3879860661
            ) {
              raid.leviathan.prestigeCompletions +=
                elm.values.activityCompletions.basic.value;
            }
          });
        }
      }
    }

    const trackContainer = (
      <div className="track-wrapper">
        <div className="track-container">
          <div className="raid">
            <ul>
              <li>Leviathan normal: {raid.leviathan.normalCompletions}</li>
              <li>Leviathan prestige: {raid.leviathan.prestigeCompletions}</li>
            </ul>
          </div>
        </div>
        <div className="track-container">
          <div className="raid">
            <ul>
              <li>Eater of Worlds normal: {raid.EoW.normalCompletions}</li>
              <li>Eater of Worlds prestige: {raid.EoW.prestigeCompletions}</li>
            </ul>
          </div>
        </div>
        <div className="track-container">
          <div className="raid">
            <ul>
              <li>Spire of Stars normal: {raid.SoS.normalCompletions}</li>
              <li>Spire of Stars prestige: {raid.SoS.prestigeCompletions}</li>
            </ul>
          </div>
        </div>
        <div className="track-container">
          <div className="raid">
            <ul>
              <li>Last Wish normal: {raid.lastWish.normalCompletions}</li>
            </ul>
          </div>
        </div>
      </div>
    );

    const progression =
      raidIsLoading || this.state.isMore ? <Loading /> : trackContainer;
    return (
      <div className="infamy-container">
        {this.state.isMore && (
          <MultiMembershipPopup
            handleMembershipType={this.handleMembershipType}
          />
        )}
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
    setGambitProgressionAction,
    setCrucibleProgressionAction,
    setRaidProgressionAction,
    setActiveMembership
  }
)(Raid);
