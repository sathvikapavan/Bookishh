// src/App.js
import React from "react";
import Login from "./login";
import Upload from "./Upload";
import Library from "./Library";

const App = () => {
  return (
    <div>
      <h1>Bookishh</h1>
      <Login />
      <Upload/>
      <Library />
    </div>
  );
};

export default App;
