// src/Notifications.js
import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "notifications"),
        where("toUsername", "==", auth.currentUser.displayName || auth.currentUser.email)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notificationsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsList);
      });

      return () => unsubscribe();
    }
  }, [auth.currentUser]);

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            You were mentioned by @{notification.fromUserId} in an annotation.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;