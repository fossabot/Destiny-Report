import axios from "axios";
export const setMembershipID = playerGamerTag => {
  return dispatch => {
    axios
      .get(
        `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/${playerGamerTag}/`,
        {
          headers: {
            "X-API-KEY": process.env.REACT_APP_API_KEY
          }
        }
      )
      .then(res => {
        if (res.data.Response.length !== 0) {
          const membershipId = res.data.Response[0].membershipId;
          dispatch({
            type: "START_SET_MEMBERSHIP_ID"
          });
          dispatch({
            type: "SET_MEMBERSHIP_ID",
            payload: { membershipId }
          });
          dispatch({
            type: "SUCCESS_SET_MEMBERSHIP_ID"
          });
          return;
        }
        dispatch({
          type: "FAIL_SET_MEMBERSHIP_ID"
        });
      });
  };
};
