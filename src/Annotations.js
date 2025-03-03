// src/Annotations.js
import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";

const Annotations = () => {
  const [annotations, setAnnotations] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [editingAnnotationId, setEditingAnnotationId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

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

  const handleAddAnnotation = async () => {
    if (selectedText && auth.currentUser) {
      const comment = prompt("Add a comment for the highlighted text:");
      if (comment) {
        try {
          await addDoc(collection(db, "annotations"), {
            text: selectedText,
            comment,
            userId: auth.currentUser.uid,
            createdAt: new Date(),
          });
          setSelectedText("");
        } catch (error) {
          console.error("Error adding annotation:", error);
        }
      }
    }
  };

  const handleEditAnnotation = (annotation) => {
    setEditingAnnotationId(annotation.id);
    setEditedComment(annotation.comment);
  };

  const handleSaveEdit = async () => {
    if (editingAnnotationId) {
      try {
        const annotationRef = doc(db, "annotations", editingAnnotationId);
        await updateDoc(annotationRef, {
          comment: editedComment,
        });
        setEditingAnnotationId(null);
        setEditedComment("");
      } catch (error) {
        console.error("Error updating annotation:", error);
      }
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "annotations"),
        where("userId", "==", auth.currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const annotationsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnnotations(annotationsList);
      });

      return () => unsubscribe();
    }
  }, [auth.currentUser]);

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
          {annotations.map((annotation) => (
            <li key={annotation.id}>
              <strong>"{annotation.text}"</strong>:{" "}
              {editingAnnotationId === annotation.id ? (
                <input
                  type="text"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
              ) : (
                annotation.comment
              )}
              {editingAnnotationId === annotation.id ? (
                <button onClick={handleSaveEdit}>Save</button>
              ) : (
                <button onClick={() => handleEditAnnotation(annotation)}>
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Annotations;