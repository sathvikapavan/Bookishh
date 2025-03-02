// src/Library.js
import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const storageRef = ref(storage, "uploads/");
      const fileList = await listAll(storageRef);
      const bookUrls = await Promise.all(
        fileList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { name: item.name, url };
        })
      );
      setBooks(bookUrls);
    };

    fetchBooks();
  }, []);

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