import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const useTrackBuilder = () => {
  const [items, setItems] = useState([]);

  const addItem = (item) => setItems(prev => [...prev, item]);
  const removeItem = (id) => setItems(prev => prev.filter(i => i.refId !== id));

  const saveTrack = async ({ title, description, userId }) => {
    const ref = collection(db, "tracks");
    await addDoc(ref, {
      title,
      description,
      userId,
      items,
      createdAt: serverTimestamp()
    });
  };

  return { items, addItem, removeItem, saveTrack };
};
