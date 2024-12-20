import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const searchInputSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    updateValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateValue } = searchInputSlice.actions;
export default searchInputSlice.reducer;
