import { raidActionTypes } from "../actions/actionTypes";

const initialState = {
  isFetched: false,
  isUpdated: false,
  isUpdateFailed: false,
  data: {},
  badges: {
    isFetched: false,
    data: {}
  },
  activities: {
    isFetched: false,
    data: {}
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case raidActionTypes.SET_RAID_DATA:
      return { ...state, isFetched: true, data: payload };
    case raidActionTypes.RESET_RAID_DATA:
      return initialState;
    case raidActionTypes.SET_RAID_BADGES:
      return {
        ...state,
        badges: { ...state.badges, isFetched: true, data: payload }
      };
    case raidActionTypes.UPDATE_RAID_BADGES:
      return {
        ...state,
        isUpdated: true,
        isUpdateFailed: false,
        badges: {
          isFetched: true,
          data: payload
        }
      };
    case raidActionTypes.FAIL_UPDATE_RAID_BADGES:
      return {
        ...state,
        isFetched: true,
        isUpdated: true,
        isUpdateFailed: true
      };
    case raidActionTypes.SET_ACTIVITIES_PLAYED:
      return {
        ...state,
        activities: {
          isFetched: true,
          data: payload
        }
      };
    default:
      return state;
  }
};
