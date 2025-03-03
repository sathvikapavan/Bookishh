// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Login from "./Login";
import Upload from "./Upload";
import Library from "./Library";
import Annotations from "./Annotations";

const App = () => {
  const navigate = useNavigate(); // useNavigate is used inside the component

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/library"); // Redirect to Library if user is logged in
      } else {
        navigate("/"); // Redirect to Login if user is not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h1>Bookishh</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/library" element={<Library />} />
        <Route path="/annotations" element={<Annotations />} />
      </Routes>
    </div>
  );
};

export default App;