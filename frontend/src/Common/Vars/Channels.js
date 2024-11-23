export const QUEUE_PATHS = {
  RECEIVE_MESSAGE: () => "/user/queue/response",
  USER_MEMBER_UPDATES: () => "/user/queue/memberUpdates",
};

export const TOPIC_PATHS = {
  SESSION_IDS_GET: () => "/topic/session/ids",
  SESSION_CREATED: () => "/topic/session/created",
  SESSION_JOINED: () => "/topic/session/joined",
  SESSION_RECONNECTED: () => "/topic/session/reconnected",
  SESSION_UPDATES: (sessionId) => `/topic/session/${sessionId}/state`,
  PARTICIPANTS_UPDATES: (sessionId) =>
    `/topic/session/${sessionId}/participants`,
  STORY_UPDATED: (storyId) => `/topic/userstory/${storyId}`,
};

export const BACKEND_ACTIONS = {
  GET_SESSION_IDS: () => "/app/poker/session/ids/get",
  CREATE_SESSION: () => "/app/poker/create",
  JOIN_SESSION: () => "/app/poker/join",
  RECONNECT_SESSION: () => "/app/poker/reconnect",
  LEAVE_SESSION: () => "/app/poker/leave",
  END_SESSION: () => "/app/poker/close",
  CLOSE_SESSION: () => "/app/poker/close",
  ADD_STORY: (sessionId) => `/userstories/add`,
  DELETE_STORY: (storyId) => `/userstories/delete/${storyId}`,
  UPDATE_STORY: (storyId) => `/userstories/update/${storyId}`,
};

export const FRONTEND_ACTIONS = {
  SESSION_CREATED: "SESSION_CREATED",
  SESSION_CREATION_FAILED: "SESSION_CREATION_FAILED",
  SESSION_JOINED: "SESSION_JOINED",
  SESSION_JOIN_FAILED: "SESSION_JOIN_FAILED",
  SESSION_LEFT: "SESSION_LEFT",
  SESSION_RECONNECTED: "SESSION_RECONNECTED",
  SESSION_RECONNECT_FAILED: "SESSION_RECONNECT_FAILED",
  MEMBER_JOINED: "MEMBER_JOINED",
  MEMBER_LEFT: "MEMBER_LEFT",
};
