import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import EditTeamMemberPage from "./Components/EditTeamMemberPage";

import ListPage from "./Components/ListPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ListPage />} />

        <Route path="/teamMember/:id" element={<EditTeamMemberPage />} />
      </Routes>
    </div>
  );
};

export default App;
