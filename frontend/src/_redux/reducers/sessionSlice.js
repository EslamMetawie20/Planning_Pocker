import axios from "../Config/AxiosConfig";
import WebSocketService from "../Config/WebSocketConfig";
import {
  BACKEND_ACTIONS,
  FRONTEND_ACTIONS,
  QUEUE_PATHS,
  TOPIC_PATHS,
} from "../Vars/Channels";

export async function getActiveSessionsRequestAsync() {
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
    // Subscribe to receive the response and immediately unsubscribe after receiving it
    const subscription = WebSocketService.subscribe(
      TOPIC_PATHS.SESSION_CREATED,
      (response) => {
        console.log(response);
        if (response.sessionId) {
          onSuccess(response);
        } else if (response.error) {
          onError(response.error || "Failed to create session");
        }
        subscription.unsubscribe();
      }
    );

    WebSocketService.sendMessage(BACKEND_ACTIONS.CREATE_SESSION, request);
  }, onError);
};

export const joinSessionSocket = (request, onSuccess, onError) => {
  WebSocketService.connect(() => {
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

    WebSocketService.sendMessage(BACKEND_ACTIONS.JOIN_SESSION, request);
  }, onError);
};

export const reconnectSessionSocket = (token, onSuccess, onError) => {
  WebSocketService.connect(() => {
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

    WebSocketService.sendMessage(BACKEND_ACTIONS.RECONNECT_SESSION, token);
  }, onError);
};
