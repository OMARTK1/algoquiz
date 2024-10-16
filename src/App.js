import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

const App = () => {
  console.log("Rendering App");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/:category/:level" element={<Results />} /> 
        </Routes>
    </Router>
  );
};

export default App;
