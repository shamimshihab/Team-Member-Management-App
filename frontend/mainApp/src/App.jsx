import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const RemoteTeamApp = React.lazy(() => import("team/TeamApp"));
const RemoteAddTeamApp = React.lazy(() => import("addTeam/AddTeamApp"));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/*" element={<RemoteTeamApp />} />
          <Route path="/addMember" element={<RemoteAddTeamApp />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
