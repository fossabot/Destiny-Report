import React, { Component } from "react";
import { connect } from "react-redux";
import {
  resetTheStateAction,
  setMembershipInfoAction,
  setGambitProgressionAction,
  setCrucibleProgressionAction,
  setRaidProgressionAction,
  setActiveMembership,
  startSetDataAction,
  setOverallRaidAcitivitesPlayed
} from "../actions/playerActions";
import MultiMembershipPopup from "./MultiMembershipPopup";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";
import Tooltip from "./Tooltip";
import Chart from "./Chart";

class Raid extends Component {
  state = {
    isMore: false
  };
  async componentWillMount() {
    try {
      const { memberships } = this.props.player;
      if (memberships.length === 0 && this.props.match.params.id) {
        const playerGamerTag = this.props.match.params.id.toLowerCase();
        await this.props.startSetDataAction();
        const playerMemberships = await this.props.setMembershipInfoAction(
          playerGamerTag
        );
        const activeMembership = this.props.player.activeMembership;

        if (
          this.props.player.memberships.length > 1 &&
          activeMembership === -1
        ) {
          this.setState({ isMore: true });
          return;
        }

        await this.props.setActiveMembership(0);
        this.props.setOverallRaidAcitivitesPlayed(
          playerMemberships[0].membershipType,
          playerMemberships[0].membershipId
        );
        await this.props.setRaidProgressionAction(
          playerMemberships[0].membershipType,
          playerMemberships[0].membershipId
        );
        this.props.setGambitProgressionAction(
          playerMemberships[0].membershipType,
          playerMemberships[0].membershipId
        );
        this.props.setCrucibleProgressionAction(
          playerMemberships[0].membershipType,
          playerMemberships[0].membershipId
        );
        return;
      }
      if (this.props.player.memberships.length === 0) {
        this.props.history.push("/");
      }
    } catch (err) {
      console.log(err);
      this.props.history.push("/");
    }
  }

