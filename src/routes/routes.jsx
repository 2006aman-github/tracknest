import { Routes, Route } from 'react-router-dom'
import Index from '../pages/courses'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/test" element={<h1>Testing</h1>} />
            <Route path="/courses" element={<Index/>} />
        </Routes>
    )
}
