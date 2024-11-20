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
  stories: [], // List of stories
  selectedStoryId: null, // ID of the currently selected story
  status: STATUS.IDLE, // Status of fetching operation
  error: null, // Error message if any
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

    updateStory(state, { payload: updatedStory }) {
      const index = state.stories.findIndex(
          (story) => story.id === updatedStory.id
      );
      if (index !== -1) {
        state.stories[index] = updatedStory;
      }
    },

    removeStory(state, { payload: storyId }) {
      state.stories = state.stories.filter((story) => story.id !== storyId);
    },

    // Assign an estimate to the currently selected story
    assignEstimate(state, { payload: estimate }) {
      const story = state.stories.find(
          (story) => story.id === state.selectedStoryId
      );
      if (story) {
        story.estimate = estimate; // Update the estimate of the selected story
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

export const { addStory, updateStory, removeStory, selectStory, assignEstimate } =
    storySlice.actions;
export default storySlice.reducer;
