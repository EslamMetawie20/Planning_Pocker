import React, { useState } from "react";
import { FIBONACCI } from "../../../../Common/Vars/Constants";
import { Stack } from "@mui/material";
import PlayingCard from "./Components/PlayingCard";

const CardsView = () => {
  const [selectedCard, setSelectedCard] = useState(0);

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
          onSelect={() => {
            if (selectedCard === value) {
              setSelectedCard(0);
            } else {
              setSelectedCard(value);
            }
          }}
          onVote={() => {}}
        />
      ))}
    </Stack>
  );
};

export default CardsView;
