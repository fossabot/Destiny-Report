import { createStore, combineReducers, applyMiddleware } from "redux";
import { playerReducer } from "../reducers/playerReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({ player: playerReducer }),
  applyMiddleware(thunk, logger)
);

export default store;
