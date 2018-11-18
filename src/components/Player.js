import React, { Component } from "react";
import { connect } from "react-redux";
import { setMembershipDataAction as setMembershipData } from "../actions/playerActions";

class Player extends Component {
  async componentWillMount() {
    let { membershipId } = this.props.player;
    if (membershipId === 0 && this.props.match.params.id) {
      const id = this.props.match.params.id.toLowerCase();
      this.props.setMembershipData(id);
      return;
    }
    if (this.props.player.membershipId === 0) {
      this.props.history.push("/");
    }
  }
  render() {
    const gambit = {};
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
    }

    return (
      <div className="characters-container">
        <div className="characters-list">
          <div className="character character--1 active">A</div>
          <div className="character character--2">B</div>
          <div className="character character--3">C</div>
        </div>
        <div className="stats-container">
          <div className="track-container infamy">
            <div>
              <ul>
                <li>
                  Current Infamy: {this.props.player.infamy.currentProgress}
                </li>
                <li>Rank: {this.props.player.infamy.stepIndex}</li>
                <li>
                  points to next rank:{" "}
                  {this.props.player.infamy.progressToNextLevel}
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Overall Infamy: 200</li>
                <li>Ranks: fable</li>
                <li>Resets: 2</li>
              </ul>
            </div>
          </div>
          <div className="track-container wins">
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
          <div className="track-container blockers">
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
          <div className="track-container blockers">
            <div>
              <ul>
                <li>Motes banked: {gambit.motesDeposited}</li>
                <li>Motes lost: {gambit.motesLost}</li>
              </ul>
            </div>
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
  { setMembershipData }
)(Player);
