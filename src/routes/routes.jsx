import { Routes, Route } from 'react-router-dom'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/test" element={<h1>Testing</h1>} />

        </Routes>
    )
}
