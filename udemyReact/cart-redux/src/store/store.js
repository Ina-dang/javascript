import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, cartSlice } from "./index";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
