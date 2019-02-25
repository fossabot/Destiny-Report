import React, { Component } from "react";
import { getPGCR } from "../utility/endpoints";
import Loading from "../components/Loading";
import { connect } from "react-redux";
import "../styles/components/Player.scss";
import warlockIcon from "../../../public/assets/warlock_emblem.svg";
import titanIcon from "../../../public/assets/titan_emblem.svg";
import HunterIcon from "../../../public/assets/hunter_emblem.svg";

class PGCR extends Component {
	classes = { Warlock: warlockIcon, Titan: titanIcon, Hunter: HunterIcon };
	state = {
		pgcr: "",
		loading: true,
		activityNotFound: false
	};
	async componentDidMount() {
		try {
			const instanceId = parseInt(this.props.match.params.instanceId, 10);
			const pgcrResult = await getPGCR(instanceId);

			this.setState({ pgcr: pgcrResult.data.Response }, () => {
				this.setState({ loading: false });
			});
		} catch (err) {
			if (err.response.data.ErrorCode === 1653) {
				this.setState({ loading: false, activityNotFound: true });
			} else if (err.response.data.ErrorCode === 5) {
				this.props.failGetData();
			}
		}
	}
	render() {
		if (!this.state.loading) {
			if (!this.state.activityNotFound) {
				return (
					<div className="infamy-container">
						<div className="track-wrapper">
							{this.state.pgcr.entries.map((entry, index) => {
								const player = {
									name: entry.player.destinyUserInfo.displayName,
									icon: `https://www.bungie.net${entry.player.destinyUserInfo.iconPath}`,
									completed: entry.values.completed.basic.displayValue,
									kills: entry.values.kills.basic.displayValue,
									deaths: entry.values.deaths.basic.displayValue,
									characterClass: entry.player.characterClass
								};

								return (
									<div key={index} className="track-container">
										<div
											className="track-container--effect track-container--effect_pgcr"
											style={{
												backgroundImage: `url(${player.icon})`
											}}
										/>
										<div className="track-container--content">
											<div className="track-container--title">
												<img src={this.classes[player.characterClass]} alt="" />
												<h4>{player.name}</h4>
											</div>
											<ul className="center-ul">
												<li>Kills: {player.kills}</li>
												<li>Deaths: {player.deaths}</li>
												<li>
													Completed:{" "}
													<span
														className={`color--${
															player.completed === "Yes" ? "green" : "red"
														}`}
													>
														{player.completed}{" "}
													</span>
												</li>
											</ul>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);
			} else {
				return (
					<div className="infamy-container">
						<div className="error_activity">Activity Not Found</div>
					</div>
				);
			}
		} else {
			return (
				<div className="infamy-container">
					<Loading />
				</div>
			);
		}
	}
}

const mapStoreToProps = store => {
	return {
		player: store.player
	};
};

export const failGetData = () => {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			dispatch({
				type: "FAIL_SET_DATA",
				payload: "Bungie API is down at this moment, please try again later"
			});
			resolve();
		});
	};
};

export default connect(
	mapStoreToProps,
	{ failGetData }
)(PGCR);
