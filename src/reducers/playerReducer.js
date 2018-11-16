const SET_MEMBERSHIP_ID = "SET_MEMBERSHIP_ID";
const START_SET_MEMBERSHIP_ID = "START_SET_MEMBERSHIP_ID";
const SUCCESS_SET_MEMBERSHIP_ID = "SUCCESS_SET_MEMBERSHIP_ID";
const FAIL_SET_MEMBERSHIP_ID = "FAIL_SET_MEMBERSHIP_ID";

const initial = {
  membershipId: 0,
  success: false,
  loading: false,
  error: false
};

export const playerReducer = (state = initial, action) => {
  switch (action.type) {
    case START_SET_MEMBERSHIP_ID:
      state = { ...state, loading: true, success: false };
      break;
    case SET_MEMBERSHIP_ID:
      state = { ...state, membershipId: action.payload.membershipId };
      break;
    case SUCCESS_SET_MEMBERSHIP_ID:
      state = { ...state, success: true, loading: false, error: false };
      break;
    case FAIL_SET_MEMBERSHIP_ID:
      state = { ...state, success: false, loading: false, error: true };
      break;
    default:
      return state;
  }
  return state;
};
