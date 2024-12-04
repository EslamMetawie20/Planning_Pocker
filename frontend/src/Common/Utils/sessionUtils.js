import { setMembers } from "../../_redux/reducers/memberSlice";
import { clearSession } from "../../_redux/reducers/sessionSlice";
import {
  setSelectedStoryId,
  setStories,
} from "../../_redux/reducers/storySlice";
import { sendMessage } from "../../_redux/reducers/webSocketSlice";
import WebSocketManager from "../Config/WebSocketManager";
import { TOPIC_PATHS } from "../Vars/Channels";
import { STATUS } from "../Vars/Constants";
import { generateToken, getToken, setToken } from "./tokenUtils";

function formatRoleString(role) {
  return role
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const dispatchSessionData = (dispatch, data) => {
  const { userStories, participants, currentUserStoryId } = data;
  let mappedCurrentStoryId = currentUserStoryId;

  if (userStories === null) userStories = [];
  // Dispatch addStory action for each story
  const mappedStories = userStories.map((story) => ({
    id: story?.id,
    title: story?.title,
    estimate: story?.estimate || 0,
    content: story?.description,
  }));

  dispatch(setStories(mappedStories));

  if (participants === null) participants = [];
  // Dispatch addMember action for each member
  const mappedMembers = participants.map((member) => ({
    id: member?.id,
    name: member?.name,
    avatarIndex: member?.avatarIndex ?? 0,
    lastVote: 0,
    voted: false,
    role: formatRoleString(member?.role),
  }));

  dispatch(setMembers(mappedMembers));

  if (mappedCurrentStoryId === null && mappedStories?.length > 0)
    mappedCurrentStoryId = mappedStories[0]?.id;

  dispatch(setSelectedStoryId(mappedCurrentStoryId));
};

export const handleSessionUpdates = (dispatch, data) => {
  const { sessionId, participants } = data;
  if (sessionId == null || participants == null) {
    dispatch(clearSession());
  } else {
    dispatchSessionData(dispatch, data);
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

export const handleSessionResponse = async (
  dispatch,
  destination,
  subscription,
  request,
  resolve,
  reject,
  keepToken = false
) => {
  try {
    // Check if WebSocket is fully connected
    if (await WebSocketManager.isFullyConnectedAsync()) {
      // Subscribe to the session creation topic
      WebSocketManager.subscribe(subscription, (data) => {
        try {
          // Handle session updates and extract sessionId and token
          handleSessionUpdates(dispatch, data);
          const { sessionId } = data;

          let token;
          if (keepToken) {
            token = getToken();
          } else {
            token = generateToken(data);
            setToken(token);
          }

          WebSocketManager.unsubscribe(destination); // Unsubscribe to prevent duplicate handling
          resolve({ sessionId, token });
        } catch (error) {
          console.error("Error handling session creation message:", error);
          reject(error); // Reject if processing the message fails
        }
      });

      WebSocketManager.subscribe(TOPIC_PATHS.SESSION_UPDATES(), (data) =>
        handleSessionUpdates(dispatch, data)
      );

      // Send the create session request via WebSocket
      const action = {
        destination,
        body: request,
      };
      dispatch(sendMessage(action));
    } else {
      throw new Error("WebSocket is not connected.");
    }
  } catch (error) {
    console.error("Failed to create session:", error);
    reject(error); // Reject if WebSocket is not connected or other errors occur
  }
};
