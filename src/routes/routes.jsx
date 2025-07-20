import { Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/forms/login.jsx"
import Index from "@/pages/courses.jsx"
import Enrolled from "@/pages/enrolled"
import { useSelector } from "react-redux"
import Registration from '@/pages/forms/registration.jsx'

export function PrivateRoute({ children }) {
    const isAuth = useSelector((state) => state.auth.isAuth)
    return isAuth ? children : <Navigate to="/login" />
}

import CourseForm from "../pages/forms/AddCourse"
import { userTypes } from "../lib/utils"
import CourseView from "../pages/CourseDetails"
import TrackView from "../pages/MyTrack"
import UserProfile from "../pages/UserProfile"

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path='/registration' element={<Registration/>}></Route>
            <Route path="/courses" element={<Index />} />

            {/* Protected Routes */}
            <Route
                path={`${userTypes.STUDENT}/enrolled`}
                element={
                    <PrivateRoute>
                        
                        <Index fetchArchived={false} />
                    </PrivateRoute>
                }
            />
            <Route path={'/profile'} element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            {/* provider routes  */}
            <Route path={`courses/:courseId`} element={<CourseView/>} />
            <Route path={`tracks/:trackId`} element={<TrackView />} />
            <Route path={`${userTypes.PROVIDER}/add-course`} element={<CourseForm/>} />
        </Routes>
    )
}
