import React, { useEffect, useState } from "react"
import Search from "@/components/search.jsx"
import { CourseCard } from "../components/course-card"
import { useSelector } from "react-redux"
import { getCompletedCourses, getEnrolledCourses } from "../services/course"
import { userTypes } from "../lib/utils"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"

const Index = ({fetchArchived}) => {
    const search = useSelector((s) => s.search.search.toLowerCase())
    const { user, userProfile } = useSelector((state) => state.auth)
    const [courses, setCourses] = useState([])

    const { userType } = userProfile
    useEffect(() => {
        // Fetch enrolled courses if needed
        if(userType !== userTypes.STUDENT) return;
        if (fetchArchived) {
            // Call the function to fetch enrolled courses
            getCompletedCourses(user.uid)
                .then(courses => {
                    // Handle the fetched courses if needed
                 setCourses(courses)
                })
                .catch(err => {
                    console.error("Error fetching enrolled courses:", err);
                });
        }else{
           
            getEnrolledCourses(user.uid).then(courses => {
                // Handle the fetched courses if needed
                console.log(courses)
                setCourses(courses)
            }).catch(err => {
                console.error("Error fetching enrolled courses:", err);
            })
        }
    }, [userType, fetchArchived, user.uid])


    const filtered = courses.filter((c) =>
        c.title.toLowerCase().includes(search)
    )






    return (
        <div className="min-h-screen bg-white">
          
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto mb-10">
                    <Search className="w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filtered.map((course, index) => (
                        <div
                            key={course.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <CourseCard {...course} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Index
