import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/courses'
import Form from '@/pages/forms/login.jsx'
import Enrolled from '@/pages/enrolled.jsx'
import CourseForm from "../pages/forms/AddCourse"
import { userTypes } from "../lib/utils"
import CourseView from "../pages/CourseDetails"
import TrackView from "../pages/MyTrack"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/test" element={<h1>Testing</h1>} />
            <Route path="/courses" element={<Index/>} />
            <Route path="/login" element={<Form/>} />
            <Route path={`${userTypes.STUDENT}/enrolled`} element={<Enrolled/>} />
            {/* provider routes  */}
            <Route path={`courses/:courseId`} element={<CourseView/>} />
            <Route path={`tracks/:trackId`} element={<TrackView />} />
            <Route path={`${userTypes.PROVIDER}/add-course`} element={<CourseForm/>} />
        </Routes>
    )
}
