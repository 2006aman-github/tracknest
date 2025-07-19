// components/ModuleForm.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ModuleForm({ onAdd }) {
  const { register, handleSubmit, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const submit = async (data) => {
    setSubmitting(true);
    data.duration = Number(data.duration); // Ensure it's a number
    await onAdd(data); // Callback to parent
    reset();
    setSubmitting(false);
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Add New Module</h2>
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-4 bg-gray-50 p-4 rounded-lg shadow"
      >
        <input
          type="text"
          placeholder="Module Title"
          {...register("title", { required: true })}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Module Description"
          {...register("description")}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Duration (hrs)"
          {...register("duration", { required: true })}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? "Adding..." : "Add Module"}
        </button>
      </form>
    </div>
  );
}
