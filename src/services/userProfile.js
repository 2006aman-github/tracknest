import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { userSchema } from "./schemas/userProfileSchema";
import { db } from "../firebase";

export const createUserProfile = async (userId, inputData) => {
  // Fill defaults
  const defaultData = {
    enrolledCourses: [],
    ongoingTracks: [],
    completedModules: [],
    favouriteCourses: [],
    skills: [],
    createdAt: serverTimestamp()
  };

  // Merge and validate
  const userData = userSchema.parse({ ...defaultData, ...inputData });

  // Set in Firestore
  const userRef = doc(db, "userProfiles", userId);
  await setDoc(userRef, userData);
};

export const getUserProfile = async (userId) => {
  const userRef = doc(db, "userProfiles", userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    throw new Error("User profile not found");
  }

  return userSchema.parse({ id: userSnap.id, ...userSnap.data() });
}