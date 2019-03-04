import { getPGCR, getCharacterActivity } from "../utility/endpoints";
import Player from "../models/player";

const leviathanDayOne = new Date("2017-09-14T17:00:00Z");
const leviathanWeekOne = new Date("2017-09-20T17:00:00Z");

const eowDayOne = new Date("2017-12-09T18:00:00Z");
const eowWeekOne = new Date("2017-12-15T18:00:00Z");

const sosDayOne = new Date("2018-05-12T17:00:00Z");
const sosWeekOne = new Date("2018-05-18T17:00:00Z");

const lastWishDayOne = new Date("2018-09-15T17:00:00Z");
const lastWishWeekOne = new Date("2018-09-21T17:00:00Z");

const sotpDayOne = new Date("2018-12-08T17:00:00Z");
const sotpWeekOne = new Date("2018-12-14T17:00:00Z");

export default async (membershipType, membershipId, characterIds) => {
	try {
		const currentPlayerData = (await Player.findById(membershipId)) || {
			last_date: "1993-01-01T00:00:00Z"
		};
		const playerLastActivityCheckedDate = new Date(currentPlayerData.last_date);

		for (let i = 0; i < characterIds.length; ++i) {
			for (let page = 0; page < 10; ++page) {
				const result = await getCharacterActivity(membershipType, membershipId, characterIds[i], page);
				if (Object.keys(result.data.Response).length !== 0) {
					const playerLastActivityPlayedDate = new Date(result.data.Response.activities[0].period);
					if (playerLastActivityPlayedDate > playerLastActivityCheckedDate) {
						for (let k = 0; k < result.data.Response.activities.length; ++k) {
							const playerCurrentActivityPlayedDate = new Date(result.data.Response.activities[k].period);
							if (playerCurrentActivityPlayedDate < playerLastActivityCheckedDate) {
								break;
							}
							if (result.data.Response.activities[k].values.completionReason.basic.value === 0) {
								getPGCR(result.data.Response.activities[k].activityDetails.instanceId)
									.then(PGCRResult => {
										checkFireteamBadges(PGCRResult.data.Response);
									})
									.catch(err => console.log(err.data));
							}
						}
					}
				} else {
					break;
				}
			}
		}
	} catch (err) {
		console.log(err);
	}
};

