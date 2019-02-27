import React, { Component } from "react";
import { connect } from "react-redux";
import {
	setMembershipInfoAction,
	setGambitProgressionAction,
	setCrucibleProgressionAction,
	setRaidProgressionAction,
	setActiveMembership,
	startSetDataAction,
	setOverallRaidAcitivitesPlayed
} from "../actions";
import Loading from "../components/Loading";
import MultiMembershipPopup from "./MultiMembershipPopup";
import { Helmet } from "react-helmet";
import "../styles/components/Player.scss";

class Gambit extends Component {
	state = {
		isMore: false
	};
	async componentDidMount() {
		try {
			const { memberships } = this.props.player;
			if (memberships.length === 0 && this.props.match.params.id) {
				let playerGamerTag = this.props.match.params.id + this.props.location.hash;

				if (playerGamerTag.includes("#")) {
					playerGamerTag = playerGamerTag.replace("#", "%23");
				}
				await this.props.startSetDataAction();

				const playerMemberships = await this.props.setMembershipInfoAction(playerGamerTag);
				const activeMembership = this.props.player.activeMembership;

				if (this.props.player.memberships.length > 1 && activeMembership === -1) {
					this.setState({ isMore: true });
					return;
				}

				await this.props.setActiveMembership(0);
				this.props.setOverallRaidAcitivitesPlayed(
					playerMemberships[0].membershipType,
					playerMemberships[0].membershipId
				);
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
			} else {
				const { memberships, activeMembership } = this.props.player;

				let redirectName = memberships[activeMembership].displayName;

				if (redirectName.includes("#")) {
					redirectName = redirectName.replace("#", "%23");
				}

				this.props.history.replace(`/gambit/${redirectName}`);
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
		await this.props.startSetDataAction();

		await this.props.setActiveMembership(index);
		this.props.setOverallRaidAcitivitesPlayed(memberships[index].membershipType, memberships[index].membershipId);
		await this.props.setGambitProgressionAction(memberships[index].membershipType, memberships[index].membershipId);
		this.props.setCrucibleProgressionAction(memberships[index].membershipType, memberships[index].membershipId);
		this.props.setRaidProgressionAction(memberships[index].membershipType, memberships[index].membershipId);

		this.setState({ isMore: false });

		let redirectName = memberships[index].displayName;
		if (redirectName.includes("#")) {
			redirectName = redirectName.replace("#", "%23");
		}

		this.props.history.replace(`/gambit/${redirectName}`);
	};

	render() {
		const { gambit, infamy } = this.props.player;
		let progression = <Loading />;
		const { gambitIsLoading, gambitSuccess } = this.props.player;
		if (!gambitIsLoading && !this.state.isMore && gambitSuccess) {
			progression = (
				<div className="track-wrapper">
					<div className="track-container">
						<div className="track-container--effect" style={{ backgroundImage: `url(${infamy.icon})` }} />
						<div className="track-container--content">
							<div>
								<h4>Infamy</h4>
							</div>
							<ul>
								<li>Current: {infamy.currentInfamy}</li>
								<li>Rank: {infamy.currentRank}</li>
								<li>To next rank: {infamy.progressToNextLevel}</li>
								<li>Resets: {infamy.resets}</li>
								<li>Ranks: {infamy.ranks}</li>
							</ul>
						</div>
					</div>

					<div className="track-container">
						<div>
							<h4>Overall</h4>
						</div>
						<ul>
							<li>
								Wins: <span className="color--green">{gambit.won} </span>
							</li>
							<li>
								Losses: <span className="color--red">{gambit.lost} </span>
							</li>
							<li>Wins/Losses: {gambit.winLossRatio}%</li>
							<li>Kills: {gambit.kills}</li>
							<li>Deaths: {gambit.deaths}</li>
							<li>Kills/Deaths: {gambit.kd}</li>
						</ul>
					</div>

					<div className="track-container">
						<div>
							<h4>Invading & Invaders</h4>
						</div>
						<ul>
							<li>Invader Kills: {gambit.invaderKills}</li>
							<li>Invasion Kills: {gambit.invasionKills}</li>
							<li>
								Army of One: <span className="color--gold">{infamy.armyOfOne}</span>
							</li>
						</ul>
					</div>
					<div className="track-container">
						<div>
							<h4>Blockers</h4>
						</div>
						<ul>
							<li>Large Blockers: {gambit.largeBlockersSent}</li>
							<li>Medium Blockers: {gambit.mediumBlockersSent}</li>
							<li>Small Blockers: {gambit.smallBlockersSent}</li>
							<li>Blockers sent: {gambit.blockersSent}</li>
							<li>Blockers killed: {gambit.blockerKills}</li>
						</ul>
					</div>
					<div className="track-container">
						<div>
							<h4>Motes</h4>
						</div>
						<ul>
							<li>Motes banked: {gambit.motesDeposited}</li>
							<li>Motes lost: {gambit.motesLost}</li>
							<li>Motes denied: {gambit.motesDenied}</li>
						</ul>
					</div>
				</div>
			);
		}

		return (
			<div className="infamy-container">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Gambit</title>
				</Helmet>
				{this.state.isMore && <MultiMembershipPopup handleMembershipType={this.handleMembershipType} />}
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
		setMembershipInfoAction,
		setGambitProgressionAction,
		setCrucibleProgressionAction,
		setRaidProgressionAction,
		setActiveMembership,
		startSetDataAction,
		setOverallRaidAcitivitesPlayed
	}
)(Gambit);
