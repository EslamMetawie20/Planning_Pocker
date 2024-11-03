import { PowerSettingsNew } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";

const EstimatesFooter = ({ sessionId = "a23389cc" }) => {
  return (
    <Stack justifyContent={"flex-start"} justifySelf={"flex-end"}>
      <Typography variant="caption" fontSize={"0.6rem"}>
        Session ID: {sessionId}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        color="error"
        startIcon={<PowerSettingsNew />}
      >
        End session
      </Button>
    </Stack>
  );
};

export default EstimatesFooter;
