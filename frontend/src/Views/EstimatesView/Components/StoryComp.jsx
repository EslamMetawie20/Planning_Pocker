import { BookmarkAdded, BookmarkBorderOutlined } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const StoryComp = ({
  title = "Example Story Title",
  selected = false,
  estimate = 0,
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
      onClick={onClick}
      sx={{
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
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

export default StoryComp;
