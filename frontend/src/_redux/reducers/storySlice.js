import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userStories } from "../../Common/mockData";
import { STATUS } from "../../Common/Vars/Constants";

// Async thunk to fetch session stories
export const fetchSessionStories = createAsyncThunk(
  "story/fetchSessionStories",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return userStories;
  }
);

const initialState = {
  stories: [],
  selectedStoryId: null,
  status: STATUS.IDLE,
  error: null,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    selectStory(state, { payload: storyId }) {
      state.selectedStoryId = storyId;
    },
    addStory(state, { payload: newStory }) {
      state.stories.push(newStory);
    },
    removeStory(state, { payload: storyId }) {
      state.stories = state.stories.filter((story) => story.id !== storyId);
    },
    assignEstimate(state, { payload: estimate }) {
      const story = state.stories.find(
        (story) => story.id === state.selectedStoryId
      );
      if (story) {
        story.estimate = estimate;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionStories.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchSessionStories.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCEEDED;
        state.stories = payload;
        if (payload.length > 0) {
          state.selectedStoryId = payload[0]?.id;
        }
      })
      .addCase(fetchSessionStories.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { addStory, removeStory, selectStory, assignEstimate } =
  storySlice.actions;
export default storySlice.reducer;
