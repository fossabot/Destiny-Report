import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import player from "../reducers";

const configureStore = () => {
  const store = createStore(player, applyMiddleware(thunk));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
