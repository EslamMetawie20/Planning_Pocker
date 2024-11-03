import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainSession from "./Views/StartPage/MainSession";
import JoinSession from "./Views/StartPage/JoinSession";
import MembersPage from "./Views/StartPage/MembersPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainSession />} />
                <Route path="/join" element={<JoinSession />} />
                <Route path="/members" element={<MembersPage />} />
            </Routes>
        </Router>
    );
};

export default App;
