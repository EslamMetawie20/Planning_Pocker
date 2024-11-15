import { jwtDecode } from "jwt-decode";

export function getValidSessionFromToken() {
  const token = localStorage.getItem("sessionToken");

  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    const { sessionId, exp } = decodedToken;

    // Check if the token is expired
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("sessionToken");
      return null;
    }

    return { sessionId, token };
  } catch (error) {
    console.error("Failed to decode session token:", error);
    localStorage.removeItem("sessionToken");
    return null;
  }
}

export function getTokenData() {
  const token = localStorage.getItem("sessionToken");

  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    const { sessionId, memberId, name, isCreator, exp } = decodedToken;
    return { sessionId, memberId, name, isCreator, exp };
  } catch (error) {
    console.error("Failed to decode session token:", error);
    localStorage.removeItem("sessionToken");
    return null;
  }
}
