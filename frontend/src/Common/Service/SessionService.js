import axios from "../Config/AxiosConfig";
import WebSocketService from "../Config/WebSocketManager";
import { BACKEND_ACTIONS } from "../Vars/Channels";

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

export const leaveSessionSocket = (request, onError) => {
  WebSocketService.connect(() => {
    WebSocketService.sendMessage(BACKEND_ACTIONS.LEAVE_SESSION(), request);
  }, onError);
};

export const endSessionSocket = (request, onError) => {
  WebSocketService.connect(() => {
    WebSocketService.sendMessage(BACKEND_ACTIONS.END_SESSION(), request);
  }, onError);
};

export const addStorySocket = (request, onError) => {
  WebSocketService.connect(() => {
    WebSocketService.sendMessage(BACKEND_ACTIONS.ADD_STORY(), request);
  }, onError);
};

export const selectStorySocket = (request, onError) => {
  WebSocketService.connect(() => {
    WebSocketService.sendMessage(BACKEND_ACTIONS.SELECT_STORY(), request);
  }, onError);
};
