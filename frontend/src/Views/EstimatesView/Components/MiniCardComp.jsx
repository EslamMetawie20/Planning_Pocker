import { Button } from "@mui/material";
import React from "react";

const MiniCardComp = ({ number = 1, selected = false, onClick = () => {} }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        border: selected ? 2 : 1,
        borderColor: selected ? "secondary.main" : "primary.main",
        color: selected ? "secondary.main" : "primary.main",
        fontWeight: 700,
        minWidth: "1.5rem",
        width: "fit-content",
        paddingY: 0.5,
        paddingX: 0,
      }}
    >
      {number}
    </Button>
  );
};

export default MiniCardComp;
