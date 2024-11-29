import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BackgroundBox from "./Components/Frames/BackgroundBox";
import SessionPage from "./Views/SessionPage";
import MainSession from "./Views/StartPage/MainSession";
import useDosTheme from "./Common/Theme/useDosTheme.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import useWebSocketListener from "./Common/Hooks/useWebSocketListener.jsx";
import "./App.css";
import { getTokenData } from "./Common/Utils/tokenUtils.js";

const App = () => {
  useWebSocketListener();
  return (
    <ThemeProvider theme={useDosTheme()}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;

const AppRoutes = () => {
  const sessionId = useSelector((state) => state.session.sessionId);

  const MainRoutes = {
    path: "/",
    element: <BackgroundBox />,
    children: [
      {
        path: "",
        element: <SessionPage />,
      },
      {
        path: "session",
        element: <SessionPage />,
      },
    ],
  };

  return useRoutes([MainRoutes]);
};
