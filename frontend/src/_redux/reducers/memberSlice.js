import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { teamData } from "../../Common/mockData";
import { STATUS } from "../../Common/Vars/Constants";

// Async thunk to fetch session members
export const fetchSessionMembers = createAsyncThunk(
  "member/fetchSessionMembers",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return teamData;
  }
);

const initialState = {
  members: [],
  status: STATUS.IDLE,
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    addMember(state, { payload: newMember }) {
      state.members.push(newMember);
    },
    removeMember(state, { payload: memberId }) {
      state.members = state.members.filter((member) => member.id !== memberId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionMembers.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchSessionMembers.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCEEDED;
        state.members = payload;
      })
      .addCase(fetchSessionMembers.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { addMember, removeMember } = memberSlice.actions;
export default memberSlice.reducer;
