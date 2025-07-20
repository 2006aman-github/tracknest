import { doc, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust based on your setup
import { TrackSchema } from "./schemas/trackSchema";

const userRef = (userId) => doc(db, "userProfiles", userId);

export const enrollInCourse = async (userId, courseId) => {
  await updateDoc(userRef(userId), {
    enrolledCourses: arrayUnion(courseId),
  });
};

export const markModuleComplete = async (userId, moduleId) => {
  await updateDoc(userRef(userId), {
    completedModules: arrayUnion(moduleId),
  });
};

export const markCourseComplete = async (userId, courseId) => {
  await updateDoc(userRef(userId), {
    enrolledCourses: arrayRemove(courseId),
    completedCourses: arrayUnion(courseId),
  });
};

export const toggleFavoriteCourse = async (userId, courseId, isFavoriting) => {
  await updateDoc(userRef(userId), {
    favoriteCourses: isFavoriting ? arrayUnion(courseId) : arrayRemove(courseId),
  });
};

export const addSkill = async (userId, skillTag) => {
  await updateDoc(userRef(userId), {
    skills: arrayUnion(skillTag),
  });
};

export const enrollInTrack = async (userId, trackId) => {
  await updateDoc(userRef(userId), {
    ongoingTracks: arrayUnion(trackId),
  });
};




// export const registerForSeminarOrCourse = async (userId, registration) => {
//   const regId = `${registration.type}_${registration.refId}`;
//   await updateDoc(userRef(userId), {
//     [`registrations.${regId}`]: registration,
//   });
// };


export const createUserTrack = async (userId, trackData) => {
    // Validate trackData against TrackSchema if needed
    TrackSchema.parse(trackData);
  const docRef = await addDoc(collection(db, "tracks"), {
    userId,
 ...trackData,
    createdAt: serverTimestamp()
  });

  return docRef.id;
};

// Optional: initialize user document if not exists
export const initUserData = async (userId) => {
  const ref = userRef(userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      enrolledCourses: [],
      ongoingTracks: [],
      completedModules: [],
      completedCourses: [],
      favoriteCourses: [],
      skills: [],
      registrations: {},
    });
  }
};
