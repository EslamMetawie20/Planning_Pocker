import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../Common/Vars/Constants";
import {
  clearTokenData,
  getValidSessionFromToken,
  setTokenData,
} from "../../Common/Utils/tokenUtils";
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
  async (request, { dispatch, rejectWithValue }) => {
    return new Promise((resolve) => {
      createSessionSocket(
        request,
        (data) => {
          const { sessionId, token } = data;
          setTokenData(token);
          resolve({ sessionId, token });
        },
        (error) => {
          dispatch(clearSession());
          rejectWithValue(error);
        }
      );
    });
  }
);

export const joinSession = createAsyncThunk(
  "session/joinSession",
  async (request, { dispatch, rejectWithValue }) => {
    return new Promise((resolve) => {
      joinSessionSocket(
        request,
        (data) => {
          const { sessionId, token } = data;
          setTokenData(token);
          resolve({ sessionId, token });
        },
        (error) => {
          dispatch(clearSession());
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
      return true;
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
          const { userStories, members } = data;
          dispatchSessionData(dispatch, userStories, members);
          resolve();
        },
        (error) => {
          dispatch(clearSession());
          rejectWithValue(error);
        }
      );
    });
  }
);

const thunkReducers = [
  createSession,
  joinSession,
  // leaveSession,
  // connectSession,
];

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearSession(state) {
      state.sessionId = null;
      state.token = null;
      clearTokenData();
    },
  },
  extraReducers: (builder) => {
    thunkReducers.forEach((thunk) => {
      builder
        .addCase(thunk.pending, handlePending)
        .addCase(thunk.fulfilled, handleFulfilled)
        .addCase(thunk.rejected, handleRejected);
    });
  },
});

export const { clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
