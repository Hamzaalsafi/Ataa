import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "الحجاوي للهندسة",
};

const specializeCategorySlice = createSlice({
  name: "specializeCategory",
  initialState,
  reducers: {
    updateSpecializeCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateSpecializeCategory } = specializeCategorySlice.actions;
export default specializeCategorySlice.reducer;
