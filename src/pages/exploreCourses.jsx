import { useEffect, useState } from "react";
// your existing function
import { CourseCard } from "../components/course-card";
import { getAllCourses } from "../services/course";

const ExploreCourses = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCourses = await getAllCourses(); // your provided fetch function
        const now = new Date().toISOString();

        const upcomingCourses = allCourses.filter(c => c.startDate > now);
        const ongoingCourses = allCourses.filter(
          c => c.startDate <= now && c.endDate >= now
        );
        console.log(upcomingCourses, ongoingCourses);
        setUpcoming(upcomingCourses);
        setOngoing(ongoingCourses);
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Ongoing Courses</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ongoing.length ? (
            ongoing.map(course => (
              <CourseCard key={course.id} {...course} />
            ))
          ) : (
            <p className="text-gray-500">No ongoing courses found.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Courses</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.length ? (
            upcoming.map(course => (
              <CourseCard key={course.id} {...course} />
            ))
          ) : (
            <p className="text-gray-500">No upcoming courses found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExploreCourses;
