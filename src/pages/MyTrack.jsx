import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";


// make sure to have id unique 
const initialTrack = {
  title: "Full Stack Developer Track",
  courses: [
    {
      id: "react",
      title: "React Basics",
      duration: 5,
      completedDuration: 3,
      modules: [
        { title: "Intro", duration: 1, completed: true },
        { title: "State", duration: 2, completed: false },
      ],
    },
      {
      id: "yoyo",
      title: "yoyo Basics",
      duration: 5,
      completedDuration: 3,
      modules: [
        { title: "Intro", duration: 1, completed: true },
        { title: "State", duration: 2, completed: false },
      ],
    },
    {
      id: "node",
      title: "Node.js Fundamentals",
      duration: 4,
      completedDuration: 2,
      modules: [
        { title: "Express", duration: 1, completed: true },
        { title: "DB", duration: 2, completed: false },
      ],
    },
  ],
};

function CourseCard({ course }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <span className="text-sm text-gray-500">
          {course.completedDuration}/{course.duration} hrs
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full mb-4">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            width: `${(course.completedDuration / course.duration) * 100}%`,
          }}
        />
      </div>
      <ul className="grid grid-cols-1 gap-2 text-sm">
        {course.modules.map((m, i) => (
          <li
            key={i}
            className={`rounded px-3 py-2 border ${
              m.completed
                ? "bg-green-50 border-green-400"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            {m.title} - {m.duration} hr
          </li>
        ))}
      </ul>
    </div>
  );
}

function SortableCourseCard({ course }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: course.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-xl shadow p-5 mb-4 border-l-4 border-blue-500 cursor-grab"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <span className="text-sm text-gray-500">
          {course.completedDuration}/{course.duration} hrs
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full mb-4">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            width: `${(course.completedDuration / course.duration) * 100}%`,
          }}
        />
      </div>
      <ul className="grid grid-cols-1 gap-2 text-sm">
        {course.modules.map((m, i) => (
          <li
            key={i}
            className={`rounded px-3 py-2 border ${
              m.completed
                ? "bg-green-50 border-green-400"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            {m.title} - {m.duration} hr
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TrackPage() {
  const [track, setTrack] = useState(initialTrack);
  const [isEditingOrder, setIsEditingOrder] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = track.courses.findIndex((c) => c.id === active.id);
      const newIndex = track.courses.findIndex((c) => c.id === over.id);
      const newCourses = arrayMove(track.courses, oldIndex, newIndex);
      setTrack({ ...track, courses: newCourses });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">{track.title}</h2>
        <button
          className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setIsEditingOrder((prev) => !prev)}
        >
          {isEditingOrder ? "Done" : "Edit Order"}
        </button>
      </div>

      {isEditingOrder ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={track.courses.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {track.courses.map((course) => (
              <SortableCourseCard key={course.id} course={course} />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        track.courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))
      )}
    </div>
  );
}
