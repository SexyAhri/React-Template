import { combineReducers } from "redux";

import weatherReducer from "../modules/weather/reducers/weatherReducers";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;
