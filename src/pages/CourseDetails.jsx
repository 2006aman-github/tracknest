import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ModuleForm from "./forms/AddModule";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useTrackBuilder } from "../hooks/useTrackBuilder";
import { addModule } from "../services/module";

export default function CourseView() {
const { addItem, items } = useTrackBuilder(); // <-- use the hook
   const location = useLocation();
  const { courseId } = useParams();
 const [course, setCourse] = useState(location.state?.course || null);

    const [modules, setModules] = useState([
])


const handleAdd = (module) => {
    addItem({
      type: "module",
      refId: module.id,
      title: module.title,
      duration: module.duration,
      order: items.length
    });
  };

useEffect(() => {
    if (!course && courseId) {
    
      const fetchCourse = async () => {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCourse({ id: docSnap.id, ...docSnap.data() });
        }
      };
      fetchCourse();
    }
  }, [course, courseId]);

  useEffect(() => {
    const fetchModules = async () => {
     
           try {
        const modulesRef = collection(db, "courses", courseId, "modules");
        const snapshot = await getDocs(modulesRef);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setModules(data);
      } catch (err) {
        console.error("Error fetching modules:", err);
      } 
    };

    fetchModules();
  }, [courseId]);

  if (!course) return <div>Loading course...</div>;

const onAddModule = (newModule) => {
  const updatedModules = [...modules, newModule];
  setModules(updatedModules);
  addModule(courseId, newModule)
    .then((addedModule) => {
      console.log("Module added successfully:", addedModule);
      setModules((prev) => [...prev, addedModule]);
    })
    .catch((error) => {
      console.error("Error adding module:", error);
    } );
  handleAdd(newModule);
}


 
    // access from redux 
   
    const userRole = "provider"; // This would typically come from context or props

  return (
    <div className="max-w-3/4 mx-auto my-8 p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Title + Basic Info */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
        <p className="text-gray-600">{course.description}</p>
        <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
        <p className="text-sm text-gray-500">Launch Date: {course.launchDate}</p>
        <p className="text-sm text-gray-500">Duration: {course.duration} hrs</p>
        <div className="mt-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Student Stats</h2>
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-green-100 text-green-800 p-4 rounded shadow">
      <p className="text-sm">Enrolled Students</p>
      <p className="text-2xl font-bold">{course.enrolledCount?.length || 0}</p>
    </div>
    <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
      <p className="text-sm">Completed Students</p>
      <p className="text-2xl font-bold">{course.completedCount?.length || 0}</p>
    </div>
  </div>
</div>
        <section>
           
            {modules?.length > 0 && (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Modules</h2>
    <div className="space-y-4">
      {modules.map((mod, idx) => (
        <div key={idx} className="border flex items-center justify-between rounded-lg p-4 bg-gray-50 shadow-sm">
            <div>

          <h3 className="text-lg font-semibold text-gray-700">{mod.title}</h3>
          <p className="text-sm text-gray-600">{mod.description}</p>
          <p className="text-xs text-gray-500 mt-1">Duration: {mod.duration} hrs</p>
            </div>

         <button
          onClick={() => handleAdd(mod)}
            className="bg-blue-600 h-fit p-2 cursor-pointer rounded-sm hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
         >
            Add to track
         </button>
        </div>
      ))}
    </div>
  </div>
)}
        </section>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {course.tags?.map((tag, i) => (
            <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 📌 Conditional Blocks */}
      {userRole === "admin" && (
        <div className="space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Approve</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Reject</button>
        </div>
      )}

      {userRole === "student" && (
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enroll</button>
      )}

      {userRole === "provider" && (
        <div className="flex flex-col space-y-2">
          <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Edit Course</button>
         
        <ModuleForm onAdd={onAddModule} />
        </div>
      )}

      {/* 🔎 Extra Info */}
      <div className="text-sm text-gray-400 pt-4 border-t">
        Created At: {new Date(course.createdAt?.seconds * 1000).toLocaleString()}
      </div>
    </div>
  );
}
