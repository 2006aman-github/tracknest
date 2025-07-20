import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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