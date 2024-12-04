import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../Common/Vars/Constants";
import {
  addStorySocket,
  selectStorySocket,
} from "../../Common/Service/SessionService";
import { getTokenData } from "../../Common/Utils/tokenUtils";

// Async thunks for all operations
export const selectStory = createAsyncThunk(
  "session/selectStory",
  async (storyId, { dispatch, rejectWithValue }) => {
    return new Promise((resolve) => {
      const request = {
        sessionCode: getTokenData().sessionId,
        userStoryId: storyId,
      };
      selectStorySocket(request, (error) => {
        dispatch(clearSession());
        rejectWithValue(error);
      });
    });
  }
);

export const addStory = createAsyncThunk(
  "session/addStory",
  async (request, { dispatch, rejectWithValue }) => {
    return new Promise((resolve) => {
      addStorySocket(request, (error) => {
        dispatch(clearSession());
        rejectWithValue(error);
      });
    });
  }
);

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
  reducers: {
    setStories(state, { payload: newStories }) {
      state.stories = newStories;
    },
    setSelectedStoryId(state, { payload }) {
      state.selectedStoryId = payload;
    },
  },
  extraReducers: (builder) => {
    // List of actions
    const asyncActions = [
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

export const { setStories, setSelectedStoryId } = storySlice.actions;
export default storySlice.reducer;
