import { Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/forms/login"
import Index from "@/pages/courses.jsx"
import Enrolled from "@/pages/enrolled"
import { useSelector } from "react-redux"

function PrivateRoute({ children }) {
    const isAuth = useSelector((state) => state.auth.isAuth)
    return isAuth ? children : <Navigate to="/login" />
}

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Index />} />

            {/* Protected Routes */}
            <Route
                path="/enrolled"
                element={
                    <PrivateRoute>
                        <Enrolled />
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}
