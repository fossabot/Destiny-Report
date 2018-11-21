import React, { Component } from "react";
import { connect } from "react-redux";
import {
  resetTheStateAction,
  setMembershipInfoAction,
  setGambitStatsAction
} from "../actions/playerActions";
import { infamySteps } from "../utility/Steps";

class Player extends Component {
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

        if (this.props.player.memberships.length > 1) {
          this.setState({ isMore: true });
          return;
        }
        await this.props.setGambitStatsAction(
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
    await this.props.setGambitStatsAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );

    this.setState({ isMore: false });
    this.props.history.push(`/player/${memberships[index].displayName}`);
  };

  render() {
    const gambit = {};
    const infamy = {};
    if (this.props.player.success) {
      gambit.won = this.props.player.gambitStats.allTime.activitiesWon.basic.value;
      gambit.lost =
        this.props.player.gambitStats.allTime.activitiesEntered.basic.value -
        gambit.won;
      gambit.kills = this.props.player.gambitStats.allTime.kills.basic.value;
      gambit.deaths = this.props.player.gambitStats.allTime.deaths.basic.value;
      gambit.invaderkills = this.props.player.gambitStats.allTime.invaderKills.basic.value;
      gambit.invasionKills = this.props.player.gambitStats.allTime.invasionKills.basic.value;
      gambit.blockerKills = this.props.player.gambitStats.allTime.blockerKills.basic.value;

      gambit.smallBlockersSent = this.props.player.gambitStats.allTime.smallBlockersSent.basic.value;
      gambit.mediumBlockersSent = this.props.player.gambitStats.allTime.mediumBlockersSent.basic.value;
      gambit.largeBlockersSent = this.props.player.gambitStats.allTime.largeBlockersSent.basic.value;
      gambit.blockersSent =
        gambit.smallBlockersSent +
        gambit.mediumBlockersSent +
        gambit.largeBlockersSent;

      gambit.motesDeposited = this.props.player.gambitStats.allTime.motesDeposited.basic.value;
      gambit.motesLost = this.props.player.gambitStats.allTime.motesLost.basic.value;

      gambit.winLossRatio = (
        100 *
        (gambit.won / (gambit.won + gambit.lost))
      ).toFixed(1);

      if (gambit.won === 0 && gambit.lost === 0) {
        gambit.winLossRatio = 0;
      }

      infamy.currentInfamy = this.props.player.infamy.currentProgress;
      infamy.currentRank = infamySteps[this.props.player.infamy.level].stepName;
      infamy.progressToNextLevel = this.props.player.infamy.progressToNextLevel;
      infamy.overallInfamy =
        this.props.player.infamy.progress * 15000 + infamy.currentInfamy;
      infamy.ranks =
        this.props.player.infamy.progress * 16 + this.props.player.infamy.level;
      infamy.resets = this.props.player.infamy.progress;
    }

    const multiMembershipPopup = (
      <div className="error_popup multi_membership_popup">
        <ul>
          {this.props.player.memberships.map((elem, index) => {
            let platform = "";
            if (elem.membershipType === 2) {
              platform = "psn";
            } else if (elem.membershipType === 1) {
              platform = "xbox";
            } else {
              platform = "pc";
            }
            return (
              <li
                key={index}
                value={index}
                onClick={this.handleMembershipType}
                className={`membershipLi ${platform}`}
              >
                {elem.displayName}
              </li>
            );
          })}
        </ul>
      </div>
    );

    return (
      <div className="infamy-container">
        {this.state.isMore && multiMembershipPopup}
        <div className="track-container">
          <div>
            <ul>
              <li>Current Infamy: {infamy.currentInfamy}</li>
              <li>Rank: {infamy.currentRank}</li>
              <li>
                To next rank:
                {infamy.progressToNextLevel}
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Overall Infamy: {infamy.overallInfamy}</li>
              <li>Ranks: {infamy.ranks}</li>
              <li>Resets: {infamy.resets}</li>
            </ul>
          </div>
        </div>
        <div className="track-container">
          <div>
            <ul>
              <li>Wins: {gambit.won}</li>
              <li>Loses: {gambit.lost}</li>
              <li>Win/Loss: {gambit.winLossRatio}%</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Kills: {gambit.kills}</li>
              <li>Deaths: {gambit.deaths}</li>
              <li>Invader Kills: {gambit.invaderkills}</li>
            </ul>
          </div>
        </div>
        <div className="track-container">
          <div>
            <ul>
              <li>Blockers sent: {gambit.blockersSent}</li>
              <li>Blockers killed: {gambit.blockerKills}</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Large Blockers: {gambit.largeBlockersSent}</li>
              <li>Medium Blockers: {gambit.mediumBlockersSent}</li>
              <li>Small Blockers: {gambit.smallBlockersSent}</li>
            </ul>
          </div>
        </div>
        <div className="track-container">
          <div>
            <ul>
              <li>Motes banked: {gambit.motesDeposited}</li>
              <li>Motes lost: {gambit.motesLost}</li>
            </ul>
          </div>
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
  {
    resetTheStateAction,
    setMembershipInfoAction,
    setGambitStatsAction
  }
)(Player);
