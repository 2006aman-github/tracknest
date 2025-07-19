import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase"; // adjust to your project



// 🔹 Add a new module to a course
export const addModule = async (courseId, moduleData) => {
  const moduleRef = collection(db, "courses", courseId, "modules");
  const newModule = {
    ...moduleData,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(moduleRef, newModule);
  return { id: docRef.id, ...newModule };
};



// 🔹 Fetch all modules of a course
export const getModules = async (courseId) => {
  const moduleRef = collection(db, "courses", courseId, "modules");
  const snap = await getDocs(moduleRef);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};



// 🔹 Fetch a single module
export const getModule = async (courseId, moduleId) => {
  const docRef = doc(db, "courses", courseId, "modules", moduleId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};



// 🔹 Update a module
export const updateModule = async (courseId, moduleId, updatedData) => {
  const docRef = doc(db, "courses", courseId, "modules", moduleId);
  await updateDoc(docRef, updatedData);
};



// 🔹 Delete a module
export const deleteModule = async (courseId, moduleId) => {
  const docRef = doc(db, "courses", courseId, "modules", moduleId);
  await deleteDoc(docRef);
};