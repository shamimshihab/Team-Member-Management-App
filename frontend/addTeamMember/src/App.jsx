import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddMemberPage from "./Components/AddMemberPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AddMemberPage />} />
      </Routes>
    </div>
  );
};

export default App;
