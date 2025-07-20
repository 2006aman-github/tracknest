import React from "react"
import { useSelector } from "react-redux"
import UserAvatar from "../components/UserAvatar"

function UserProfile() {
  const { user, userProfile } = useSelector((state) => state.auth)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-[#fef6ec] rounded-2xl shadow-xl p-8 border border-[#e7d5c4]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 border-b pb-4 border-[#e0cfc0]">
          <UserAvatar />
          <div>
            <h2 className="text-2xl font-bold text-[#5e493c]">{user.name}</h2>
            <p className="text-[#7c6a58]">📧 {user.email}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#5e493c] mb-2">🧠 Skills</h3>
          {userProfile.skills?.length ? (
            <ul className="list-disc list-inside text-[#634d3f]">
              {userProfile.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[#7c6a58] italic">No skills added yet.</p>
          )}
        </div>

        {/* Enrolled Courses */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#5e493c] mb-1">🎓 Enrolled Courses</h3>
          <p className="text-[#634d3f]">
            {userProfile.enrolledCourses?.length > 0
              ? `${userProfile.enrolledCourses.length} course(s)`
              : "No courses enrolled yet."}
          </p>
        </div>

        {/* Completed Modules */}
        <div>
          <h3 className="text-lg font-semibold text-[#5e493c] mb-1">✅ Completed Modules</h3>
          <p className="text-[#634d3f]">
            {userProfile.completedModules?.length > 0
              ? `${userProfile.completedModules.length} module(s)`
              : "No modules completed yet."}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
