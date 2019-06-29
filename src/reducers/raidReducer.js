import { raidActionTypes } from "../actions/actionTypes";

const initialState = {
  isFetched: false,
  data: {},
  badges: {
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
    default:
      return state;
  }
};
