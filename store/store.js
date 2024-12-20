import { configureStore } from "@reduxjs/toolkit";

import searchInputReducer from "./slices/searchInputSlice";
import activeCategoryReducer from "./slices/activeCategorySlice";
import specializeCategoryReducer from "./slices/specializeCategorySlice";
export const store = configureStore({
  reducer: {
    searchInput: searchInputReducer,
    activeCategory: activeCategoryReducer,
    specializeCategory: specializeCategoryReducer,
  },
});
