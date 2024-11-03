import React from "react";
import { Box, useTheme } from "@mui/material";

const BackgroundBox = ({ children }) => {
  const theme = useTheme();
  const mainColor = theme.palette.primary.main;
  const darkColor = theme.palette.primary.dark;
  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      height={"100vh"}
      paddingX={3}
      sx={{
        background: `radial-gradient(circle, ${mainColor} 75%, ${darkColor} 100%)`,
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundBox;
