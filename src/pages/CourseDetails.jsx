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
  <div className="min-h-screen w-full px-4 sm:px-10 py-10 bg-[#f8f1e5] text-[#4e3c2d] space-y-10">

  {/* Title & Description */}
  <div className="space-y-3">
    <h1 className="text-3xl sm:text-4xl font-bold">{course.title}</h1>
    <p className="text-base sm:text-lg">{course.description}</p>
    <div className="text-sm text-[#7c6a58] flex flex-wrap gap-x-6 gap-y-1">
      <span>👨‍🏫 {course.instructor}</span>
      <span>🚀 {course.launchDate}</span>
      <span>⏱️ {course.duration} hrs</span>
    </div>
  </div>

  {/* Student Stats */}
  <div>
    <h2 className="text-2xl font-semibold mb-3">📊 Student Stats</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-[#dce7d3] text-[#2f4f30] p-5 rounded-lg">
        <p className="text-sm">Enrolled Students</p>
        <p className="text-3xl font-bold">{course.enrolledCount?.length || 0}</p>
      </div>
      <div className="bg-[#d3e0f0] text-[#1d3c5e] p-5 rounded-lg">
        <p className="text-sm">Completed Students</p>
        <p className="text-3xl font-bold">{course.completedCount?.length || 0}</p>
      </div>
    </div>
  </div>

  {/* Modules Section */}
  {modules?.length > 0 && (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold">📚 Modules</h2>
      {modules.map((mod, idx) => (
        <div
          key={idx}
          className="bg-[#f3e8d9] px-5 py-4 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-xl font-semibold">{mod.title}</h3>
            <p className="text-sm text-[#7c6a58]">{mod.description}</p>
            <p className="text-xs text-[#9c836f] mt-1">Duration: {mod.duration} hrs</p>
          </div>
          <button
            onClick={() => handleAdd(mod)}
            className="bg-[#5e493c] text-white px-4 py-2 rounded hover:bg-[#4e3c2d] transition-all duration-200"
          >
            Add to track
          </button>
        </div>
      ))}
    </section>
  )}

  {/* Tags */}
  <div className="flex flex-wrap gap-2">
    {course.tags?.map((tag, i) => (
      <span
        key={i}
        className="bg-[#e2d6c1] text-[#5e493c] px-3 py-1 rounded-full text-xs font-medium"
      >
        #{tag}
      </span>
    ))}
  </div>

  {/* Role-specific Buttons */}
  {userRole === "admin" && (
    <div className="space-x-4">
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Approve</button>
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Reject</button>
    </div>
  )}

  {userRole === "student" && (
    <button className="bg-[#5e493c] text-white px-5 py-2 rounded hover:bg-[#4e3c2d] transition">Enroll</button>
  )}

  {userRole === "provider" && (
    <div className="flex flex-col gap-4">
      <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Edit Course</button>
      <ModuleForm onAdd={onAddModule} />
    </div>
  )}

  {/* Footer Info */}
  <div className="text-sm text-[#9c836f] border-t border-[#e0cfc0] pt-4">
    Created At: {new Date(course.createdAt?.seconds * 1000).toLocaleString()}
  </div>
</div>

  );
}
