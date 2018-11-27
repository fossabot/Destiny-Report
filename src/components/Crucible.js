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
import { valorSteps, glorySteps } from "../utility/Steps";
import Loading from "../components/Loading";
import MultiMembershipPopup from "./MultiMembershipPopup";
import { Helmet } from "react-helmet";

class Crucible extends Component {
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
          "crucible"
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
        await this.props.setCrucibleProgressionAction(
          playerMemberships[0].membershipType,
          playerMemberships[0].membershipId
        );
        this.props.setGambitProgressionAction(
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
    await this.props.setCrucibleProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );
    this.props.setRaidProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );
    this.props.setGambitProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );

    this.setState({ isMore: false });
    this.props.history.push(`/crucible/${memberships[index].displayName}`);
  };

  render() {
    const valor = {};
    const glory = {};
    if (this.props.player.crucibleSuccess) {
      valor.won = this.props.player.crucibleStats.allTime.activitiesWon.basic.value;
      valor.lost =
        this.props.player.crucibleStats.allTime.activitiesEntered.basic.value -
        valor.won;
      valor.kills = this.props.player.crucibleStats.allTime.kills.basic.value;
      valor.deaths = this.props.player.crucibleStats.allTime.deaths.basic.value;
      valor.killStreak = this.props.player.crucibleStats.allTime.longestKillSpree.basic.value;
      valor.killDeathRatio = (valor.kills / valor.deaths).toFixed(2);
      if (valor.kills === 0 && valor.deaths === 0) {
        valor.killDeathRatio = 0;
      }

      valor.winLossRatio = (
        100 *
        (valor.won / (valor.won + valor.lost))
      ).toFixed(1);

      if (valor.won === 0 && valor.lost === 0) {
        valor.winLossRatio = 0;
      }

      valor.currentValor = this.props.player.valor.currentProgress;

      if (this.props.player.valor.level === 6) {
        valor.currentRank =
          valorSteps[this.props.player.valor.level - 1].stepName;
      } else {
        valor.currentRank = valorSteps[this.props.player.valor.level].stepName;
      }
      valor.progressToNextLevel =
        this.props.player.valor.nextLevelAt -
        this.props.player.valor.progressToNextLevel;

      valor.overallValor = 0;
      valor.ranks = this.props.player.valor.ranks;
      valor.resets = this.props.player.valor.progress;

      //Glory
      if (this.props.player.glory.level === 6) {
        glory.currentRank =
          glorySteps[this.props.player.glory.level - 1].stepName;
      } else {
        glory.currentRank = glorySteps[this.props.player.glory.level].stepName;
      }

      glory.currentGlory = this.props.player.glory.currentProgress;

      glory.progressToNextLevel =
        this.props.player.glory.nextLevelAt -
        this.props.player.glory.progressToNextLevel;

      glory.ranks = this.props.player.glory.ranks;
      glory.resets = this.props.player.glory.progress;
    }

    const { crucibleIsLoading } = this.props.player;

    const trackContainer = (
      <div className="track-wrapper">
        <div className="track-container">
          <div>
            <ul>
              <li>Current Valor: {valor.currentValor}</li>
              <li>Rank: {valor.currentRank}</li>
              <li>To next rank: {valor.progressToNextLevel}</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Ranks: {valor.ranks}</li>
              <li>Resets: {valor.resets}</li>
            </ul>
          </div>
        </div>

        <div className="track-container">
          <div>
            <ul>
              <li>Current Glory: {glory.currentGlory}</li>
              <li>Rank: {glory.currentRank}</li>
              <li>To next rank: {glory.progressToNextLevel}</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Ranks: {glory.ranks}</li>
              <li>Resets: {glory.resets}</li>
            </ul>
          </div>
        </div>
        <div className="track-container">
          <div>
            <ul>
              <li>Wins: {valor.won}</li>
              <li>Losses: {valor.lost}</li>
              <li>Wins/Losses: {valor.winLossRatio}%</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Kills: {valor.kills}</li>
              <li>Deaths: {valor.deaths}</li>
              <li>Kill Streak: {valor.killStreak}</li>
            </ul>
          </div>
        </div>
        <div className="track-container kill_death_ratio">
          <div>
            <ul>
              <li>K/D: {valor.killDeathRatio}</li>
            </ul>
          </div>
        </div>
      </div>
    );

    const progression =
      crucibleIsLoading || this.state.isMore ? <Loading /> : trackContainer;
    return (
      <div className="infamy-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Crucible</title>
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
)(Crucible);
