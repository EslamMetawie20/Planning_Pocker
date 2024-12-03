import React from "react";
import FrameComponent from "../../../../Components/Frames/FrameComponent";
import { Stack } from "@mui/material";
import MemberComponent from "./Components/MemberComponent";
import { useSelector } from "react-redux";
import { STATUS } from "../../../../Common/Vars/Constants";
import LoaderComp from "../../../../Components/Extras/LoaderComp";
import { getTokenData } from "../../../../Services/tokenUtils";

const MembersView = () => {
    const { members, status } = useSelector((state) => state.member);

    // Get the current member ID from the token
    const tokenData = getTokenData();
    const currentMemberId = tokenData?.memberId;

    // Sort members: Move the current member to the top
    const sortedMembers = members
        ? [...members].sort((a, b) => (a.id === currentMemberId ? -1 : b.id === currentMemberId ? 1 : 0))
        : [];

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
                    {sortedMembers.map((item, index) => (
                        <MemberComponent
                            key={index + item?.name}
                            name={item?.id === currentMemberId ? "You" : item?.name}
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
