import React, { Component } from "react";
import { connect } from "react-redux";
import { setMembershipID } from "../actions/playerActions";

class Player extends Component {
  async componentWillMount() {
    let { membershipId } = this.props.player;
    if (membershipId === 0 && this.props.match.params.id) {
      const id = this.props.match.params.id.toLowerCase();
      this.props.setMembershipID(id);
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <div className="characters-container">
          {this.props.player.membershipId}
        </div>
      </div>
    );
  }
}

const mapStoreToProps = store => {
  return {
    player: store.player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMembershipID: id => {
      dispatch(setMembershipID(id));
    }
  };
};
export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Player);