  handleMembershipType = async event => {
    const index = event.target.value;
    const memberships = this.props.player.memberships;
    this.setState({ isMore: false });
    await this.props.startSetDataAction();
    await this.props.setActiveMembership(index);
    this.props.setOverallRaidAcitivitesPlayed(
      memberships[index].membershipType,
      memberships[index].membershipId
    );
    await this.props.setRaidProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );
    this.props.setGambitProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );
    this.props.setCrucibleProgressionAction(
      memberships[index].membershipType,
      memberships[index].membershipId
    );

    this.setState({ isMore: false });
    this.props.history.push(`/raid/${memberships[index].displayName}`);
  };

  handleBadgeClick = instanceId => {
    this.props.history.push(`/pgcr/${instanceId}`);
  };

  render() {
    const {
      raidIsLoading,
      isApiLoading,
      raidActivitiesLoading
    } = this.props.player;

    const raid = {
      lastWish: { normalCompletions: 0, guided: 0 },
      SotP: { normalCompletions: 0, guided: 0 },
      EoW: { normalCompletions: 0, prestigeCompletions: 0, guided: 0 },
      SoS: { normalCompletions: 0, prestigeCompletions: 0, guided: 0 },
      leviathan: { normalCompletions: 0, prestigeCompletions: 0, guided: 0 },
      badges: {
        leviathan: {
          flawless: { value: false, instanceId: "" },
          dayOne: { value: false, instanceId: "" },
          weekOne: { value: false, instanceId: "" },
          fourMan: { value: false, instanceId: "" },
          threeMan: { value: false, instanceId: "" },
          twoMan: { value: false, instanceId: "" }
        },
        EoW: {
          flawless: { value: false, instanceId: "" },
          dayOne: { value: false, instanceId: "" },
          weekOne: { value: false, instanceId: "" },
          fourMan: { value: false, instanceId: "" },
          threeMan: { value: false, instanceId: "" },
          twoMan: { value: false, instanceId: "" }
        },
        SoS: {
          flawless: { value: false, instanceId: "" },
          dayOne: { value: false, instanceId: "" },
          weekOne: { value: false, instanceId: "" },
          fourMan: { value: false, instanceId: "" },
          threeMan: { value: false, instanceId: "" },
          twoMan: { value: false, instanceId: "" }
        },
        lastWish: {
          flawless: { value: false, instanceId: "" },
          dayOne: { value: false, instanceId: "" },
          weekOne: { value: false, instanceId: "" },
          fourMan: { value: false, instanceId: "" },
          threeMan: { value: false, instanceId: "" },
          twoMan: { value: false, instanceId: "" }
        },
        SotP: {
          flawless: { value: false, instanceId: "" },
          dayOne: { value: false, instanceId: "" },
          weekOne: { value: false, instanceId: "" },
          fourMan: { value: false, instanceId: "" },
          threeMan: { value: false, instanceId: "" },
          twoMan: { value: false, instanceId: "" }
        }
      }
    };
    if (!raidIsLoading) {
      if (this.props.player.raid.badges !== undefined) {
        raid.badges = this.props.player.raid.badges;
      }
      raid.petrasRun = this.props.player.raid.petrasRun;
      raid.likeADiamond = this.props.player.raid.likeADiamond;
      for (let i = 0; i < this.props.player.raid.stats.length; ++i) {
        if (
          this.props.player.raid.stats[i][`character${i + 1}`] !== undefined
        ) {
          this.props.player.raid.stats[i][`character${i + 1}`].forEach(elm => {
            if (elm.activityHash === 2122313384) {
              raid.lastWish.normalCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 1661734046) {
              raid.lastWish.guided +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 548750096) {
              raid.SotP.normalCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 2812525063) {
              raid.SotP.guided += elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 3089205900) {
              raid.EoW.normalCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 2164432138) {
              raid.EoW.guided += elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 809170886) {
              raid.EoW.prestigeCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 119944200) {
              raid.SoS.normalCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 3213556450) {
              raid.SoS.prestigeCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (elm.activityHash === 3004605630) {
              raid.SoS.guided += elm.values.activityCompletions.basic.value;
            } else if (
              elm.activityHash === 2693136600 ||
              elm.activityHash === 2693136601 ||
              elm.activityHash === 2693136602 ||
              elm.activityHash === 2693136603 ||
              elm.activityHash === 2693136604 ||
              elm.activityHash === 2693136605
            ) {
              raid.leviathan.normalCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (
              elm.activityHash === 417231112 ||
              elm.activityHash === 757116822 ||
              elm.activityHash === 1685065161 ||
              elm.activityHash === 2449714930 ||
              elm.activityHash === 3446541099 ||
              elm.activityHash === 3879860661
            ) {
              raid.leviathan.prestigeCompletions +=
                elm.values.activityCompletions.basic.value;
            } else if (
              elm.activityHash === 287649202 ||
              elm.activityHash === 3916343513 ||
              elm.activityHash === 4039317196 ||
              elm.activityHash === 89727599 ||
              elm.activityHash === 1875726950 ||
              elm.activityHash === 1699948563
            ) {
              raid.leviathan.guided +=
                elm.values.activityCompletions.basic.value;
            }
          });
        }
      }
    }

    const trackContainer = (
      <div className="track-wrapper">
        <div className="track-container">
          <div>
            <h4>Scourge of the Past</h4>
          </div>
          <ul>
            <li>Normal: {raid.SotP.normalCompletions}</li>
            <li>Guided: {raid.SotP.guided}</li>
          </ul>
          <div className="raid-badges-container">
            <ul className="raid-badges-list">
              {raid.badges.SotP.flawless.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SotP.flawless.instanceId)
                  }
                >
                  <Tooltip
                    name="Flawless"
                    tooltip="Completed the whole raid without anyone in the fireteam dies"
                  />
                </li>
              )}
              {raid.likeADiamond && (
                <li>
                  <Tooltip
                    name="Like a Diamond"
                    tooltip="Completed Like a Diamond triumph"
                  />
                </li>
              )}
              {raid.badges.SotP.dayOne.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SotP.dayOne.instanceId)
                  }
                >
                  <Tooltip
                    name="Day one"
                    tooltip="Finished the raid within 24 hours"
                  />
                </li>
              )}
              {raid.badges.SotP.weekOne.value &&
                !raid.badges.SotP.dayOne.value && (
                  <li
                    onClick={() =>
                      this.handleBadgeClick(raid.badges.SotP.weekOne.instanceId)
                    }
                  >
                    <Tooltip
                      name="Week one"
                      tooltip="Finished the raid within 168 hours"
                    />
                  </li>
                )}
              {raid.badges.SotP.twoMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SotP.twoMan.instanceId)
                  }
                >
                  <Tooltip
                    name="Two man"
                    tooltip="Completed the raid with a fireteam of two"
                  />
                </li>
              )}
              {raid.badges.SotP.threeMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SotP.threeMan.instanceId)
                  }
                >
                  <Tooltip
                    name="Three man"
                    tooltip="Completed the raid with a fireteam of three"
                  />
                </li>
              )}
              {raid.badges.SotP.fourMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SotP.fourMan.instanceId)
                  }
                >
                  <Tooltip
                    name="Four man"
                    tooltip="Completed the raid with a fireteam of four"
                  />
                </li>
              )}
            </ul>
          </div>
          {!raidActivitiesLoading && (
            <Chart data={this.props.player.raid.activities.SotP} />
          )}
        </div>

        <div className="track-container">
          <div>
            <h4>Last Wish</h4>
          </div>
          <ul>
            <li>Normal: {raid.lastWish.normalCompletions}</li>
            <li>Guided: {raid.lastWish.guided}</li>
          </ul>
          <div className="raid-badges-container">
            <ul className="raid-badges-list">
              {raid.badges.lastWish.flawless.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(
                      raid.badges.lastWish.flawless.instanceId
                    )
                  }
                >
                  <Tooltip
                    name="Flawless"
                    tooltip="Completed the whole raid without anyone in the fireteam dies"
                  />
                </li>
              )}
              {raid.petrasRun && (
                <li>
                  <Tooltip
                    name="Petra's Run"
                    tooltip="Completed Petra's run triumph"
                  />
                </li>
              )}
              {raid.badges.lastWish.dayOne.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(
                      raid.badges.lastWish.dayOne.instanceId
                    )
                  }
                >
                  <Tooltip
                    name="Day one"
                    tooltip="Finished the raid within 24 hours"
                  />
                </li>
              )}
              {raid.badges.lastWish.weekOne.value &&
                !raid.badges.lastWish.dayOne.value && (
                  <li
                    onClick={() =>
                      this.handleBadgeClick(
                        raid.badges.lastWish.weekOne.instanceId
                      )
                    }
                  >
                    <Tooltip
                      name="Week one"
                      tooltip="Finished the raid within 168 hours"
                    />
                  </li>
                )}
              {raid.badges.lastWish.twoMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(
                      raid.badges.lastWish.twoMan.instanceId
                    )
                  }
                >
                  <Tooltip
                    name="Two man"
                    tooltip="Completed the raid with a fireteam of two"
                  />
                </li>
              )}
              {raid.badges.lastWish.threeMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(
                      raid.badges.lastWish.threeMan.instanceId
                    )
                  }
                >
                  <Tooltip
                    name="Three man"
                    tooltip="Completed the raid with a fireteam of three"
                  />
                </li>
              )}
              {raid.badges.lastWish.fourMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(
                      raid.badges.lastWish.fourMan.instanceId
                    )
                  }
                >
                  <Tooltip
                    name="Four man"
                    tooltip="Completed the raid with a fireteam of four"
                  />
                </li>
              )}
            </ul>
          </div>
          {!raidActivitiesLoading && (
            <Chart data={this.props.player.raid.activities.lastWish} />
          )}
        </div>

        <div className="track-container">
          <div>
            <h4>Leviathan</h4>
          </div>
          <ul className="center-ul">
            <li>Normal: {raid.leviathan.normalCompletions}</li>
            <li>Guided: {raid.leviathan.guided}</li>
            <li>Prestige: {raid.leviathan.prestigeCompletions}</li>
          </ul>
          <div className="raid-badges-container">
            <ul className="raid-badges-list">
              {raid.badges.leviathan.flawless.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(
                      raid.badges.leviathan.flawless.instanceId
                    )
                  }
                >
                  <Tooltip
                    name="Flawless"
                    tooltip="Completed the whole raid without anyone in the fireteam dies"
                  />
                </li>
              )}
              {raid.badges.leviathan.dayOne.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(
                      raid.badges.leviathan.dayOne.instanceId
                    )
                  }
                >
                  <Tooltip
                    name="Day one"
                    tooltip="Finished the raid within 24 hours"
                  />
                </li>
              )}
              {raid.badges.leviathan.weekOne.value &&
                !raid.badges.leviathan.dayOne.value && (
                  <li
                    onClick={() =>
                      this.handleBadgeClick(
                        raid.badges.leviathan.weekOne.instanceId
                      )
                    }
                  >
                    <Tooltip
                      name="Week one"
                      tooltip="Finished the raid within 168 hours"
                    />
                  </li>
                )}
              {raid.badges.leviathan.twoMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(
                      raid.badges.leviathan.twoMan.instanceId
                    )
                  }
                >
                  <Tooltip
                    name="Two man"
                    tooltip="Completed the raid with a fireteam of two"
                  />
                </li>
              )}
              {raid.badges.leviathan.threeMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(
                      raid.badges.leviathan.threeMan.instanceId
                    )
                  }
                >
                  <Tooltip
                    name="Three man"
                    tooltip="Completed the raid with a fireteam of three"
                  />
                </li>
              )}
              {raid.badges.leviathan.fourMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(
                      raid.badges.leviathan.fourMan.instanceId
                    )
                  }
                >
                  <Tooltip
                    name="Four man"
                    tooltip="Completed the raid with a fireteam of four"
                  />
                </li>
              )}
            </ul>
          </div>
          {!raidActivitiesLoading && (
            <Chart data={this.props.player.raid.activities.leviathan} />
          )}
        </div>

        <div className="track-container">
          <div>
            <h4>Eater of Worlds</h4>
          </div>
          <ul className="center-ul">
            <li>Normal: {raid.EoW.normalCompletions}</li>
            <li>Guided: {raid.EoW.guided}</li>
            <li>Prestige: {raid.EoW.prestigeCompletions}</li>
          </ul>
          <div className="raid-badges-container">
            <ul className="raid-badges-list">
              {raid.badges.EoW.flawless.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.EoW.weekOne.instanceId)
                  }
                >
                  <Tooltip
                    name="Flawless"
                    tooltip="Completed the whole raid without anyone in the fireteam dies"
                  />
                </li>
              )}
              {raid.badges.EoW.dayOne.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.EoW.dayOne.instanceId)
                  }
                >
                  <Tooltip
                    name="Day one"
                    tooltip="Finished the raid within 24 hours"
                  />
                </li>
              )}
              {raid.badges.EoW.weekOne.value && !raid.badges.EoW.dayOne.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.EoW.weekOne.instanceId)
                  }
                >
                  <Tooltip
                    name="Week one"
                    tooltip="Finished the raid within 168 hours"
                  />
                </li>
              )}
              {raid.badges.EoW.twoMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.EoW.twoMan.instanceId)
                  }
                >
                  <Tooltip
                    name="Two man"
                    tooltip="Completed the raid with a fireteam of two"
                  />
                </li>
              )}
              {raid.badges.EoW.threeMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.EoW.threeMan.instanceId)
                  }
                >
                  <Tooltip
                    name="Three man"
                    tooltip="Completed the raid with a fireteam of three"
                  />
                </li>
              )}
              {raid.badges.EoW.fourMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.EoW.fourMan.instanceId)
                  }
                >
                  <Tooltip
                    name="Four man"
                    tooltip="Completed the raid with a fireteam of four"
                  />
                </li>
              )}
            </ul>
          </div>
          {!raidActivitiesLoading && (
            <Chart data={this.props.player.raid.activities.EoW} />
          )}
        </div>

        <div className="track-container">
          <div>
            <h4>Spire of Stars</h4>
          </div>
          <ul className="center-ul">
            <li>Normal: {raid.SoS.normalCompletions}</li>
            <li>Guided: {raid.SoS.guided}</li>
            <li>Prestige: {raid.SoS.prestigeCompletions}</li>
          </ul>
          <div className="raid-badges-container">
            <ul className="raid-badges-list">
              {raid.badges.SoS.flawless.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SoS.flawless.instanceId)
                  }
                >
                  <Tooltip
                    name="Flawless"
                    tooltip="Completed the whole raid without anyone in the fireteam dies"
                  />
                </li>
              )}
              {raid.badges.SoS.dayOne.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SoS.dayOne.instanceId)
                  }
                >
                  <Tooltip
                    name="Day one"
                    tooltip="Finished the raid within 24 hours"
                  />
                </li>
              )}
              {raid.badges.SoS.weekOne.value && !raid.badges.SoS.dayOne.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SoS.weekOne.instanceId)
                  }
                >
                  <Tooltip
                    name="Week one"
                    tooltip="Finished the raid within 168 hours"
                  />
                </li>
              )}
              {raid.badges.SoS.twoMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SoS.twoMan.instanceId)
                  }
                >
                  <Tooltip
                    name="Two man"
                    tooltip="Completed the raid with a fireteam of two"
                  />
                </li>
              )}
              {raid.badges.SoS.threeMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SoS.threeMan.instanceId)
                  }
                >
                  <Tooltip
                    name="Three man"
                    tooltip="Completed the raid with a fireteam of three"
                  />
                </li>
              )}
              {raid.badges.SoS.fourMan.value && (
                <li
                  onClick={() =>
                    this.handleBadgeClick(raid.badges.SoS.fourMan.instanceId)
                  }
                >
                  <Tooltip
                    name="Four man"
                    tooltip="Completed the raid with a fireteam of four"
                  />
                </li>
              )}
            </ul>
          </div>

          {!raidActivitiesLoading && (
            <Chart data={this.props.player.raid.activities.SoS} />
          )}
        </div>
      </div>
    );

    const progression =
      raidIsLoading || this.state.isMore ? <Loading /> : trackContainer;

    return (
      <div className="infamy-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Raid</title>
        </Helmet>
        {this.state.isMore && (
          <MultiMembershipPopup
            handleMembershipType={this.handleMembershipType}
          />
        )}
        {progression}
        {isApiLoading && (
          <div className="raid-badges-update-popup">
            Updating your raid badges, please wait...
          </div>
        )}
      </div>
    );
  }
}

const mapStoreToProps = store => {
  return {
    player: store.player
  };
};

export default connect(
  mapStoreToProps,
  {
    resetTheStateAction,
    setMembershipInfoAction,
    setGambitProgressionAction,
    setCrucibleProgressionAction,
    setRaidProgressionAction,
    setActiveMembership,
    startSetDataAction,
    setOverallRaidAcitivitesPlayed
  }
)(Raid);
