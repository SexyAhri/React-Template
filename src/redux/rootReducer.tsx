import { combineReducers } from "redux";
import counterReducer from "./counterSlice";
import userReducer from "../modules/user/reducers/userReducers";
import weatherReducer from "../modules/weather/reducers/weatherReducers";

const rootReducer = combineReducers({
  user: userReducer,
  weather: weatherReducer,
  counter: counterReducer,
});

export default rootReducer;
