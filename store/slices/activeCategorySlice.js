import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "books",
};

const activeCategorySlice = createSlice({
  name: "activeCategory",
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateCategory } = activeCategorySlice.actions;
export default activeCategorySlice.reducer;
