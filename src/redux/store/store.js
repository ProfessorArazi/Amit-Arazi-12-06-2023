import { configureStore, combineReducers } from "@reduxjs/toolkit";
import layoutReducer from "../slices/layout";
import weatherDataReducer from "../slices/weatherData";

const rootReducer = combineReducers({
  layout: layoutReducer,
  weatherData: weatherDataReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
