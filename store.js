import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import restaurentReducer from "./features/restaurentSlice";

export default configureStore({
  reducer: {
    basket: basketReducer,
    restaurent: restaurentReducer,
  },
});
