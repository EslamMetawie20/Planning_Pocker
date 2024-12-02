import React from "react";
import FrameComponent from "../../../../Components/Frames/FrameComponent";
import { Stack } from "@mui/material";
import MemberComponent from "./Components/MemberComponent";
import { useSelector } from "react-redux";
import { STATUS } from "../../../../Common/Vars/Constants";
import LoaderComp from "../../../../Components/Extras/LoaderComp";

const MembersView = () => {
  const { members, status } = useSelector((state) => state.member);

  return (
    <FrameComponent
      paperSx={{
        flex: 1,
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
