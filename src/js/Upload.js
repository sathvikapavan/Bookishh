// src/Upload.js
import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(storageRef, file);
      alert("File uploaded!");
    }
  };
  // upload.js
function handleUpload() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
      const uploadStatus = document.getElementById("uploadStatus");
      uploadStatus.style.display = "block";
      setTimeout(() => {
        window.location.href = "library.html";
      }, 2000); // Redirect after 2 seconds
    } else {
      alert("Please select a file to upload.");
    }
  }
  
  function handleLogout() {
    alert("Logged out successfully!");
    window.location.href = "login.html";
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;