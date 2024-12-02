import React from "react";
import PropTypes from "prop-types";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import VoteNumber from "../../../../../Components/Typograpghy/VoteNumber";

const PlayingCard = ({
  value,
  isSelected = false,
  onSelect,
  onVote,
  size = 1,
}) => {
  const theme = useTheme();

  const handleSelect = () => {
    if (onSelect && typeof onSelect === "function") {
      onSelect(value);
    }
  };

  const handleVote = () => {
    if (onVote && typeof onVote === "function") {
      onVote(value);
    }
  };

  return (
    <Stack alignItems={"center"}>
      {isSelected && (
        <Button
          size="small"
          variant="contained"
          color="secondary"
          sx={{
            mb: 1,
            minWidth: "unset",
            width: "fit-content",
            color: theme.palette.common.white,
            borderRadius: "1rem",
            transform: `translateY(-${122 * size * 0.2}px)`,
          }}
        >
          VOTE
        </Button>
      )}
      <div
        style={{
          width: `${87 * size}px`,
          height: `${122 * size}px`,
          border: `4px solid ${theme.palette.primary.main}`,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.common.white,
          boxShadow: isSelected ? theme.shadows[3] : theme.shadows[1],
          cursor: "pointer",
          textAlign: "center",
          position: "relative",
          transform: isSelected
            ? `translateY(-${122 * size * 0.2}px)`
            : "translateY(0)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onClick={handleSelect}
      >
        <Stack
          height={"100%"}
          width={"95%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: `${1.2 * size}rem`,
              color: theme.palette.primary.main,
            }}
            alignSelf={"flex-start"}
          >
            {value}
          </Typography>
          <VoteNumber
            number={value}
            height={`${3 * size}rem`}
            width={`${3 * size}rem`}
            fontSize={`${1.5 * size}rem`}
          />
          <Typography
            variant="h3"
            sx={{
              fontSize: `${1.2 * size}rem`,
              color: theme.palette.primary.main,
            }}
            alignSelf={"flex-end"}
          >
            {value}
          </Typography>
        </Stack>
      </div>
    </Stack>
  );
};

PlayingCard.propTypes = {
  value: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  size: PropTypes.number,
};

export default PlayingCard;
