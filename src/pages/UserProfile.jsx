import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import UserAvatar from "../components/UserAvatar"

function UserProfile() {
    // This component will display user profile information
    // You can fetch user data from the store or directly from the service
    const {user, userProfile} = useSelector((state) => state.auth)
  
    
  return (
<div className="max-w-3xl mx-auto p-6">
       
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4"><UserAvatar /> {user.name}</h2>
        <p className="text-gray-600 mb-2">📧 {user.email}</p>

        <div className="mb-4">
          <h3 className="font-semibold">🧠 Skills:</h3>
          <ul className="list-disc list-inside">
            {userProfile.skills?.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4 flex flex-row gap-2">
          <h3 className="font-semibold">🎓 Enrolled Courses:</h3>
         <div>

            {userProfile.enrolledCourses?.length || "No courses enrolled yet."}
         </div>
        
        </div>

        <div className=" flex flex-row gap-2">
          <h3 className="font-semibold">✅ Completed Modules:</h3>
          <div className="list-disc list-inside">
            {userProfile.completedModules?.length || "No courses enrolled yet."}
          </div>
        </div>
      </div>
    </div>  )
}

export default UserProfile
