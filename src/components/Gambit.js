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
import { infamySteps } from "../utility/Steps";
import Loading from "../components/Loading";
import MultiMembershipPopup from "./MultiMembershipPopup";
import { Helmet } from "react-helmet";

class Gambit extends Component {
  state = {
    isMore: false
  };
  async componentDidMount() {
    try {
      const { memberships } = this.props.player;
      if (memberships.length === 0 && this.props.match.params.id) {
        const playerGamerTag = this.props.match.params.id.toLowerCase();
        const playerMemberships = await this.props.setMembershipInfoAction(
          playerGamerTag,
          "gambit"
        );
        const activeMembership = this.props.player.activeMembership;

        if (
          this.props.player.memberships.length > 1 &&
          activeMembership === -1
        ) {
          this.setState({ isMore: true });
          return;
        }

        await this.props.setGambitProgressionAction(
          playerMemberships[0].membershipType,
          playerMemberships[0].membershipId
        );
        this.props.setCrucibleProgressionAction(
          playerMemberships[0].membershipType,
          playerMemberships[0].membershipId
        );
        this.props.setRaidProgressionAction(
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
    await this.props.setGambitProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );
    this.props.setCrucibleProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );
    this.props.setRaidProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );

    this.setState({ isMore: false });
    this.props.history.push(`/gambit/${memberships[index].displayName}`);
  };

  render() {
    const gambit = {};
    const infamy = {};
    if (this.props.player.gambitSuccess) {
      gambit.won = this.props.player.gambitStats.allTime.activitiesWon.basic.value;
      gambit.lost =
        this.props.player.gambitStats.allTime.activitiesEntered.basic.value -
        gambit.won;
      gambit.kills = this.props.player.gambitStats.allTime.kills.basic.value;
      gambit.deaths = this.props.player.gambitStats.allTime.deaths.basic.value;
      gambit.invaderKills = this.props.player.gambitStats.allTime.invaderKills.basic.value;
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
      if (this.props.player.infamy.level === 16) {
        infamy.currentRank =
          infamySteps[this.props.player.infamy.level - 1].stepName;
        infamy.progressToNextLevel =
          infamySteps[this.props.player.infamy.level - 1].progressTotal -
          this.props.player.infamy.progressToNextLevel;
      } else {
        infamy.currentRank =
          infamySteps[this.props.player.infamy.level].stepName;
        infamy.progressToNextLevel =
          infamySteps[this.props.player.infamy.level].progressTotal -
          this.props.player.infamy.progressToNextLevel;
      }
      infamy.overallInfamy =
        this.props.player.infamy.progress * 15000 + infamy.currentInfamy;
      infamy.ranks =
        this.props.player.infamy.progress * 16 + this.props.player.infamy.level;
      infamy.resets = this.props.player.infamy.progress;
    }

    const { gambitIsLoading } = this.props.player;

    const trackContainer = (
      <div className="track-wrapper">
        <div className="track-container">
          <div>
            <ul>
              <li>Current Infamy: {infamy.currentInfamy}</li>
              <li>Rank: {infamy.currentRank}</li>
              <li>To next rank: {infamy.progressToNextLevel}</li>
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
              <li>Losses: {gambit.lost}</li>
              <li>Wins/Losses: {gambit.winLossRatio}%</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Kills: {gambit.kills}</li>
              <li>Deaths: {gambit.deaths}</li>
              <li>Invader Kills: {gambit.invaderKills}</li>
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

    const progression =
      gambitIsLoading || this.state.isMore ? <Loading /> : trackContainer;
    return (
      <div className="infamy-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Gambit</title>
        </Helmet>
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
)(Gambit);
