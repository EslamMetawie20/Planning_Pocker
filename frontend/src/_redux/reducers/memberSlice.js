import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../Common/Vars/Constants";

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
      const memberExists = state.members.some(
        (member) => member.id === newMember.id
      );
      if (!memberExists) {
        state.members.push(newMember);
      }
    },
    removeMember(state, { payload: memberId }) {
      state.members = state.members.filter((member) => member.id !== memberId);
    },
  },
});

export const { addMember, removeMember } = memberSlice.actions;
export default memberSlice.reducer;
