import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTokenData, removeToken } from "../../Common/Utils/tokenUtils";
import { setScrumMaster } from "../../_redux/reducers/sessionSlice";

const useAccessControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionId, token } = useSelector((state) => state.session);
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
    const checkAccessControl = () => {
      if (sessionId && token) {
        navigate("/session");
        return;
      }
      navigate("/");
    };

    checkAccessControl();
  }, [sessionId, token, navigate]);
};

export default useAccessControl;
