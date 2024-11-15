import { addMember } from "../../_redux/reducers/memberSlice";
import { addStory } from "../../_redux/reducers/storySlice";

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

  // Dispatch addMember action for each member
  members.forEach((member) =>
    dispatch(
      addMember({
        id: member.id,
        name: member.name,
        avatarIndex: member.avatarIndex,
        lastVote: 0,
        voted: false,
      })
    )
  );
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
