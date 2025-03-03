// src/Login.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Add this

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Add this

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in!");
      navigate("/library"); // Redirect to the Library page
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(`Error: ${error.message}`);
    }
  };
  // login.js
function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    alert(`Logged in as ${email}`);
    window.location.href = "library.html";
  }
  
  function handleSignup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    alert(`Signed up as ${email}`);
    window.location.href = "library.html";
  }
  
  function handleLogout() {
    alert("Logged out successfully!");
    window.location.href = "login.html";
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;