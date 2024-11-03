import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./reducers/memberSlice";
import storyReducer from "./reducers/storySlice";

const store = configureStore({
  reducer: {
    member: memberReducer,
    story: storyReducer,
  },
});

export default store;
