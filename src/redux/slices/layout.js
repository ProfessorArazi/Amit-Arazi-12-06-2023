import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const imageDataSlice = createSlice({
  name: "layoutData",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      // setting theme to dark or light

      state.theme = action.payload;
    },
  },
});

export const { setTheme } = imageDataSlice.actions;
export default imageDataSlice.reducer;
