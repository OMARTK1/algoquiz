// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Update import
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/results";

const App = () => {
  console.log("Rendering App"); // This will log when the component mounts or updates
  return (
    <Router>
      <Routes> {/* Change Switch to Routes */}
        <Route path="/" element={<Home />} /> {/* Update Route syntax */}
        <Route path="/quiz" element={<Quiz />} /> {/* Update Route syntax */}
        <Route path="/results" element={<Results />} /> {/* Update Route syntax */}
      </Routes>
    </Router>
  );
};

export default App;
