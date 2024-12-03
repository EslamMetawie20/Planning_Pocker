import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import MiniCardComp from "./MiniCardComp";
import { ChevronRight, LoopOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { assignEstimate } from "../../../../../_redux/reducers/storySlice";
import { useSnackbar } from "notistack";
import { FIBONACCI } from "../../../../../Common/Vars/Constants";

const EstimateForm = () => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAccept = () => {
    if (selectedNumber === 0) {
      enqueueSnackbar("Please select a card before accepting.", {
        variant: "warning",
      });
    } else {
      enqueueSnackbar(`You have selected card number ${selectedNumber}.`, {
        variant: "success",
      });
      dispatch(assignEstimate(selectedNumber));
    }
  };

  return (
    <Box
      display="grid"
      gap={"0.5rem"}
      gridTemplateColumns="repeat(14, 0.5fr)"
      gridTemplateRows="repeat(2, auto)"
      sx={{
        "& > *": {
          gridColumn: "span 2",
        },
      }}
    >
      {FIBONACCI.map((item, index) => (
        <MiniCardComp
          key={index + item}
          number={item}
          onClick={() => setSelectedNumber(item)}
          selected={item === selectedNumber}
        />
      ))}
      <Button
        {...buttonProps}
        variant="outlined"
        startIcon={<LoopOutlined />}
        onClick={() => dispatch(assignEstimate(0))}
      >
        repeat
      </Button>
      <Button
        {...buttonProps}
        variant="contained"
        endIcon={<ChevronRight />}
        onClick={handleAccept}
      >
        accept
      </Button>
    </Box>
  );
};

export default EstimateForm;

const buttonProps = {
  size: "small",
  sx: {
    gridColumn: "span 5",
    height: "fit-content",
    alignSelf: "flex-end",
  },
};
