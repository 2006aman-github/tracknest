import { CourseCard } from "../components/course-card";

const Index = () => {
    const courses = [
        {
            id: "1",
            title: "Complete Web Development Bootcamp",
            description:
                "Master modern web development with React, TypeScript, and Node.js. Build real-world projects and become a full-stack developer.",
            instructor: "Sarah Johnson",
            image: "https://source.unsplash.com/featured/?web,code", // Placeholder image
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
            image: "https://source.unsplash.com/featured/?data,ai", // Placeholder image
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
            image: "https://source.unsplash.com/featured/?mobile,app", // Placeholder image
            duration: "38h",
            students: 12543,
            rating: 4.7,
            totalRatings: 1876,
            price: { current: 79, original: 159 },
            level: "Beginner",
            category: "Mobile Development",
            progress: 65,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Stunning Course Cards
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Beautiful, responsive course cards with elegant animations and modern design
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {courses.map((course, index) => (
                        <div
                            key={course.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <CourseCard {...course} />
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Features Showcase
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <h3 className="font-semibold text-blue-600 mb-2">Interactive Animations</h3>
                            <p className="text-sm text-gray-600">Smooth hover effects and transitions</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <h3 className="font-semibold text-blue-600 mb-2">Responsive Design</h3>
                            <p className="text-sm text-gray-600">Looks great on all devices</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <h3 className="font-semibold text-blue-600 mb-2">Modern UI</h3>
                            <p className="text-sm text-gray-600">Clean and professional appearance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
