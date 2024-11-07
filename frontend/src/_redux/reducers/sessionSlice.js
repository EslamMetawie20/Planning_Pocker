import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../Common/Vars/Constants";
import { addStory } from "./storySlice";
import { createSessionRequestAsync } from "../../Common/Service/SessionService";

// Async thunk to handle session creation
export const createSession = createAsyncThunk(
  "session/createSession",
  async ({ initialStory, position }, { dispatch, rejectWithValue }) => {
    try {
      const request = {
        position,
        userStories: [
          { title: initialStory?.title, description: initialStory?.content },
        ],
      };

      const response = await createSessionRequestAsync(request);

      // Adding stories to redux store
      response?.userStories
        ?.map((item) => ({
          id: item?.id,
          title: item?.title,
          estimate: 0,
          content: item?.description,
        }))
        .forEach((story) => {
          dispatch(addStory(story));
        });

      // Set session id in redux store
      return response?.id;
    } catch (error) {
      return rejectWithValue("Failed to create session");
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    sessionId: null,
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCEEDED;
        state.sessionId = payload; // Store session ID for reference
      })
      .addCase(createSession.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export default sessionSlice.reducer;