const checkFireteamBadges = response => {
	const startingPhaseIndex = response.startingPhaseIndex;

	const instanceId = response.activityDetails.instanceId;
	const activityHash = response.activityDetails.directorActivityHash;
	let activeRaid = "";
	let isCompleted = false;
	let count = 0;

	//Badges
	let isFlawless = true;
	let isFourMan = false;
	let isThreeMan = false;
	let isTwoMan = false;
	let isSolo = false;
	let isDayOne = false;
	let isWeekOne = false;

	for (let player of response.entries) {
		if (player.values.completionReason.basic.value === 0) {
			count++;
			isCompleted = true;

			if (activityHash === 2122313384) {
				activeRaid = "lastWish";
				if (player.values.deaths.basic.value > 0) {
					isFlawless = false;
				}

				const finishedRaidDateAndTime = new Date(response.period);
				finishedRaidDateAndTime.setSeconds(
					finishedRaidDateAndTime.getSeconds() + player.values.activityDurationSeconds.basic.value
				);
				if (finishedRaidDateAndTime < lastWishDayOne) {
					isDayOne = true;
					isWeekOne = true;
				}
				if (finishedRaidDateAndTime < lastWishWeekOne) {
					isWeekOne = true;
				}
			} else if (
				activityHash === 2693136600 ||
				activityHash === 2693136601 ||
				activityHash === 2693136602 ||
				activityHash === 2693136603 ||
				activityHash === 2693136604 ||
				activityHash === 2693136605 ||
				activityHash === 417231112 ||
				activityHash === 757116822 ||
				activityHash === 1685065161 ||
				activityHash === 2449714930 ||
				activityHash === 3446541099 ||
				activityHash === 3879860661
			) {
				activeRaid = "leviathan";
				if (player.values.deaths.basic.value > 0) {
					isFlawless = false;
				}

				const finishedRaidDateAndTime = new Date(response.period);

				finishedRaidDateAndTime.setSeconds(
					finishedRaidDateAndTime.getSeconds() + player.values.activityDurationSeconds.basic.value
				);

				if (finishedRaidDateAndTime < leviathanDayOne) {
					isDayOne = true;
					isWeekOne = true;
				}
				if (finishedRaidDateAndTime < leviathanWeekOne) {
					isWeekOne = true;
				}
			} else if (activityHash === 3089205900 || activityHash === 809170886) {
				activeRaid = "EoW";
				if (player.values.deaths.basic.value > 0) {
					isFlawless = false;
				}

				const finishedRaidDateAndTime = new Date(response.period);
				finishedRaidDateAndTime.setSeconds(
					finishedRaidDateAndTime.getSeconds() + player.values.activityDurationSeconds.basic.value
				);
				if (finishedRaidDateAndTime < eowDayOne) {
					isDayOne = true;
					isWeekOne = true;
				}
				if (finishedRaidDateAndTime < eowWeekOne) {
					isWeekOne = true;
				}
			} else if (activityHash === 119944200 || activityHash === 3213556450) {
				activeRaid = "SoS";
				if (player.values.deaths.basic.value > 0) {
					isFlawless = false;
				}

				const finishedRaidDateAndTime = new Date(response.period);
				finishedRaidDateAndTime.setSeconds(
					finishedRaidDateAndTime.getSeconds() + player.values.activityDurationSeconds.basic.value
				);
				if (finishedRaidDateAndTime < sosDayOne) {
					isDayOne = true;
					isWeekOne = true;
				}
				if (finishedRaidDateAndTime < sosWeekOne) {
					isWeekOne = true;
				}
			} else if (activityHash === 548750096 || activityHash === 2812525063) {
				activeRaid = "SotP";
				if (player.values.deaths.basic.value > 0) {
					isFlawless = false;
				}

				const finishedRaidDateAndTime = new Date(response.period);
				finishedRaidDateAndTime.setSeconds(
					finishedRaidDateAndTime.getSeconds() + player.values.activityDurationSeconds.basic.value
				);
				if (finishedRaidDateAndTime < sotpDayOne) {
					isDayOne = true;
					isWeekOne = true;
				}
				if (finishedRaidDateAndTime < sotpWeekOne) {
					isWeekOne = true;
				}
			}
		}
	}

	if (isCompleted && count < 5 && startingPhaseIndex <= 8) {
		if (count === 4) {
			isFourMan = true;
		} else if (count === 3) {
			isThreeMan = true;
		} else if (count === 2) {
			isTwoMan = true;
		} else if (count === 1) {
			isSolo = true;
		}

		for (let player of response.entries) {
			if (player.values.completed.basic.value === 1) {
				const membershipId = player.player.destinyUserInfo.membershipId;

				if (isFourMan) {
					findAndUpdate(membershipId, activeRaid, "fourMan", instanceId);
				}
				if (isThreeMan) {
					findAndUpdate(membershipId, activeRaid, "threeMan", instanceId);
				}
				if (isTwoMan) {
					findAndUpdate(membershipId, activeRaid, "twoMan", instanceId);
				}
				if (isSolo) {
					findAndUpdate(membershipId, activeRaid, "solo", instanceId);
				}
			}
		}
	}

	//flawless
	if (isCompleted && isFlawless && startingPhaseIndex === 0) {
		for (let player of response.entries) {
			if (player.values.completed.basic.value === 1) {
				const membershipId = player.player.destinyUserInfo.membershipId;
				findAndUpdate(membershipId, activeRaid, "flawless", instanceId);
			}
		}
	}

	for (let player of response.entries) {
		if (player.values.completed.basic.value === 1) {
			const membershipId = player.player.destinyUserInfo.membershipId;

			if (isDayOne) {
				findAndUpdate(membershipId, activeRaid, "dayOne", instanceId);
			}
			if (isWeekOne) {
				findAndUpdate(membershipId, activeRaid, "weekOne", instanceId);
			}
		}
	}
};

//Add the badge to DB
const findAndUpdate = (membershipId, raidName, badgeName, instanceId) => {
	const field = `${raidName}.${badgeName}.value`;
	const instanceIdField = `${raidName}.${badgeName}.instanceId`;
	Player.findOneAndUpdate(
		{
			_id: membershipId
		},
		{
			[field]: true,
			[instanceIdField]: instanceId
		},
		{ upsert: true, setDefaultsOnInsert: true },
		err => {
			if (err) {
				console.log(err);
			}
		}
	);
};
