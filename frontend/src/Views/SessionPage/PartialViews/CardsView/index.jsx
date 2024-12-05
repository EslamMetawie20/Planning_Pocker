import React, { useEffect, useState } from "react";
import { FIBONACCI } from "../../../../Common/Vars/Constants";
import { Stack } from "@mui/material";
import PlayingCard from "./Components/PlayingCard";
import { useDispatch, useSelector } from "react-redux";
import { sendVote, setMyVote } from "../../../../_redux/reducers/storySlice";
import { getTokenData } from "./../../../../Common/Utils/tokenUtils";

const CardsView = () => {
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(0);
  const [votingDisabled, setVotingDisabled] = useState(false);

  const sessionId = useSelector((state) => state.session.sessionId);
  const selectedStory = useSelector((state) => state.story.selectedStory);

  const votes = useSelector((state) => state.story.votes);
  const votesRevealed = useSelector((state) => state.story.votesRevealed);
  const myVote = useSelector((state) => state.story.myVote);

  const handleVote = (value) => {
    const request = {
      sessionCode: sessionId,
      userId: getTokenData()?.memberId,
      estimate: value,
    };
    setVotingDisabled(true);
    setSelectedCard(0);
    dispatch(sendVote(request));
  };

  useEffect(() => {
    if (myVote || votesRevealed || !selectedStory) {
      setVotingDisabled(true);
    } else {
      setVotingDisabled(false);
    }
  }, [myVote, votesRevealed, selectedStory]);

  useEffect(() => {
    const memberIdToFind = getTokenData()?.memberId;
    const estimate = votes?.find(
      (item) => item?.memberId === memberIdToFind
    )?.estimation;

    if (votes?.length > 0 && estimate) {
      dispatch(setMyVote(Number(estimate)));
      return;
    }
    dispatch(setMyVote(null));
  }, [votes]);

  return (
    <Stack
      direction="row"
      spacing={0.25}
      alignItems="flex-end"
      justifyContent="center"
    >
      {FIBONACCI.map((value, index) => (
        <PlayingCard
          key={`${value}-${index}`}
          isSelected={value === selectedCard}
          value={value}
          disabled={votingDisabled}
          vote={myVote}
          onSelect={() => {
            if (selectedCard === value) {
              setSelectedCard(0);
            } else {
              setSelectedCard(value);
            }
          }}
          onVote={() => {
            handleVote(value);
          }}
        />
      ))}
    </Stack>
  );
};

export default CardsView;
