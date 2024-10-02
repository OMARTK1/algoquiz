// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Update import
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

const App = () => {
  return (
    <Router>
      <Routes> {/* Change Switch to Routes */}
        <Route path="/" element={<Home />} /> {/* Update Route syntax */}
        <Route path="/quiz" element={<Quiz />} /> {/* Update Route syntax */}
      </Routes>
    </Router>
  );
};

export default App;
