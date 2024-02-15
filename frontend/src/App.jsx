import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ConnectPage from "./pages/ConnectPage";
import DeletePage from "./pages/DeletePage";
import AgentScreen from "./pages/AgentScreen";
// import Stage from "./pages/Stage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          {/* <Route path="/stage" element={<Stage />} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/connect-page" element={<ConnectPage />} />
          <Route path="/delete-page" element={<DeletePage />} />
          <Route path="/agent-screen" element={<AgentScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
