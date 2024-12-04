import React, { useEffect, useState } from "react";
import { FIBONACCI } from "../../../../Common/Vars/Constants";
import { Stack } from "@mui/material";
import PlayingCard from "./Components/PlayingCard";
import { useDispatch, useSelector } from "react-redux";
import { setMyVote } from "../../../../_redux/reducers/storySlice";

const CardsView = () => {
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(0);
  const [votingDisabled, setVotingDisabled] = useState(false);
  const myVote = useSelector((state) => state.story.myVote);

  const handleVote = (value) => {
    setVotingDisabled(true);
    setSelectedCard(0);
    dispatch(setMyVote(value));
  };

  useEffect(() => {
    if (myVote) {
      setVotingDisabled(true);
    } else {
      setVotingDisabled(false);
    }
  }, [myVote]);

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
