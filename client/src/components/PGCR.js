import React, { Component } from "react";
import { getPGCR } from "../utility/endpoints";
import Loading from "../components/Loading";
import { connect } from "react-redux";

class PGCR extends Component {
  state = {
    pgcr: "",
    loading: true,
    activityNotFound: false
  };
  async componentDidMount() {
    try {
      const instanceId = this.props.match.params.instanceId;
      const pgcrResult = await getPGCR(instanceId);

      this.setState({ pgcr: pgcrResult.data.Response }, () => {
        this.setState({ loading: false });
      });
    } catch (err) {
      if (err.response.data.ErrorCode === 1653) {
        this.setState({ loading: false, activityNotFound: true });
      } else if (err.response.data.ErrorCode === 5) {
        this.props.failGetData();
      }
    }
  }
  render() {
    if (!this.state.loading) {
      if (!this.state.activityNotFound) {
        return (
          <div className="pgcr-container">
            <div className="track-wrapper">
              {this.state.pgcr.entries.map((entry, index) => {
                return (
                  <div key={index} className="track-container">
                    {entry.player.destinyUserInfo.displayName}
                  </div>
                );
              })}
            </div>
          </div>
        );
      } else {
        return (
          <div className="pgcr-container">
            <div className="error_activity">Activity Not Found</div>
          </div>
        );
      }
    } else {
      return (
        <div className="pgcr-container">
          <Loading />;
        </div>
      );
    }
  }
}

const mapStoreToProps = store => {
  return {
    player: store.player
  };
};

export const failGetData = () => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch({
        type: "FAIL_SET_DATA",
        payload: "Bungie API is down at this moment, please try again later"
      });
      resolve();
    });
  };
};

export default connect(
  mapStoreToProps,
  { failGetData }
)(PGCR);
