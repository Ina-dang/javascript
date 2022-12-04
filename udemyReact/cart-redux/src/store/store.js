import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./index";

const store = configureStore({
  reducer: { ui: uiSlice.reducer },
});

export default store;
