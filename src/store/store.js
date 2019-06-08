import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { globalReducer } from "../reducers";
import thunk from "redux-thunk";

export default function initializeStore() {
  const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25
  });
  return createStore(
    combineReducers({
      global: globalReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
}
