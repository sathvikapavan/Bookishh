// src/Annotations.js
import React, { useState } from "react";

const Annotations = () => {
  const [annotations, setAnnotations] = useState([]);
  const [selectedText, setSelectedText] = useState("");

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const highlightedText = range.toString();
      if (highlightedText) {
        setSelectedText(highlightedText);
      }
    }
  };

  const handleAddAnnotation = () => {
    if (selectedText) {
      const newAnnotation = {
        text: selectedText,
        comment: prompt("Add a comment for the highlighted text:"),
      };
      setAnnotations([...annotations, newAnnotation]);
      setSelectedText("");
    }
  };

  return (
    <div>
      <div
        style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
        onMouseUp={handleHighlight}
      >
        <p>
          This is a sample eBook text. Highlight any part of this text to add an annotation.
        </p>
      </div>
      <button onClick={handleAddAnnotation} disabled={!selectedText}>
        Add Annotation
      </button>
      <div>
        <h3>Annotations</h3>
        <ul>
          {annotations.map((annotation, index) => (
            <li key={index}>
              <strong>"{annotation.text}"</strong>: {annotation.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Annotations;