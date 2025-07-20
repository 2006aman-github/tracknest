import { z } from 'zod';
import { db } from "../firebase.js";
import { collection, query, where, getDocs, addDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { courseSchema } from "./schemas/courseSchema";
import { en } from "zod/v4/locales";

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
  createdAt: z.instanceof(Date),
});

// type User = z.infer<typeof userSchema>;

const userData = {
  name: "Aman",
  age: 22,
  email: "aman@example.com",
  createdAt: new Date(),
};


// userSchema.parse(userData); // throws if invalid

export async function addCourse(course) {
  // Validate course against courseSchema
  courseSchema.parse(course); // throws if invalid
  // Add createdAt field if not present
  if (!course.createdAt) {
    course.createdAt = serverTimestamp(); // Use server timestamp if not provided
  }

  try {
    const docRef = await addDoc(collection(db, "courses"), course);
    console.log("Course added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
}



export async function updateCourse(courseId, updatedFields) {
  courseSchema.partial().parse(updatedFields); // Validate updatedFields against courseSchema
  try {
    const courseRef = doc(db, "courses", courseId);
    await updateDoc(courseRef, updatedFields);
    console.log("Course updated successfully.");
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
}


// fetching 
export async function getCoursesByTag(tag) {
  try {
    const q = query(collection(db, "courses"), where("tags", "array-contains", tag));
    const querySnapshot = await getDocs(q);
    
    const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return courses;
  } catch (err) {
    console.error("Error fetching courses by tag:", err);
    throw err;
  }
}




export async function getEnrolledCourses(userId) {
  try {
    const userRef = doc(db, "userProfiles", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return [];

    const userProfile = userSnap.data();
    const enrolledCourses = userProfile.enrolledCourses || [];

    if (enrolledCourses.length === 0) return [];

    const courses = await Promise.all(
      enrolledCourses.map(async (courseId) => {
        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);
        return courseSnap.exists()
          ? { id: courseSnap.id, ...courseSnap.data() }
          : null;
      })
    );

    return courses.filter(Boolean);
  } catch (err) {
    console.error("Error fetching enrolled courses:", err);
    throw err;
  }
}


export async function getAllCourses() {
  try {
    const q = query(collection(db, "courses"));
    const querySnapshot = await getDocs(q);
    const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return courses;
  } catch (err) {
    console.error("Error fetching all courses:", err);
    throw err;
  }
}


export const getCompletedCourses = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "userProfiles", userId));

    if (!userDoc.exists()) return [];

    const userProfile = userDoc.data();
    const completedCourses = userProfile.completedCourses || [];

    const coursesPromises = completedCourses.map(async (courseId) => {
      const courseDoc = await getDoc(doc(db, "courses", courseId));
      return courseDoc.exists() ? { id: courseDoc.id, ...courseDoc.data() } : null;
    });

    const courses = await Promise.all(coursesPromises);
    return courses.filter(Boolean); // remove nulls
  } catch (err) {
    console.error("Error fetching completed courses:", err);
    throw err;
  }
};


//Fetch Courses by Launch Date (>= or ==)
export async function getUpcomingCourses(date) {
  try {
    const q = query(collection(db, "courses"), where("launchDate", ">=", date));
    const querySnapshot = await getDocs(q);
    
    const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return courses;
  } catch (err) {
    console.error("Error fetching courses by date:", err);
    throw err;
  }
}
