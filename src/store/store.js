import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  globalReducer,
  crucibleReducer,
  loadoutReducer,
  gambitReducer
} from "../reducers";
import thunk from "redux-thunk";

export default function initializeStore(initialState) {
  const composeEnhancers = composeWithDevTools({
    trace: false,
    traceLimit: 25
  });
  return createStore(
    combineReducers({
      global: globalReducer,
      loadout: loadoutReducer,
      crucible: crucibleReducer,
      gambit: gambitReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
