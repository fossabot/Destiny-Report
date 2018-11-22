import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { playerReducer } from "../reducers/playerReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

let middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware = [...middleware, logger];
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ player: playerReducer }),
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
