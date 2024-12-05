import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import InfoRow from "../../../../../Components/Typograpghy/InfoRow";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TimeCounter from "./TimeCounter";
import { createSelector } from "reselect";

const CurrentVotes = ({
                        title = "Last round:",
                        time = new Date(),
                        frequent = "--",
                        max = "--",
                        min = "--",
                        onClick,
                      }) => {
  const selectVotesAndMembers = createSelector(
      (state) => state.story.votes,
      (state) => state.member.members,
      (votes, members) => ({ votes, members })
  );

  const { votes, members } = useSelector(selectVotesAndMembers);

  const isScrumMaster = useSelector((state) => state.session.isScrumMaster);
  const allVoted = votes?.length === members?.length;

  return (
      <Box>
        <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
          <Typography variant="h6">{title}</Typography>
          {onClick && isScrumMaster && (
              <Button
                  size="small"
                  variant="outlined"
                  color={allVoted ? "success" : "primary.light"}
                  onClick={allVoted ? onClick : undefined}
                  disabled={!allVoted}
              >
                Reveal Votes
              </Button>
          )}
        </Stack>
        <Stack mt={1}>
          <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
          >
            <Typography variant="caption">{"Time"}</Typography>
            <TimeCounter startDate={time} isRunning={true} />
          </Stack>
          <InfoRow title="Max" value={max} />
          <InfoRow title="Min" value={min} />
        </Stack>
      </Box>
  );
};

CurrentVotes.prototypes = {
  title: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
      .isRequired,
  frequent: PropTypes.string,
  high: PropTypes.string,
  low: PropTypes.string,
  onClick: PropTypes.func,
};

export default CurrentVotes;
