import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from "./reducers/users";
import generationReducer from "./reducers/generation";
import devicesReducer from "./reducers/devices";
import investmentReducer from "./reducers/investment";
// import toastReducer from "./reducers/toast";

const middleware = [thunk];

const allReducers = combineReducers({
  users: userReducer,
  generation: generationReducer,
  devices: devicesReducer,
  investment: investmentReducer,
  // toast: toastReducer,
});

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
