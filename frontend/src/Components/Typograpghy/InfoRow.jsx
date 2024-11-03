import { Stack, Typography } from "@mui/material";
import React from "react";

const InfoRow = ({ title = "Time", value = "--:--" }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Typography variant="caption">{title}</Typography>
      <Typography variant="h6">{value}</Typography>
    </Stack>
  );
};

export default InfoRow;
