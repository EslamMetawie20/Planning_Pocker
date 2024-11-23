import { BookmarkAdded, BookmarkBorderOutlined } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const StoryComp = ({
  title = "Example Story Title",
  selected = false,
  estimate = 0,
  disabled = false,
  onClick = () => {},
}) => {
  const theme = useTheme();
  return (
    <Stack
      border={selected ? 2 : 1}
      borderColor={
        selected ? theme.palette.secondary.main : theme.palette.grey[300]
      }
      width={"100%"}
      borderRadius={2}
      paddingY={0.75}
      paddingX={1}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      onClick={!disabled ? onClick : null}
      sx={{
        cursor: !disabled && "pointer",
        transition: "all 0.2s ease",
        "&:hover": !disabled && {
          backgroundColor: theme.palette.action.hover,
          transform: "scale(1.02)",
        },
      }}
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"} width={"100%"}>
        {estimate !== 0 ? (
          <BookmarkAdded color="secondary" />
        ) : (
          <BookmarkBorderOutlined color="secondary" />
        )}
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "10rem",
          }}
        >
          {title}
        </Typography>
      </Stack>
      <Typography
        width={"10%"}
        variant="h4"
        fontWeight={"400"}
        color={estimate !== 0 ? "secondary" : "primary"}
      >
        {estimate === 0 ? "--" : estimate}
      </Typography>
    </Stack>
  );
};

StoryComp.prototypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  estimate: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default StoryComp;
