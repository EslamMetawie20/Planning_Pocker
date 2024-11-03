import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import InfoRow from "./../../../Components/Typograpghy/InfoRow";

const RoundComp = ({
  title = "Last round:",
  time = "--:--",
  frequent = "--",
  high = "--",
  low = "--",
  onClick,
}) => {
  return (
    <Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h6">{title}</Typography>
        {onClick && (
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

export default RoundComp;
