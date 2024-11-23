import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../Common/Vars/Constants";
import {
  removeToken,
  generateToken,
  getToken,
  getTokenData,
  getValidSessionFromToken,
  setToken,
} from "../../Common/Utils/tokenUtils";
import {
  createSessionSocket,
  endSessionSocket,
  joinSessionSocket,
  leaveSessionSocket,
  reconnectSessionSocket,
} from "../../Common/Service/SessionService";
import {
  dispatchSessionData,
  handleFulfilled,
  handlePending,
  handleRejected,
  handleSessionUpdates,
} from "../../Common/Utils/sessionUtils";

const initialState = {
  sessionId: null,
  token: null,
  isScrumMaster: null,
  status: STATUS.IDLE,
  error: null,
};

export const createSession = createAsyncThunk(
  "session/createSession",
  async (request, { dispatch, rejectWithValue }) => {
    return new Promise((resolve) => {
      createSessionSocket(
        request,
        (data) => {
          handleSessionUpdates(dispatch, data);
        },
        (data) => {
          handleSessionUpdates(dispatch, data);
          const { sessionId } = data;
          const token = generateToken(data);
          setToken(token);
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
          handleSessionUpdates(dispatch, data);
        },
        (data) => {
          const { sessionId } = data;
          const token = generateToken(data);
          setToken(token);
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

export const connectSession = createAsyncThunk(
  "session/connectSession",
  async (_, { dispatch, rejectWithValue }) => {
    return new Promise((resolve) => {
      const { sessionId, memberId } = getTokenData();
      const request = { sessionId, userId: memberId };
      reconnectSessionSocket(
        request,
        (data) => {
          handleSessionUpdates(dispatch, data);
        },
        (data) => {
          handleSessionUpdates(dispatch, data);
          const { sessionId } = getTokenData();
          const token = getToken();
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
      return new Promise((resolve, reject) => {
        // Get sessionId and memberId from the token
        const { sessionId, memberId } = getTokenData();

        if (!sessionId || !memberId) {
          rejectWithValue("No session or member data available.");
          return;
        }

        const request = { sessionId, userId: memberId };
        leaveSessionSocket(request, (error) => {
          if (error) {
            reject(error || "Failed to leave the session.");
            return;
          }
        });
        dispatch(clearSession());
      });
    } catch (error) {
      return rejectWithValue("Failed to leave the session.");
    }
  }
);

export const endSession = createAsyncThunk(
  "session/endSession",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return new Promise((resolve, reject) => {
        // Get sessionId and memberId from the token
        const { sessionId, memberId } = getTokenData();

        if (!sessionId || !memberId) {
          rejectWithValue("No session or member data available.");
          return;
        }

        const request = { sessionId, userId: memberId };
        endSessionSocket(request, (error) => {
          if (error) {
            reject(error || "Failed to close the session.");
            return;
          }
        });
        dispatch(clearSession());
      });
    } catch (error) {
      return rejectWithValue("Failed to close the session.");
    }
  }
);

const thunkReducers = [
  createSession,
  joinSession,
  connectSession,
  // leaveSession,
  // endSession,
];

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setScrumMaster(state, payload) {
      state.isScrumMaster = payload;
    },
    clearSession(state) {
      state.sessionId = null;
      state.token = null;
      removeToken();
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

export const { clearSession, setScrumMaster } = sessionSlice.actions;
export default sessionSlice.reducer;
