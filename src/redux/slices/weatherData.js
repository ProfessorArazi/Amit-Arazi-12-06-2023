import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  currentWeather: {},
  tempType: "c",
};

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites = [action.payload, ...state.favorites];
    },
    removeFavorite: (state, action) => {
      const temp = [...state.favorites];
      const index = temp.findIndex(
        (favorite) => favorite.Key === action.payload.Key
      );
      if (index > -1) temp.splice(index, 1);
      state.favorites = temp;
    },
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    setTempType: (state, action) => {
      state.tempType = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setCurrentWeather, setTempType } =
  weatherDataSlice.actions;

export default weatherDataSlice.reducer;
