import { globalActionTypes } from "./actionTypes";

export const setLoader = value => ({
  type: globalActionTypes.SET_LOADER,
  payload: value
});

export const setError = (errorStatus, errorMessage) => ({
  type: globalActionTypes.SET_ERROR,
  payload: {
    errorStatus,
    errorMessage
  }
});
