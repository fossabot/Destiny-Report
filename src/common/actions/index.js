import { values } from "lodash";
import * as endpoints from "../utility/endpoints";
import { getSafe } from "../utility/utils";
import { infamySteps } from "../utility/Steps";

export const resetTheStateAction = () => {
	return { type: "RESET_DATA" };
};

export const setMembershipInfoAction = (playerGamerTag, pageName) => {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await endpoints.getMembershipID(playerGamerTag);

				if (res.data.ErrorCode === 5) {
					dispatch({
						type: "FAIL_SET_DATA",
						payload: "Bungie API is under maintenance at this moment, please try again later"
					});
					reject({ ErrorCode: 5 });
					return;
				}
				if (res.data.Response.length === 0) {
					dispatch({ type: "PLAYER_NOT_FOUND" });
					reject("Player not found");
					return;
				}

				dispatch({
					type: "SET_MEMBERSHIP_DATA",
					payload: {
						memberships: res.data.Response
					}
				});
				dispatch({ type: "SUCCESS_SET_DATA", payload: pageName });
				resolve(res.data.Response);
			} catch (err) {
				dispatch({
					type: "FAIL_SET_DATA",
					payload: "Something went wrong, please try again"
				});
				reject(err);
			}
		});
	};
};

export const setGambitProgressionAction = (membershipType, membershipId) => {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				let gambitStats = await endpoints.getGambitStats(membershipType, membershipId);
				const allStats = await endpoints.getAllProgression(membershipType, membershipId);

				let infamyData = {
					currentProgress: 0,
					progressToNextLevel: 0,
					level: 0,
					ranks: 0,
					progress: 0,
					armyOfOne: 0
				};
				gambitStats = gambitStats.data.Response.pvecomp_gambit;
				const gambit = {};
				const infamy = {};

				gambit.won = getSafe(() => gambitStats.allTime.activitiesWon.basic.value, 0);
				gambit.lost = getSafe(() => gambitStats.allTime.activitiesEntered.basic.value - gambit.won, 0);
				gambit.kills = getSafe(() => gambitStats.allTime.kills.basic.value, 0);
				gambit.deaths = getSafe(() => gambitStats.allTime.deaths.basic.value, 0);
				if (gambit.deaths === 0) {
					gambit.kd = gambit.kills;
				} else {
					gambit.kd = (gambit.kills / gambit.deaths).toFixed(2);
				}
				gambit.invaderKills = getSafe(() => gambitStats.allTime.invaderKills.basic.value, 0);
				gambit.invasionKills = getSafe(() => gambitStats.allTime.invasionKills.basic.value, 0);
				gambit.blockerKills = getSafe(() => gambitStats.allTime.blockerKills.basic.value, 0);

				gambit.smallBlockersSent = getSafe(() => gambitStats.allTime.smallBlockersSent.basic.value, 0);
				gambit.mediumBlockersSent = getSafe(() => gambitStats.allTime.mediumBlockersSent.basic.value, 0);
				gambit.largeBlockersSent = getSafe(() => gambitStats.allTime.largeBlockersSent.basic.value, 0);
				gambit.blockersSent = gambit.smallBlockersSent + gambit.mediumBlockersSent + gambit.largeBlockersSent;

				gambit.motesDeposited = getSafe(() => gambitStats.allTime.motesDeposited.basic.value, 0);
				gambit.motesLost = getSafe(() => gambitStats.allTime.motesLost.basic.value, 0);
				gambit.motesDenied = getSafe(() => gambitStats.allTime.motesDenied.basic.value, 0);

				if (gambit.won === 0 && gambit.lost === 0) {
					gambit.winLossRatio = 0;
				} else {
					gambit.winLossRatio = (100 * (gambit.won / (gambit.won + gambit.lost))).toFixed(1);
				}

				//Infamy
				infamyData.level = getSafe(
					() => values(allStats.data.Response.characterProgressions.data)[0].progressions["2772425241"].level,
					0
				);

				infamyData.progressToNextLevel = getSafe(
					() =>
						values(allStats.data.Response.characterProgressions.data)[0].progressions["2772425241"]
							.progressToNextLevel,
					0
				);

				infamyData.currentProgress = getSafe(
					() =>
						values(allStats.data.Response.characterProgressions.data)[0].progressions["2772425241"]
							.currentProgress,
					0
				);

				infamyData.ranks = getSafe(
					() => allStats.data.Response.profileRecords.data.records["3470255495"].objectives[0].progress,
					0
				);
				infamyData.progress = getSafe(
					() => allStats.data.Response.profileRecords.data.records["3901785488"].objectives[0].progress,
					0
				);
				infamyData.armyOfOne = getSafe(
					() => allStats.data.Response.profileRecords.data.records["1071663279"].objectives[0].progress,
					0
				);

				infamy.currentInfamy = getSafe(() => infamyData.currentProgress, 0);
				infamy.armyOfOne = getSafe(() => infamyData.armyOfOne, 0);
				if (getSafe(() => infamy.level, 0) === 16) {
					infamy.currentRank = infamySteps[infamyData.level - 1].stepName;
					infamy.progressToNextLevel =
						infamySteps[infamy.level - 1].progressTotal - infamyData.progressToNextLevel;
					infamy.icon = "https://www.bungie.net" + infamySteps[infamyData.level - 1].icon;
				} else {
					infamy.icon = "https://www.bungie.net" + infamySteps[getSafe(() => infamyData.level, 0)].icon;
					infamy.currentRank = infamySteps[getSafe(() => infamyData.level, 0)].stepName;
					infamy.progressToNextLevel =
						infamySteps[getSafe(() => infamyData.level, 0)].progressTotal -
						getSafe(() => infamyData.progressToNextLevel, 0);
				}
				infamy.ranks = getSafe(() => infamyData.ranks, 0);
				infamy.resets = getSafe(() => infamyData.progress, 0);

				dispatch({
					type: "SET_GAMBIT_DATA",
					payload: {
						gambit: gambit,
						infamy: infamy
					}
				});
				dispatch({ type: "SUCCESS_SET_DATA", payload: "gambit" });
				dispatch({ type: "FINISHED_LOADING", payload: "gambit" });
				resolve();
			} catch (err) {
				dispatch({
					type: "FAIL_SET_DATA",
					payload: "This player doesn't have any destiny 2 stats or something went wrong"
				});
				reject(err);
			}
		});
	};
};
export const setCrucibleProgressionAction = (membershipType, membershipId) => {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const crucibleStats = await endpoints.getCrucibleStats(membershipType, membershipId);

				const allStats = await endpoints.getAllProgression(membershipType, membershipId);

				const crucibleData = {
					valor: {
						ranks: 0,
						progress: 0,
						resets: 0,
						level: 0,
						nextLevelAt: 0,
						progressToNextLevel: 0
					},
					glory: {
						ranks: 0,
						progress: 0,
						resets: 0,
						level: 0,
						nextLevelAt: 0,
						progressToNextLevel: 0
					}
				};

				if (allStats.data.Response.profileRecords.data !== undefined) {
					//Valor
					crucibleData.valor.ranks =
						allStats.data.Response.profileRecords.data.records["1711079800"].objectives[0].progress;

					const valorLevelStats = values(allStats.data.Response.characterProgressions.data)[0].progressions[
						"2626549951"
					];

					crucibleData.valor.level = valorLevelStats.level;
					crucibleData.valor.nextLevelAt = valorLevelStats.nextLevelAt;
					crucibleData.valor.progressToNextLevel = valorLevelStats.progressToNextLevel;
					crucibleData.valor.currentProgress = valorLevelStats.currentProgress;

					crucibleData.valor.resets =
						allStats.data.Response.profileRecords.data.records["559943871"].objectives[0].progress;

					//Glory
					crucibleData.glory.ranks =
						allStats.data.Response.profileRecords.data.records["200792717"].objectives[0].progress;

					const gloryLevelStats = values(allStats.data.Response.characterProgressions.data)[0].progressions[
						"2000925172"
					];

					crucibleData.glory.level = gloryLevelStats.level;
					crucibleData.glory.nextLevelAt = gloryLevelStats.nextLevelAt;
					crucibleData.glory.progressToNextLevel = gloryLevelStats.progressToNextLevel;
					crucibleData.glory.currentProgress = gloryLevelStats.currentProgress;

					crucibleData.glory.resets =
						allStats.data.Response.profileRecords.data.records["4185918315"].objectives[0].progress;
				} else {
					dispatch({
						type: "FAIL_SET_DATA",
						payload: "Due to player's privacy, some of his/her stats are lowest value"
					});
				}

				dispatch({
					type: "SET_CRUCIBLE_DATA",
					payload: {
						valorProgress: crucibleData.valor,
						gloryProgress: crucibleData.glory,
						crucibleStats: crucibleStats.data.Response.allPvP
					}
				});
				dispatch({ type: "SUCCESS_SET_DATA", payload: "crucible" });
				dispatch({ type: "FINISHED_LOADING", payload: "crucible" });

				resolve();
			} catch (err) {
				dispatch({
					type: "FAIL_SET_DATA",
					payload: "This player doesn't have any destiny 2 stats or something went wrong"
				});
				reject(err);
			}
		});
	};
};
export const setRaidProgressionAction = (membershipType, membershipId) => {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const raidStats = { stats: [] };
				const profileResult = await endpoints.getAllProgression(membershipType, membershipId);

				raidStats.petrasRun = getSafe(
					() => profileResult.data.Response.profileRecords.data.records[4177910003].objectives[0].complete,
					false
				);
				raidStats.likeADiamond = getSafe(
					() => profileResult.data.Response.profileRecords.data.records[2648109757].objectives[0].complete,
					false
				);
				const characterIds = profileResult.data.Response.profile.data.characterIds;

				const charactersRaidStats = await Promise.all(
					characterIds.map(characterId => {
						return endpoints.getRaidStats(membershipType, membershipId, characterId);
					})
				);
				for (let i = 0; i < charactersRaidStats.length; ++i) {
					raidStats.stats.push({
						[`character${i + 1}`]: charactersRaidStats[i].data.Response.activities
					});
				}

				const raidBadges = await endpoints.getRaidBadges(membershipType, membershipId);

				if (raidBadges.data) {
					raidStats.badges = raidBadges.data;
				}

				endpoints
					.getCheckRaidBadges(membershipType, membershipId)
					.then(badges => {
						dispatch({
							type: "SET_CHECKED_RAID_BADGES",
							payload: badges.data
						});
					})
					.catch(err => console.log(err));

				dispatch({
					type: "SET_RAID_DATA",
					payload: raidStats
				});
				dispatch({ type: "SUCCESS_SET_DATA", payload: "raid" });
				dispatch({ type: "FINISHED_LOADING", payload: "raid" });
				resolve();
			} catch (err) {
				dispatch({
					type: "FAIL_SET_DATA",
					payload: "This player doesn't have some destiny 2 stats or something went wrong"
				});
				reject(err);
			}
		});
	};
};

export const setOverallRaidAcitivitesPlayed = (membershipType, membershipId) => {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const raidActivities = await endpoints.getOverallRaidAcitivitesPlayed(membershipType, membershipId);

				dispatch({
					type: "SET_RAID_ACTIVITIES_DATA",
					payload: raidActivities
				});
				dispatch({
					type: "FINISHED_LOADING",
					payload: "raid-activities"
				});
				resolve();
			} catch (err) {
				dispatch({
					type: "FAIL_SET_DATA",
					payload: "This player doesn't have some destiny 2 stats or something went wrong"
				});
				reject(err);
			}
		});
	};
};
export const setActiveMembership = index => {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			dispatch({ type: "SET_ACTIVE_MEMBERSHIP", payload: index });
			resolve();
		});
	};
};

export const startSetDataAction = () => {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			dispatch({ type: "START_SET_DATA" });
			resolve();
		});
	};
};

//Chart
export const setChartLoadingDone = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch({ type: "FINISHED_LOADING", payload: "chart" });
			resolve();
		});
	};
};
