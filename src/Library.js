// src/Library.js
import React, { useEffect, useState } from "react";
import { storage, auth } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom"; // Correct import

const Library = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchBooks = async () => {
      try {
        const storageRef = ref(storage, "uploads/");
        const fileList = await listAll(storageRef);
        const bookUrls = await Promise.all(
          fileList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { name: item.name, url };
          })
        );
        setBooks(bookUrls);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [navigate]);

  return (
    <div>
      <h1>Library</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <a href={book.url} target="_blank" rel="noopener noreferrer">
              {book.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;