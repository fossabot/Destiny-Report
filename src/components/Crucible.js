import React, { Component } from "react";
import { connect } from "react-redux";
import {
  resetTheStateAction,
  setMembershipInfoAction,
  setAllProgressionAction,
  setActiveMembership
} from "../actions/playerActions";
import { valorSteps, glorySteps } from "../utility/Steps";
import Loading from "../components/Loading";

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
    const valor = {};
    const glory = {};
    if (this.props.player.success) {
      valor.won = this.props.player.crucibleStats.allTime.activitiesWon.basic.value;
      valor.lost =
        this.props.player.crucibleStats.allTime.activitiesEntered.basic.value -
        valor.won;
      valor.kills = this.props.player.crucibleStats.allTime.kills.basic.value;
      valor.deaths = this.props.player.crucibleStats.allTime.deaths.basic.value;
      valor.killStreak = this.props.player.crucibleStats.allTime.longestKillSpree.basic.value;
      valor.killDeathRatio = (valor.kills / valor.deaths).toFixed(2);

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

      valor.overallValor =
        this.props.player.valor.progress * 2000 + valor.currentValor;
      valor.ranks =
        this.props.player.valor.progress * 6 + this.props.player.valor.level;
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
      glory.overallGlory =
        this.props.player.glory.progress * 5500 + glory.currentGlory;
      glory.ranks =
        this.props.player.glory.progress * 6 + this.props.player.glory.level;
      glory.resets = this.props.player.glory.progress;
    }

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
          <div>
            <ul>
              <li>Current Valor: {valor.currentValor}</li>
              <li>Rank: {valor.currentRank}</li>
              <li>To next rank: {valor.progressToNextLevel}</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Overall Valor: {valor.overallValor}</li>
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
              <li>Overall Glory: {glory.overallGlory}</li>
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
)(Crucible);
