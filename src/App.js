// src/App.js
import React from "react";
import Login from "./Login";
import Upload from "./Upload";
import Library from "./Library";
import Annotations from "./Annotations";

const App = () => {
  return (
    <div>
      <h1>Bookishh</h1>
      <Login />
      <Upload />
      <Library />
      <Annotations />
    </div>
  );
};

export default App;