import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  static instance = null;
  stompClient = null;
  isConnected = false;

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(onConnectCallback, onErrorCallback) {
    if (this.isConnected) {
      if (onConnectCallback) onConnectCallback();
      return;
    }

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const sockJsUrl = apiUrl.replace(/^http/, "http") + "/planning-poker";

    // Initialize the STOMP client using SockJS
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(sockJsUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Define the STOMP client's onConnect behavior
    this.stompClient.onConnect = (frame) => {
      console.log("Connected to STOMP with SockJS");
      this.isConnected = true;
      if (onConnectCallback) onConnectCallback(frame);
    };

    // Define the STOMP client's onDisconnect behavior
    this.stompClient.onStompError = (error) => {
      console.error("STOMP error:", error);
      this.isConnected = false;
      if (onErrorCallback) onErrorCallback(error);
    };

    this.stompClient.onWebSocketClose = (error) => {
      this.isConnected = false;
      if (onErrorCallback) onErrorCallback(error);
    };

    this.stompClient.onWebSocketError = (error) => {
      this.isConnected = false;
      if (onErrorCallback) onErrorCallback(error);
    };

    // Activate the STOMP client to start the connection
    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient && this.isConnected) {
      this.stompClient.deactivate();
      this.isConnected = false;
      console.log("Disconnected from STOMP");
    }
  }

  subscribe(topic, callback) {
    if (this.isConnected) {
      return this.stompClient.subscribe(topic, (message) => {
        const data = JSON.parse(message.body);
        callback(data);
      });
    } else {
      console.error("Unable to subscribe. STOMP client is not connected.");
    }
  }

  unsubscribe(subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  sendMessage(destination, body) {
    if (this.isConnected) {
      this.stompClient.publish({ destination, body: JSON.stringify(body) });
    } else {
      console.error("STOMP client is not connected. Message not sent.");
    }
  }
}

export default WebSocketService.getInstance();
