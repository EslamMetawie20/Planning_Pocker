import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../Common/Vars/Constants";
import { getTokenData } from "../../Common/Utils/tokenUtils";
import { sendMessage } from "./webSocketSlice";
import WebSocketManager from "../../Common/Config/WebSocketManager";
import { BACKEND_ACTIONS } from "../../Common/Vars/Channels";

// Async thunks for all operations
export const selectStory = createAsyncThunk(
  "session/selectStory",
  async (storyId, { dispatch }) => {
    return new Promise(async () => {
      if (await WebSocketManager.isFullyConnectedAsync()) {
        const destination = BACKEND_ACTIONS.SELECT_STORY();
        const request = {
          sessionCode: getTokenData().sessionId,
          userStoryId: storyId,
        };

        const action = { destination, body: request };
        dispatch(sendMessage(action));
      }
    });
  }
);

export const addStory = createAsyncThunk(
  "session/addStory",
  async (request, { dispatch }) => {
    return new Promise(async () => {
      if (await WebSocketManager.isFullyConnectedAsync()) {
        const destination = BACKEND_ACTIONS.ADD_STORY();
        const action = { destination, body: request };
        dispatch(sendMessage(action));
      }
    });
  }
);

export const updateStory = createAsyncThunk(
  "story/updateStory",
  async (request, { dispatch }) => {
    if (await WebSocketManager.isFullyConnectedAsync()) {
      const destination = BACKEND_ACTIONS.UPDATE_STORY();
      const action = { destination, body: request };
      dispatch(sendMessage(action));
    }
  }
);

export const removeStory = createAsyncThunk(
  "story/removeStory",
  async (request, { dispatch }) => {
    if (await WebSocketManager.isFullyConnectedAsync()) {
      const destination = BACKEND_ACTIONS.DELETE_STORY();
      const action = { destination, body: request };
      dispatch(sendMessage(action));
    }
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
  selectedStory: null,
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
    setSelectedStory(state, { payload }) {
      state.selectedStory = payload;
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

export const { setStories, setSelectedStory } = storySlice.actions;
export default storySlice.reducer;
