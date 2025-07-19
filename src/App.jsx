import Router from './routes/routes'
import Navbar from "@/components/navbar.jsx"

function App() {
  return (
    <div className='w-[100vw]'>
      <div className="fixed z-50 w-full">
        <Navbar />
      </div>
      <div className="pt-16">
        <Router />
      </div>
    </div>
  )
}

export default App
