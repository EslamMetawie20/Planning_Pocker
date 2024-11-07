import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./reducers/memberSlice";
import storyReducer from "./reducers/storySlice";
import sessionReducer from "./reducers/sessionSlice";

const store = configureStore({
  reducer: {
    member: memberReducer,
    story: storyReducer,
    session: sessionReducer,
  },
});

export default store;
