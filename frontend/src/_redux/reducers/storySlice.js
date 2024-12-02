import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userStories } from "../../Common/mockData";
import { STATUS } from "../../Common/Vars/Constants";

// Async thunks for all operations
export const fetchSessionStories = createAsyncThunk(
  "story/fetchSessionStories",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return userStories;
  }
);

export const selectStory = createAsyncThunk(
  "story/selectStory",
  async (storyId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return storyId;
  }
);

export const addStory = createAsyncThunk("story/addStory", async (newStory) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return newStory;
});

export const updateStory = createAsyncThunk(
  "story/updateStory",
  async (updatedStory) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return updatedStory;
  }
);

export const removeStory = createAsyncThunk(
  "story/removeStory",
  async (storyId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return storyId;
  }
);

export const assignEstimate = createAsyncThunk(
  "story/assignEstimate",
  async ({ storyId, estimate }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { storyId, estimate };
  }
);

export const setMyVote = createAsyncThunk("story/setMyVote", async (vote) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return vote;
});

const initialState = {
  stories: [],
  selectedStoryId: null,
  myVote: null,
  status: STATUS.IDLE,
  error: null,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // List of actions
    const asyncActions = [
      {
        action: fetchSessionStories,
        onFulfilled: (state, { payload }) => {
          state.stories = payload;
          if (payload.length > 0) {
            state.selectedStoryId = payload[0]?.id;
          }
        },
      },
      {
        action: selectStory,
        onFulfilled: (state, { payload }) => {
          state.selectedStoryId = payload;
        },
      },
      {
        action: addStory,
        onFulfilled: (state, { payload }) => {
          state.stories.push(payload);
        },
      },
      {
        action: updateStory,
        onFulfilled: (state, { payload }) => {
          const index = state.stories.findIndex(
            (story) => story.id === payload.id
          );
          if (index !== -1) {
            state.stories[index] = payload;
          }
        },
      },
      {
        action: removeStory,
        onFulfilled: (state, { payload }) => {
          state.stories = state.stories.filter((story) => story.id !== payload);
        },
      },
      {
        action: assignEstimate,
        onFulfilled: (state, { payload }) => {
          const story = state.stories.find(
            (story) => story.id === payload.storyId
          );
          if (story) {
            story.estimate = payload.estimate;
          }
        },
      },
      {
        action: setMyVote,
        onFulfilled: (state, { payload }) => {
          state.myVote = payload;
        },
      },
    ];

    // Add cases for each async action
    asyncActions.forEach(({ action, onFulfilled }) => {
      builder
        .addCase(action.pending, (state) => {
          state.status = STATUS.LOADING;
        })
        .addCase(action.fulfilled, (state, action) => {
          state.status = STATUS.SUCCEEDED;
          onFulfilled(state, action);
        })
        .addCase(action.rejected, (state, action) => {
          state.status = STATUS.FAILED;
          state.error = action.error.message;
        });
    });
  },
});

export default storySlice.reducer;
