import React, { useEffect } from "react"; // Import useEffect
import FrameComponent from "../../Components/Frames/FrameComponent";
import { Stack } from "@mui/material";
import MemberComponent from "./Components/MemberComponent";
import { fetchSessionMembers } from "../../redux/reducers/memberSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../Common/Vars/Constants";
import LoaderComp from "../../Components/Extras/LoaderComp";

const MembersView = () => {
  const dispatch = useDispatch();
  const { members, status } = useSelector((state) => state.member);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchSessionMembers());
    }
  }, [status, dispatch]);

  return (
    <FrameComponent
      paperSx={{
        flex: 1.1,
      }}
      title={`Members ${members?.length}`}
    >
      {status === STATUS.LOADING ? (
        <LoaderComp />
      ) : (
        <Stack spacing={1.5}>
          {members.map((item, index) => (
            <MemberComponent
              key={index + item?.name}
              name={item?.name}
              role={item?.role}
              vote={item?.lastVote}
              avatarIndex={item?.avatarIndex}
              voted={item?.voted}
            />
          ))}
        </Stack>
      )}
    </FrameComponent>
  );
};

export default MembersView;
