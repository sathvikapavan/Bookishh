// src/Annotations.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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
          // Detect mentions in the comment
          const mentions = comment.match(/@\w+/g) || [];
          await addDoc(collection(db, "annotations"), {
            text: selectedText,
            comment,
            userId: auth.currentUser.uid,
            mentions, // Store mentions
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
        // Detect mentions in the edited comment
        const mentions = editedComment.match(/@\w+/g) || [];
        await updateDoc(annotationRef, {
          comment: editedComment,
          mentions, // Update mentions
        });
        setEditingAnnotationId(null);
        setEditedComment("");
      } catch (error) {
        console.error("Error updating annotation:", error);
      }
    }
  };

  const handleDeleteAnnotation = async (annotationId) => {
    try {
      await deleteDoc(doc(db, "annotations", annotationId));
    } catch (error) {
      console.error("Error deleting annotation:", error);
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

  const renderCommentWithMentions = (comment) => {
    return comment.split(/(@\w+)/g).map((part, index) =>
      part.startsWith("@") ? (
        <span key={index} style={{ color: "blue", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  // annotations.js
function handleAddAnnotation() {
    const comment = prompt("Add a comment for the highlighted text:");
    if (comment) {
      const annotationsList = document.getElementById("annotationsList");
      const newAnnotation = document.createElement("li");
      newAnnotation.innerHTML = `<strong>"Sample Text"</strong>: ${comment}`;
      annotationsList.appendChild(newAnnotation);
    }
  }
  
  function handleLogout() {
    alert("Logged out successfully!");
    window.location.href = "login.html";
  }

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
                renderCommentWithMentions(annotation.comment)
              )}
              {editingAnnotationId === annotation.id ? (
                <button onClick={handleSaveEdit}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleEditAnnotation(annotation)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteAnnotation(annotation.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Annotations;