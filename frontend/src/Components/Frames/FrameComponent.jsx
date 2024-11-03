import React from "react";
import { Paper, Box, Typography, Stack } from "@mui/material";
import sxProps from "../../Common/Vars/sxProps";

const FrameComponent = ({
  title,
  icon,
  children,
  paperSx = sxProps,
  sx = { padding: 1, sxProps },
  borderRadius = "6px",
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        ...paperSx,
        borderRadius,
      }}
    >
      {/* Header */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        sx={{
          height: "4rem",
          backgroundColor: "primary.main",
          padding: 1,
          borderRadius: `${borderRadius} ${borderRadius} 0 0`,
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          color="primary.contrastText"
          textOverflow={"ellipsis"}
        >
          {title}
        </Typography>

        {/* Icon Button */}
        {icon}
      </Stack>

      {/* Content */}
      <Box overflow={"auto"} height={"calc(100% - 4rem)"} sx={sx}>
        {children}
      </Box>
    </Paper>
  );
};

export default FrameComponent;
