import React, { useEffect } from "react";
import FrameComponent from "../../../../Components/Frames/FrameComponent";
import { Stack } from "@mui/material";
import MemberComponent from "./Components/MemberComponent";
import { useSelector } from "react-redux";
import { STATUS } from "../../../../Common/Vars/Constants";
import LoaderComp from "../../../../Components/Extras/LoaderComp";
import { getTokenData } from "../../../../Common/Utils/tokenUtils";

const MembersView = () => {
  const { members, status } = useSelector((state) => state.member);
  const votes = useSelector((state) => state.story.votes);

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
              noVote={item?.role === "Scrum Master"}
              key={index + item?.name}
              name={item?.name}
              role={item?.role}
              vote={
                votes?.find((vote) => vote?.memberId === item?.id)
                  ?.estimation || 0
              }
              avatarIndex={item?.avatarIndex}
              voted={
                votes?.find((vote) => vote?.memberId === item?.id)?.estimation
              }
            />
          ))}
        </Stack>
      )}
    </FrameComponent>
  );
};

export default MembersView;
