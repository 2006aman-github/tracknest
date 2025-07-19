import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/courses'
import Form from '@/pages/forms/login.jsx'
import CourseForm from "../pages/forms/AddCourse"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/test" element={<h1>Testing</h1>} />
            <Route path="/courses" element={<Index/>} />
            <Route path="/login" element={<Form/>} />
            <Route path="/add-course" element={<CourseForm/>} />
        </Routes>
    )
}
