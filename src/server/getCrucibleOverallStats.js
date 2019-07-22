const { getCharactersOverallCrucibleStats } = require("../utils/endpoints");

module.exports = async (membershipId, membershipType, characters) => {
  const overallCrucible = {
    quickplay: {
      matches: 0,
      deaths: 0,
      wins: 0,
      kills: 0,
      secondsPlayed: 0
    },
    comp: {
      matches: 0,
      deaths: 0,
      wins: 0,
      kills: 0,
      secondsPlayed: 0
    },
    ironBanner: {
      matches: 0,
      deaths: 0,
      wins: 0,
      kills: 0,
      secondsPlayed: 0
    }
  };
  const overallModesData = {
    quickplay: {
      clash: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      },
      supremacy: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      },
      control: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      }
    },
    comp: {
      survival: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      },
      countdown: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      },
      clash: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      },
      control: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      }
    },
    ironBanner: {
      clash: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      },
      supremacy: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      },
      control: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      },
      salvage: {
        matches: 0,
        deaths: 0,
        wins: 0,
        kills: 0
      }
    }
  };
  try {
    const promisesToBeResolved = [];
    for (let i = 0; i < characters.length; i++) {
      promisesToBeResolved.push(
        getCharactersOverallCrucibleStats(
          membershipId,
          membershipType,
          characters[i]
        )
      );
    }
    const result = await Promise.all(promisesToBeResolved);

    for (let i = 0; i < result.length; i++) {
      if (result[i].data.Response.pvpQuickplay.allTime) {
        overallCrucible.quickplay.matches +=
          result[
            i
          ].data.Response.pvpQuickplay.allTime.activitiesEntered.basic.value;
        overallCrucible.quickplay.wins +=
          result[
            i
          ].data.Response.pvpQuickplay.allTime.activitiesWon.basic.value;
        overallCrucible.quickplay.kills +=
          result[i].data.Response.pvpQuickplay.allTime.kills.basic.value;

        overallCrucible.quickplay.deaths +=
          result[i].data.Response.pvpQuickplay.allTime.deaths.basic.value;

        overallCrucible.quickplay.secondsPlayed +=
          result[
            i
          ].data.Response.pvpQuickplay.allTime.secondsPlayed.basic.value;
      }
      if (result[i].data.Response.pvpCompetitive.allTime) {
        overallCrucible.comp.matches +=
          result[
            i
          ].data.Response.pvpCompetitive.allTime.activitiesEntered.basic.value;
        overallCrucible.comp.wins +=
          result[
            i
          ].data.Response.pvpCompetitive.allTime.activitiesWon.basic.value;
        overallCrucible.comp.kills +=
          result[i].data.Response.pvpCompetitive.allTime.kills.basic.value;

        overallCrucible.comp.deaths +=
          result[i].data.Response.pvpCompetitive.allTime.deaths.basic.value;

        overallCrucible.comp.secondsPlayed +=
          result[
            i
          ].data.Response.pvpCompetitive.allTime.secondsPlayed.basic.value;
      }
      if (result[i].data.Response.ironBanner.allTime) {
        overallCrucible.ironBanner.matches +=
          result[
            i
          ].data.Response.ironBanner.allTime.activitiesEntered.basic.value;
        overallCrucible.ironBanner.wins +=
          result[i].data.Response.ironBanner.allTime.activitiesWon.basic.value;
        overallCrucible.ironBanner.kills +=
          result[i].data.Response.ironBanner.allTime.kills.basic.value;

        overallCrucible.ironBanner.deaths +=
          result[i].data.Response.ironBanner.allTime.deaths.basic.value;

        overallCrucible.ironBanner.secondsPlayed +=
          result[i].data.Response.ironBanner.allTime.secondsPlayed.basic.value;
      }

      if (result[i].data.Response.clashQuickplay.allTime) {
        overallModesData.quickplay.clash.matches +=
          result[
            i
          ].data.Response.clashQuickplay.allTime.activitiesEntered.basic.value;

        overallModesData.quickplay.clash.wins +=
          result[
            i
          ].data.Response.clashQuickplay.allTime.activitiesWon.basic.value;

        overallModesData.quickplay.clash.kills +=
          result[i].data.Response.clashQuickplay.allTime.kills.basic.value;
        overallModesData.quickplay.clash.deaths +=
          result[i].data.Response.clashQuickplay.allTime.deaths.basic.value;
      }

      if (result[i].data.Response.supremacy.allTime) {
        overallModesData.quickplay.supremacy.matches +=
          result[
            i
          ].data.Response.supremacy.allTime.activitiesEntered.basic.value;

        overallModesData.quickplay.supremacy.wins +=
          result[i].data.Response.supremacy.allTime.activitiesWon.basic.value;

        overallModesData.quickplay.supremacy.kills +=
          result[i].data.Response.supremacy.allTime.kills.basic.value;
        overallModesData.quickplay.supremacy.deaths +=
          result[i].data.Response.supremacy.allTime.deaths.basic.value;
      }
      if (result[i].data.Response.controlQuickplay.allTime) {
        overallModesData.quickplay.control.matches +=
          result[
            i
          ].data.Response.controlQuickplay.allTime.activitiesEntered.basic.value;

        overallModesData.quickplay.control.wins +=
          result[
            i
          ].data.Response.controlQuickplay.allTime.activitiesWon.basic.value;

        overallModesData.quickplay.control.kills +=
          result[i].data.Response.controlQuickplay.allTime.kills.basic.value;
        overallModesData.quickplay.control.deaths +=
          result[i].data.Response.controlQuickplay.allTime.deaths.basic.value;
      }
      if (result[i].data.Response.survival.allTime) {
        overallModesData.comp.survival.matches +=
          result[
            i
          ].data.Response.survival.allTime.activitiesEntered.basic.value;

        overallModesData.comp.survival.wins +=
          result[i].data.Response.survival.allTime.activitiesWon.basic.value;

        overallModesData.comp.survival.kills +=
          result[i].data.Response.survival.allTime.kills.basic.value;
        overallModesData.comp.survival.deaths +=
          result[i].data.Response.survival.allTime.deaths.basic.value;
      }
      if (result[i].data.Response.countdown.allTime) {
        overallModesData.comp.countdown.matches +=
          result[
            i
          ].data.Response.countdown.allTime.activitiesEntered.basic.value;

        overallModesData.comp.countdown.wins +=
          result[i].data.Response.countdown.allTime.activitiesWon.basic.value;

        overallModesData.comp.countdown.kills +=
          result[i].data.Response.countdown.allTime.kills.basic.value;
        overallModesData.comp.countdown.deaths +=
          result[i].data.Response.countdown.allTime.deaths.basic.value;
      }
      if (result[i].data.Response.clashCompetitive.allTime) {
        overallModesData.comp.clash.matches +=
          result[
            i
          ].data.Response.clashCompetitive.allTime.activitiesEntered.basic.value;

        overallModesData.comp.clash.wins +=
          result[
            i
          ].data.Response.clashCompetitive.allTime.activitiesWon.basic.value;

        overallModesData.comp.clash.kills +=
          result[i].data.Response.clashCompetitive.allTime.kills.basic.value;
        overallModesData.comp.clash.deaths +=
          result[i].data.Response.clashCompetitive.allTime.deaths.basic.value;
      }
      if (result[i].data.Response.controlCompetitive.allTime) {
        overallModesData.comp.control.matches +=
          result[
            i
          ].data.Response.controlCompetitive.allTime.activitiesEntered.basic.value;

        overallModesData.comp.control.wins +=
          result[
            i
          ].data.Response.controlCompetitive.allTime.activitiesWon.basic.value;

        overallModesData.comp.control.kills +=
          result[i].data.Response.controlCompetitive.allTime.kills.basic.value;
        overallModesData.comp.control.deaths +=
          result[i].data.Response.controlCompetitive.allTime.deaths.basic.value;
      }

      //IronBanner
      if (result[i].data.Response.ironBannerControl.allTime) {
        overallModesData.ironBanner.control.matches +=
          result[
            i
          ].data.Response.ironBannerControl.allTime.activitiesEntered.basic.value;

        overallModesData.ironBanner.control.wins +=
          result[
            i
          ].data.Response.ironBannerControl.allTime.activitiesWon.basic.value;

        overallModesData.ironBanner.control.kills +=
          result[i].data.Response.ironBannerControl.allTime.kills.basic.value;
        overallModesData.ironBanner.control.deaths +=
          result[i].data.Response.ironBannerControl.allTime.deaths.basic.value;
      }
      if (result[i].data.Response.ironBannerClash.allTime) {
        overallModesData.ironBanner.clash.matches +=
          result[
            i
          ].data.Response.ironBannerClash.allTime.activitiesEntered.basic.value;

        overallModesData.ironBanner.clash.wins +=
          result[
            i
          ].data.Response.ironBannerClash.allTime.activitiesWon.basic.value;

        overallModesData.ironBanner.clash.kills +=
          result[i].data.Response.ironBannerClash.allTime.kills.basic.value;

        overallModesData.ironBanner.clash.deaths +=
          result[i].data.Response.ironBannerClash.allTime.deaths.basic.value;
      }
      if (result[i].data.Response.ironBannerSupremacy.allTime) {
        overallModesData.ironBanner.supremacy.matches +=
          result[
            i
          ].data.Response.ironBannerSupremacy.allTime.activitiesEntered.basic.value;

        overallModesData.ironBanner.supremacy.wins +=
          result[
            i
          ].data.Response.ironBannerSupremacy.allTime.activitiesWon.basic.value;

        overallModesData.ironBanner.supremacy.kills +=
          result[i].data.Response.ironBannerSupremacy.allTime.kills.basic.value;

        overallModesData.ironBanner.supremacy.deaths +=
          result[
            i
          ].data.Response.ironBannerSupremacy.allTime.deaths.basic.value;
      }
      if (result[i].data.Response.ironBannerSalvage.allTime) {
        overallModesData.ironBanner.salvage.matches +=
          result[
            i
          ].data.Response.ironBannerSalvage.allTime.activitiesEntered.basic.value;

        overallModesData.ironBanner.salvage.wins +=
          result[
            i
          ].data.Response.ironBannerSalvage.allTime.activitiesWon.basic.value;

        overallModesData.ironBanner.salvage.kills +=
          result[i].data.Response.ironBannerSalvage.allTime.kills.basic.value;

        overallModesData.ironBanner.salvage.deaths +=
          result[i].data.Response.ironBannerSalvage.allTime.deaths.basic.value;
      }
    }

    const data = {
      overallCrucible,
      overallModesData
    };
    return data;
  } catch (error) {
    return { overallCrucible, overallModesData };
  }
};
