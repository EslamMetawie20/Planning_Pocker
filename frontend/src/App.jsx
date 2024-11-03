import React from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Stack } from "@mui/material";
import useDosTheme from "./Common/Theme/useDosTheme";
import MembersView from "./Views/MembersView";
import StoryView from "./Views/StoryView";
import EstimatesView from "./Views/EstimatesView";
import BackgroundBox from "./Components/Frames/BackgroundBox";
import BoxHeader from "./Components/Frames/BoxHeader";

const App = () => {
  return (
    <ThemeProvider theme={useDosTheme()}>
      <CssBaseline />
      <BackgroundBox>
        <Stack
          paddingX={3}
          paddingY={2}
          spacing={1}
          bgcolor={"white"}
          sx={{
            width: "82vw",
            height: "90vh",
            borderRadius: "1rem",
          }}
        >
          <BoxHeader />
          <Stack
            direction={"row"}
            spacing={1}
            flexShrink={1}
            height={"calc(100% - 12vh - 1rem)"}
          >
            <MembersView />
            <StoryView />
            <EstimatesView />
          </Stack>
        </Stack>
      </BackgroundBox>
    </ThemeProvider>
  );
};

export default App;
