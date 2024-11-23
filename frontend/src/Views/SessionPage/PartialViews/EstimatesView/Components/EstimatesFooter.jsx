import { PowerSettingsNew } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const EstimatesFooter = ({
  sessionId = "a23389cc",
  buttonLabel = "End session",
  onClick = () => {},
}) => {
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
        onClick={onClick}
      >
        {buttonLabel}
      </Button>
    </Stack>
  );
};

EstimatesFooter.propTypes = {
  sessionId: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
export default EstimatesFooter;
