import axios from "../Config/AxiosConfig";
import WebSocketService from "../Config/WebSocketConfig";
import {
  BACKEND_ACTIONS,
  FRONTEND_ACTIONS,
  QUEUE_PATHS,
} from "../Vars/Channels";

export async function getSessionIds() {
  try {
    const response = await axios.get(`/api/sessions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching session IDs:", error);
    throw error;
  }
}

export async function createSessionRequestAsync(request) {
  try {
    const response = await axios.post(`/api/sessions`, request);
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
}

export const createSessionSocket = (request, onSuccess, onError) => {
  WebSocketService.connect(() => {
    WebSocketService.sendMessage(BACKEND_ACTIONS.CREATE_SESSION, request);

    // Subscribe to receive the response and immediately unsubscribe after receiving it
    const subscription = WebSocketService.subscribe(
      QUEUE_PATHS.RECEIVE_MESSAGE,
      (response) => {
        if (response.action === FRONTEND_ACTIONS.SESSION_CREATED) {
          onSuccess(response.data);
        } else if (
          response.action === FRONTEND_ACTIONS.SESSION_CREATION_FAILED
        ) {
          onError(response.error || "Failed to create session");
        }
        subscription.unsubscribe();
      }
    );
  }, onError);
};

export const joinSessionSocket = (request, onSuccess, onError) => {
  WebSocketService.connect(() => {
    WebSocketService.sendMessage(BACKEND_ACTIONS.JOIN_SESSION, request);

    const subscription = WebSocketService.subscribe(
      QUEUE_PATHS.RECEIVE_MESSAGE,
      (response) => {
        if (response.action === FRONTEND_ACTIONS.SESSION_JOINED) {
          onSuccess(response.data);
        } else if (response.action === FRONTEND_ACTIONS.SESSION_JOIN_FAILED) {
          onError(response.error || "Failed to join session");
        }
        subscription.unsubscribe();
      }
    );
  }, onError);
};

export const reconnectSessionSocket = (token, onSuccess, onError) => {
  WebSocketService.connect(() => {
    WebSocketService.sendMessage(BACKEND_ACTIONS.RECONNECT_SESSION, token);

    const subscription = WebSocketService.subscribe(
      QUEUE_PATHS.RECEIVE_MESSAGE,
      (response) => {
        if (response.action === FRONTEND_ACTIONS.SESSION_RECONNECTED) {
          onSuccess(response.data);
        } else if (
          response.action === FRONTEND_ACTIONS.SESSION_RECONNECT_FAILED
        ) {
          onError(response.error || "Failed to reconnect session");
        }
        subscription.unsubscribe();
      }
    );
  }, onError);
};
