import { configureStore } from "@reduxjs/toolkit";
import authsliceStore from "./authslice.store";

const store = configureStore({
  reducer: {
    auth: authsliceStore,
  },
});

export default store;
