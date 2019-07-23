import React from "react";
import initializeStore from "../src/store";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const initialState = {
        global: {
          showLoader: false,
          error: false,
          errorStatus: "Something Went Wrong!",
          errorMessage: "Please Try Again Later"
        },
        world: {
          xur: {
            isFetched: false,
            isHere: false,
            location: "",
            leavesOn: "",
            comesBackOn: "",
            items: []
          }
        },
        player: {
          isFetched: false,
          data: {}
        },
        loadout: {
          isFetched: false,
          data: []
        },
        crucible: {
          isFetched: false,
          data: {},
          matches: {
            isFetched: false,
            data: []
          }
        },
        gambit: {
          isFetched: false,
          data: {},
          matches: {
            isFetched: false,
            data: []
          }
        },
        raid: {
          isFetched: false,
          isUpdated: false,
          isUpdateFailed: false,
          data: {},
          badges: {
            isFetched: false,
            data: {}
          }
        }
      };

      const reduxStore = getOrCreateStore(initialState);

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
