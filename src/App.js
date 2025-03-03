// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Upload from "./Upload";
import Library from "./Library";
import Annotations from "./Annotations";
import Notifications from "./Notifications"; // Add this

const App = () => {
  return (
    <Router>
      <div>
        <h1>Bookishh</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/library" element={<Library />} />
          <Route path="/annotations" element={<Annotations />} />
          <Route path="/notifications" element={<Notifications />} /> {/* Add this */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;