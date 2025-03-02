// src/Upload.js
import React, { useState } from "react";
import { storage } from "./firebase";
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

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;