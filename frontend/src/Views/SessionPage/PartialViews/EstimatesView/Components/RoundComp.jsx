import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import InfoRow from "../../../../../Components/Typograpghy/InfoRow";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const RoundComp = ({
  title = "Last round:",
  time = "--:--",
  frequent = "--",
  high = "--",
  low = "--",
  onClick,
}) => {
  const isScrumMaster = useSelector((state) => state.session.isScrumMaster);
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
            color="primary.light"
            onClick={onClick}
          >
            End voting
          </Button>
        )}
      </Stack>
      <Stack mt={1}>
        <InfoRow title="Time" value={time} />
        <InfoRow title="Frequent" value={frequent} />
        <InfoRow title="High" value={high} />
        <InfoRow title="Low" value={low} />
      </Stack>
    </Box>
  );
};

RoundComp.prototypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  frequent: PropTypes.string,
  high: PropTypes.string,
  low: PropTypes.string,
  onClick: PropTypes.func,
};

export default RoundComp;
