import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { globalReducer, crucibleReducer, loadoutReducer } from "../reducers";
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
      crucible: crucibleReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
