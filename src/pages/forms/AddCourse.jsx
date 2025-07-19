import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "@/services/schemas/courseSchema";
import { addCourse } from "@/services/course.js"; // your Firestore logic

export default function CourseForm() {
    const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(courseSchema)
  });

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      const updated = [...tags, tag];
      setTags(updated);
      setValue("tags", updated); // hook form field update
    }
    setTagInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updated = tags.filter(tag => tag !== tagToRemove);
    setTags(updated);
    setValue("tags", updated);
  };

  const onSubmit = async (data) => {
    data.createdAt = new Date();
    data.approved = false;
    try {
        console.log(data)
    //   await addCourse(data);
      alert("Course added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add course.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Course</h2>

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register("title")}
            className="input-field"
            placeholder="React Basics"
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="input-field"
            placeholder="Course description..."
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-blue-500 hover:text-blue-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
 <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type and press Enter or comma"
            className="input-field"
          />
          <p className="text-red-500 text-sm">{errors.tags?.message}</p>
        </div>
         <input type="hidden" {...register("tags")} />
        <div>
          <label className="block mb-1 font-medium">Instructor</label>
          <input
            {...register("instructor")}
            className="input-field"
            placeholder="Aman James"
          />
          <p className="text-red-500 text-sm">{errors.instructor?.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Launch Date</label>
            <input {...register("launchDate")} type="date" className="input-field" />
            <p className="text-red-500 text-sm">{errors.launchDate?.message}</p>
          </div>
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <input {...register("startDate")} type="date" className="input-field" />
            <p className="text-red-500 text-sm">{errors.startDate?.message}</p>
          </div>
          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <input {...register("endDate")} type="date" className="input-field" />
            <p className="text-red-500 text-sm">{errors.endDate?.message}</p>
          </div>
          <div>
            <label className="block mb-1 font-medium">Duration (days)</label>
            <input
              {...register("durationDays", {valueAsNumber: true})}
              type="number"
              className="input-field"
              placeholder="e.g. 14"
            />
            <p className="text-red-500 text-sm">{errors.durationDays?.message}</p>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Mode</label>
          <select {...register("mode")} className="input-field">
            <option value="">Select</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
          <p className="text-red-500 text-sm">{errors.mode?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Registration Link</label>
          <input
            {...register("registrationLink")}
            className="input-field"
            placeholder="https://example.com"
          />
          <p className="text-red-500 text-sm">{errors.registrationLink?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
