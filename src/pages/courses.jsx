import React from "react"
import Search from "@/components/search.jsx"
import { CourseCard } from "../components/course-card"
import { useSelector } from "react-redux"

const Index = () => {
    const search = useSelector((s) => s.search.search.toLowerCase())

    const courses = [
        {
            id: "1",
            title: "Complete Web Development Bootcamp",
            description:
                "Master modern web development with React, TypeScript, and Node.js. Build real-world projects and become a full-stack developer.",
            instructor: "Sarah Johnson",
            image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/is_web_development_good_career.jpg",
            duration: "42h",
            students: 15234,
            rating: 4.8,
            totalRatings: 3421,
            price: { current: 89, original: 199 },
            level: "Intermediate",
            category: "Web Development",
            isFeatured: true,
        },
        {
            id: "2",
            title: "Data Science & Machine Learning Masterclass",
            description:
                "Learn Python, statistics, machine learning algorithms, and AI. Complete hands-on projects with real datasets.",
            instructor: "Dr. Michael Chen",
            image: "https://www.mygreatlearning.com/blog/wp-content/uploads/2019/09/What-is-data-science-2.jpg",
            duration: "56h",
            students: 8967,
            rating: 4.9,
            totalRatings: 2134,
            price: { current: 149, original: 299 },
            level: "Advanced",
            category: "Data Science",
            isPremium: true,
        },
        {
            id: "3",
            title: "Mobile App Development with React Native",
            description:
                "Build native iOS and Android apps using React Native. From basics to app store deployment.",
            instructor: "Alex Rodriguez",
            image: "https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg?semt=ais_hybrid&w=740",
            duration: "38h",
            students: 12543,
            rating: 4.7,
            totalRatings: 1876,
            price: { current: 79, original: 159 },
            level: "Beginner",
            category: "Mobile Development",
            progress: 65,
        },
    ]

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
