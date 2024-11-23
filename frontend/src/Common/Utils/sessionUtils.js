import { setMembers } from "../../_redux/reducers/memberSlice";
import { clearSession } from "../../_redux/reducers/sessionSlice";
import { addStory } from "../../_redux/reducers/storySlice";
import { STATUS } from "../Vars/Constants";

function formatRoleString(role) {
  return role
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const dispatchSessionData = (dispatch, userStories, members) => {
  // Dispatch addStory action for each story
  userStories.forEach((story) =>
    dispatch(
      addStory({
        id: story.id,
        title: story.title,
        estimate: story.estimate || 0,
        content: story.description,
      })
    )
  );

  if (members === null) members = [];

  // Dispatch addMember action for each member
  const mappedMembers = members.map((member) => ({
    id: member?.id,
    name: member?.name,
    avatarIndex: member?.avatarIndex ?? 0,
    lastVote: 0,
    voted: false,
    role: formatRoleString(member?.role),
  }));

  dispatch(setMembers(mappedMembers));
};

export const handleSessionUpdates = (dispatch, data) => {
  const { sessionId, userStories, participants } = data;
  if (sessionId == null || participants == null) {
    dispatch(clearSession());
  } else {
    dispatchSessionData(dispatch, [], participants);
  }
};

// Handler for pending state
export const handlePending = (state) => {
  state.status = STATUS.LOADING;
  state.error = null;
};

// Handler for fulfilled state
export const handleFulfilled = (state, { payload }) => {
  state.status = STATUS.SUCCEEDED;
  state.sessionId = payload.sessionId;
  state.token = payload.token;
};

// Handler for rejected state
export const handleRejected = (state, { payload }) => {
  state.status = STATUS.FAILED;
  state.error = payload;
};
