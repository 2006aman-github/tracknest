import { z } from 'zod';
import { db } from "../firebase.js";
import { collection, query, where, getDocs, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { courseSchema } from "./schemas/courseSchema";

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


userSchema.parse(userData); // throws if invalid

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
