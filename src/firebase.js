// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmpsZtKVJkCuUlq-TVeLyFxBA_HNy2gBw",
  authDomain: "bookishh-5e927.firebaseapp.com",
  projectId: "bookishh-5e927",
  storageBucket: "bookishh-5e927.firebasestorage.app",
  messagingSenderId: "760440580558",
  appId: "1:760440580558:web:d8364d7db1fed13089e39f",
  measurementId: "G-ZVZ65G0D5R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);