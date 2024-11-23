import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember, removeMember } from "../../_redux/reducers/memberSlice";
import {
  connectSession,
  setScrumMaster,
} from "../../_redux/reducers/sessionSlice";
import { QUEUE_PATHS, FRONTEND_ACTIONS } from "../Vars/Channels";
import WebSocketService from "../Config/WebSocketConfig";
import { useNavigate } from "react-router-dom";
import { removeToken, getTokenData } from "../Utils/tokenUtils";

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

  const isScrumMaster = useSelector((state) => state.session.isScrumMaster);
  useEffect(() => {
    const {
      sessionId: savedSessionId,
      scrumMasterId,
      memberId,
    } = getTokenData() || {};

    if (!savedSessionId) {
      return;
    }

    if (
      savedSessionId === sessionId &&
      scrumMasterId === memberId &&
      !isScrumMaster
    ) {
      dispatch(setScrumMaster(true));
    } else if (isScrumMaster) {
      dispatch(setScrumMaster(false));
    }
  }, [token, sessionId]);

  useEffect(() => {
    if (getTokenData()?.sessionId && !sessionId) {
      WebSocketService.connect(
        () => {
          // setupMemberListeners();
          dispatch(connectSession());
          navigate("/session");
        },
        (error) => {
          console.error("STOMP connection error:", error);
          removeToken();
          navigate("/");
        }
      );
      return;
    }
    if (sessionId && token) {
      WebSocketService.connect(
        () => {
          navigate("/session");
        },
        (error) => {
          console.error("STOMP connection error:", error);
          removeToken();
          navigate("/");
        }
      );
    }

    if (!sessionId && !token) {
      removeToken();
      navigate("/");
    }
  }, [sessionId, token, dispatch, navigate]);
};

export default useWebSocketListener;
