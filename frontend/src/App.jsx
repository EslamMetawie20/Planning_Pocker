import React from "react";
import { useRoutes } from "react-router-dom";
import BackgroundBox from "./Components/Frames/BackgroundBox";
import "./App.css";
import MembersPage from "./Views/SessionPage";
import MainSession from "./Views/StartPage/MainSession";
import useDosTheme from "./Common/Theme/useDosTheme.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const App = () => {
  return (
    <ThemeProvider theme={useDosTheme()}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
};

export default App;

const Routes = () => {
  return useRoutes([MainRoutes]);
};

const MainRoutes = {
  path: "/",
  element: <BackgroundBox />,
  children: [
    {
      path: "",
      element: <MainSession />,
    },
    {
      path: "members",
      element: <MembersPage />,
    },
  ],
};
