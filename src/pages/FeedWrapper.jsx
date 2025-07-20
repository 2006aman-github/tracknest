import React from 'react'
import { PrivateRoute } from "../routes/routes"
import { useSelector } from "react-redux"
import Index from "./courses"

function FeedWrapper({children}) {
    // get user 
    const {userProfile: {userType}} = useSelector((state) => state.auth)

  return (
   

    <div>
    
            <Index fetchArchived={false} />
            {...children}
    </div>
 
  )
}

export default FeedWrapper
