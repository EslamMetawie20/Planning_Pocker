import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember, removeMember } from "../../_redux/reducers/memberSlice";
import { connectSession } from "../../_redux/reducers/sessionSlice";
import { QUEUE_PATHS, FRONTEND_ACTIONS } from "../Vars/Channels";
import WebSocketService from "../Config/WebSocketConfig";
import { useNavigate } from "react-router-dom";
import { clearTokenData } from "../Utils/tokenUtils";

const useWebSocketListener = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionId, token } = useSelector((state) => state.session);

  const setupMemberListeners = () => {
    WebSocketService.subscribe(QUEUE_PATHS.USER_MEMBER_UPDATES, (data) => {
      if (data.action === FRONTEND_ACTIONS.MEMBER_JOINED) {
        dispatch(addMember(data));
      } else if (data.action === FRONTEND_ACTIONS.MEMBER_LEFT) {
        dispatch(removeMember(data.memberId));
      }
    });
  };

  useEffect(() => {
    if (sessionId && token) {
      WebSocketService.connect(
        () => {
          setupMemberListeners();
          dispatch(connectSession(token));
          navigate("/session");
        },
        (error) => {
          console.error("STOMP connection error:", error);
          clearTokenData();
          navigate("/");
        }
      );
    }

    return () => {
      WebSocketService.disconnect();
    };
  }, [sessionId, token, dispatch, navigate]);
};

export default useWebSocketListener;
