import axios from "../Config/AxiosConfig";
import WebSocketService from "../Config/WebSocketConfig";
import {
  BACKEND_ACTIONS,
  FRONTEND_ACTIONS,
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

export const getSessionsSocket = (onSuccess, onError) => {
    console.log('Starting getSessionsSocket');

    // Funktion zum Senden der Anfrage
    const getIds = () => {
        try {
            // Erst subscriben
            const subscription = WebSocketService.subscribe(
                TOPIC_PATHS.SESSION_IDS_GET(), // "/topic/session/ids"
                (response) => {
                    console.log('Received session IDs:', response);
                    if (response) {
                        onSuccess(response);
                    }
                    // Optional: Subscription beenden nach Erhalt
                    // subscription.unsubscribe();
                }
            );

            // Dann Message senden
            console.log('Sending get sessions request');
            WebSocketService.sendMessage(
                BACKEND_ACTIONS.GET_SESSION_IDS(), // "/app/poker/session/ids/get"
                {} // Leerer Body, da keine Daten benötigt
            );
        } catch (err) {
            console.error('Error in getIds:', err);
            onError(err.message);
        }
    };

    // Verbindung herstellen falls nötig
    if (WebSocketService.isConnected) {
        getIds();
    } else {
        WebSocketService.connect(getIds, onError);
    }
};

export const createSessionSocket = (request, onSuccess, onCreated, onError) => {
  WebSocketService.connect(() => {
    // Subscribe to SESSION_CREATED to get the sessionId
    const subscription = WebSocketService.subscribe(
      TOPIC_PATHS.SESSION_CREATED(),
      (response) => {
        if (response.sessionId) {
          onCreated(response);

          // Subscribe to session updates once sessionId is available
          WebSocketService.subscribe(
            TOPIC_PATHS.SESSION_UPDATES(response.sessionId),
            (updateResponse) => {
              if (updateResponse) {
                onSuccess(updateResponse);
              } else if (updateResponse.error) {
                onError(updateResponse.error || "Failed to update session");
              }
            }
          );

          subscription.unsubscribe();
        } else if (response.error) {
          onError(response.error || "Failed to create session");
          subscription.unsubscribe();
        }
      }
    );

    WebSocketService.sendMessage(BACKEND_ACTIONS.CREATE_SESSION(), request);
  }, onError);
};

export const joinSessionSocket = (request, onSuccess, onJoined, onError) => {
  WebSocketService.connect(() => {
    WebSocketService.subscribe(
      TOPIC_PATHS.SESSION_UPDATES(request?.sessionId),
      (response) => {
        if (response) {
          onSuccess(response);
        } else if (response.error) {
          onError(response.error || "Failed to join session");
        }
      }
    );

    const joinSubscription = WebSocketService.subscribe(
      TOPIC_PATHS.SESSION_JOINED(),
      (response) => {
        if (response) {
          onJoined(response);
        } else if (response.error) {
          onError(response.error || "Failed to join session");
        }
        joinSubscription.unsubscribe();
      }
    );

    WebSocketService.sendMessage(BACKEND_ACTIONS.JOIN_SESSION(), request);
  }, onError);
};

export const reconnectSessionSocket = (
  request,
  onSuccess,
  onConnect,
  onError
) => {
  WebSocketService.connect(() => {
    // Subscribe to the reconnection topic
    const subscription = WebSocketService.subscribe(
      TOPIC_PATHS.SESSION_RECONNECTED(),
      (response) => {
        if (response.sessionId) {
          onConnect(response);

          // Subscribe to session updates after reconnection
          WebSocketService.subscribe(
            TOPIC_PATHS.SESSION_UPDATES(response.sessionId),
            (updateResponse) => {
              if (updateResponse) {
                onSuccess(updateResponse);
              } else if (updateResponse.error) {
                onError(updateResponse.error || "Failed to update session");
              }
            }
          );

          subscription.unsubscribe();
        } else if (response.error) {
          onError(response.error || "Failed to connect to session");
          subscription.unsubscribe();
        }
      }
    );

    // Send the reconnect request
    WebSocketService.sendMessage(BACKEND_ACTIONS.RECONNECT_SESSION(), request);
  }, onError);
};

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
