import { cloneDeep, isEmpty } from "lodash";

const SET_GAMBIT_DATA = "SET_GAMBIT_DATA";
const START_SET_DATA = "START_SET_DATA";
const SUCCESS_SET_DATA = "SUCCESS_SET_DATA";
const FAIL_SET_DATA = "FAIL_SET_DATA";
const RESET_DATA = "RESET_DATA";
const SET_MEMBERSHIP_DATA = "SET_MEMBERSHIP_DATA";
const FINISHED_LOADING = "FINISHED_LOADING";
const SET_ACTIVE_MEMBERSHIP = "SET_ACTIVE_MEMBERSHIP";

const initial = {
  memberships: [],
  activeMembership: -1,
  gambitStats: {
    allTime: {
      activitiesEntered: {
        statId: "activitiesEntered",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      activitiesWon: {
        statId: "activitiesWon",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      assists: {
        statId: "assists",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      totalDeathDistance: {
        statId: "totalDeathDistance",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      averageDeathDistance: {
        statId: "averageDeathDistance",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      totalKillDistance: {
        statId: "totalKillDistance",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      kills: {
        statId: "kills",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      averageKillDistance: {
        statId: "averageKillDistance",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      secondsPlayed: {
        statId: "secondsPlayed",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      deaths: {
        statId: "deaths",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      averageLifespan: {
        statId: "averageLifespan",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      bestSingleGameKills: {
        statId: "bestSingleGameKills",
        basic: {
          value: 0,
          displayValue: "0"
        },
        activityId: "2178730499"
      },
      bestSingleGameScore: {
        statId: "bestSingleGameScore",
        basic: {
          value: 0,
          displayValue: "0"
        },
        activityId: "2924510475"
      },
      opponentsDefeated: {
        statId: "opponentsDefeated",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      efficiency: {
        statId: "efficiency",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      killsDeathsRatio: {
        statId: "killsDeathsRatio",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      killsDeathsAssists: {
        statId: "killsDeathsAssists",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      precisionKills: {
        statId: "precisionKills",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      resurrectionsPerformed: {
        statId: "resurrectionsPerformed",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      resurrectionsReceived: {
        statId: "resurrectionsReceived",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      score: {
        statId: "score",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      suicides: {
        statId: "suicides",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsAutoRifle: {
        statId: "weaponKillsAutoRifle",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsBeamRifle: {
        statId: "weaponKillsBeamRifle",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0.0"
        }
      },
      weaponKillsBow: {
        statId: "weaponKillsBow",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0.0"
        }
      },
      weaponKillsFusionRifle: {
        statId: "weaponKillsFusionRifle",
        basic: {
          value: 0,
          displayValue: "44"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsHandCannon: {
        statId: "weaponKillsHandCannon",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsTraceRifle: {
        statId: "weaponKillsTraceRifle",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsPulseRifle: {
        statId: "weaponKillsPulseRifle",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsRocketLauncher: {
        statId: "weaponKillsRocketLauncher",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsScoutRifle: {
        statId: "weaponKillsScoutRifle",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsShotgun: {
        statId: "weaponKillsShotgun",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsSniper: {
        statId: "weaponKillsSniper",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsSubmachinegun: {
        statId: "weaponKillsSubmachinegun",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsRelic: {
        statId: "weaponKillsRelic",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsSideArm: {
        statId: "weaponKillsSideArm",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsSword: {
        statId: "weaponKillsSword",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsAbility: {
        statId: "weaponKillsAbility",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsGrenade: {
        statId: "weaponKillsGrenade",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsGrenadeLauncher: {
        statId: "weaponKillsGrenadeLauncher",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "00"
        }
      },
      weaponKillsSuper: {
        statId: "weaponKillsSuper",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponKillsMelee: {
        statId: "weaponKillsMelee",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      weaponBestType: {
        statId: "weaponBestType",
        basic: {
          value: 0,
          displayValue: "Hand Cannon"
        }
      },
      winLossRatio: {
        statId: "winLossRatio",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      allParticipantsCount: {
        statId: "allParticipantsCount",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      allParticipantsScore: {
        statId: "allParticipantsScore",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      allParticipantsTimePlayed: {
        statId: "allParticipantsTimePlayed",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      longestKillSpree: {
        statId: "longestKillSpree",
        basic: {
          value: 0,
          displayValue: "0"
        },
        activityId: "0"
      },
      longestSingleLife: {
        statId: "longestSingleLife",
        basic: {
          value: 0,
          displayValue: "0"
        },
        activityId: "0"
      },
      mostPrecisionKills: {
        statId: "mostPrecisionKills",
        basic: {
          value: 0,
          displayValue: "0"
        },
        activityId: "0"
      },
      orbsDropped: {
        statId: "orbsDropped",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      orbsGathered: {
        statId: "orbsGathered",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      remainingTimeAfterQuitSeconds: {
        statId: "remainingTimeAfterQuitSeconds",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      teamScore: {
        statId: "teamScore",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      totalActivityDurationSeconds: {
        statId: "totalActivityDurationSeconds",
        basic: {
          value: 0,
          displayValue: "0"
        },
        pga: {
          value: 0,
          displayValue: "0"
        }
      },
      fastestCompletionMs: {
        statId: "fastestCompletionMs",
        basic: {
          value: 0,
          displayValue: "0"
        },
        activityId: "0"
      },
      longestKillDistance: {
        statId: "longestKillDistance",
        basic: {
          value: 0,
          displayValue: "0"
        },
        activityId: "0"
      },
      highestLightLevel: {
        statId: "highestLightLevel",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      invasions: {
        statId: "invasions",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      invasionKills: {
        statId: "invasionKills",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      invaderKills: {
        statId: "invaderKills",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      invaderDeaths: {
        statId: "invaderDeaths",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      primevalKills: {
        statId: "primevalKills",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      blockerKills: {
        statId: "blockerKills",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      mobKills: {
        statId: "mobKills",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      highValueKills: {
        statId: "highValueKills",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      motesPickedUp: {
        statId: "motesPickedUp",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      motesDeposited: {
        statId: "motesDeposited",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      motesDenied: {
        statId: "motesDenied",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      motesDegraded: {
        statId: "motesDegraded",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      motesLost: {
        statId: "motesLost",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      bankOverage: {
        statId: "bankOverage",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      smallBlockersSent: {
        statId: "smallBlockersSent",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      mediumBlockersSent: {
        statId: "mediumBlockersSent",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      largeBlockersSent: {
        statId: "largeBlockersSent",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      primevalDamage: {
        statId: "primevalDamage",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      primevalHealing: {
        statId: "primevalHealing",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      roundsPlayed: {
        statId: "roundsPlayed",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      roundsWon: {
        statId: "roundsWon",
        basic: {
          value: 0,
          displayValue: "0"
        }
      },
      fireTeamActivities: {
        statId: "fireTeamActivities",
        basic: {
          value: 0,
          displayValue: "0"
        }
      }
    }
  },
  infamy: {
    currentProgress: 0,
    progressToNextLevel: 0,
    level: 0
  },
  success: false,
  isLoading: false,
  error: false
};

export const playerReducer = (state = initial, action) => {
  switch (action.type) {
    case START_SET_DATA:
      state = { ...state, isLoading: true, success: false };
      return state;
    case SET_GAMBIT_DATA:
      const nextState = cloneDeep(state);
      if (!isEmpty(action.payload.gambitStats)) {
        nextState.gambitStats = cloneDeep(action.payload.gambitStats);
        nextState.infamy = cloneDeep(action.payload.infamy);
      }
      return nextState;
    case SET_MEMBERSHIP_DATA:
      state = cloneDeep(state);
      state.memberships = cloneDeep(action.payload.memberships);
      return state;
    case SUCCESS_SET_DATA:
      state = { ...state, success: true, isLoading: true, error: false };
      return state;
    case SET_ACTIVE_MEMBERSHIP:
      state = { ...state, activeMembership: action.payload };
      return state;
    case FINISHED_LOADING:
      state = { ...state, isLoading: false };
      return state;
    case FAIL_SET_DATA:
      state = { ...state, success: false, isLoading: false, error: true };
      return state;
    case RESET_DATA:
      state = cloneDeep(initial);
      return state;
    default:
      return state;
  }
};
