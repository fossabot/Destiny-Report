import {
  globalActionTypes,
  crucibleActionTypes,
  gambitActionTypes,
  loadoutActionTypes
} from "./actionTypes";

export const setLoader = value => ({
  type: globalActionTypes.SET_LOADER,
  payload: value
});

const defaultError = {
  errorStatus: "Something Went Wrong!",
  errorMessage: "Please Try Again Later"
};

export const setError = (
  active,
  errorStatus = defaultError.errorStatus,
  errorMessage = defaultError.errorMessage
) => ({
  type: globalActionTypes.SET_ERROR,
  payload: {
    errorStatus,
    errorMessage,
    active
  }
});
export const resetPlayerData = () => dispatch => {
  dispatch({
    type: loadoutActionTypes.RESET_LOADOUT
  });
  dispatch({
    type: crucibleActionTypes.RESET_CRUCIBLE_DATA
  });
  dispatch({
    type: gambitActionTypes.RESET_GAMBIT_DATA
  });
};
