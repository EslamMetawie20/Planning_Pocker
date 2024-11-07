import { Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

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

InfoRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default InfoRow;
