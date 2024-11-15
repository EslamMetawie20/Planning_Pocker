import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../Common/Vars/Constants";
import { getValidSessionFromToken } from "../../Common/Utils/tokenUtils";
import {
  createSessionSocket,
  joinSessionSocket,
  reconnectSessionSocket,
} from "../../Common/Service/SessionService";
import {
  dispatchSessionData,
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../../Common/Utils/sessionUtils";

const initialState = {
  sessionId: null,
  token: null,
  status: STATUS.IDLE,
  error: null,
};

// Check if there's a valid session token on app load
const savedSession = getValidSessionFromToken();
if (savedSession) {
  initialState.sessionId = savedSession.sessionId;
  initialState.token = savedSession.token;
}

export const createSession = createAsyncThunk(
  "session/createSession",
  async ({ name, initialStory }, { rejectWithValue }) => {
    const request = { name, initialStory };

    return new Promise((resolve) => {
      createSessionSocket(
        request,
        (data) => {
          const { sessionId, token } = data;
          localStorage.setItem("sessionToken", token);
          resolve({ sessionId, token });
        },
        (error) => {
          rejectWithValue(error);
        }
      );
    });
  }
);

export const joinSession = createAsyncThunk(
  "session/joinSession",
  async ({ sessionId, name }, { rejectWithValue }) => {
    const request = { sessionId, name };

    return new Promise((resolve) => {
      joinSessionSocket(
        request,
        (data) => {
          const { sessionId, token } = data;
          localStorage.setItem("sessionToken", token);
          resolve({ sessionId, token });
        },
        (error) => {
          rejectWithValue(error);
        }
      );
    });
  }
);

export const leaveSession = createAsyncThunk(
  "session/leaveSession",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      WebSocketService.close();
      dispatch(clearSession());
    } catch (error) {
      return rejectWithValue("Failed to leave the session.");
    }
  }
);

export const connectSession = createAsyncThunk(
  "session/connectSession",
  async (token, { dispatch, rejectWithValue }) => {
    return new Promise((resolve) => {
      reconnectSessionSocket(
        token,
        (data) => {
          const { sessionId, userStories, members } = data;
          dispatchSessionData(dispatch, userStories, members);
          resolve({ sessionId, token });
        },
        (error) => {
          rejectWithValue(error);
        }
      );
    });
  }
);

const thunks = [createSession, joinSession, leaveSession, connectSession];
const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearSession(state) {
      state.sessionId = null;
      state.token = null;
      localStorage.removeItem("sessionToken");
    },
  },
  extraReducers: (builder) => {
    thunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, handlePending)
        .addCase(thunk.fulfilled, handleFulfilled)
        .addCase(thunk.rejected, handleRejected);
    });
  },
});

export const { clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
