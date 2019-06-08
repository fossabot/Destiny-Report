import { globalActionTypes } from "../actions/actionTypes";

const initialState = {
  showLoader: false,
  error: false,
  errorStatus: "Something Went Wrong!",
  errorMessage: "Please Try Again Later"
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case globalActionTypes.SET_LOADER:
      return { ...initialState, showLoader: payload };
    case globalActionTypes.SET_ERROR:
      return {
        showLoader: false,
        error: true,
        errorStatus: payload.errorStatus || "Something Went Wrong!",
        errorMessage: payload.errorMessage || "Please Try Again Later"
      };
    default:
      return state;
  }
};
