import { useEffect } from "react";
import Router from './routes/routes'
import Navbar from "@/components/navbar.jsx"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import { getUserProfile } from "./services/userProfile";

function App() {
    const dispatch = useDispatch();

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth,async (user) => {
    if (user) {
      // Set user in Redux/store
      const plainUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      // Dispatch an action to set the user in the store
      // dispatch(setUser(plainUser));
                  const userProfile = await getUserProfile(user.uid);
      
      dispatch(login({user:plainUser, userProfile: {...userProfile,  createdAt: userProfile.createdAt?.toDate?.().toISOString?.() || null,}}));
      
    } else {
      // Logged out
        dispatch(logout());

    } 
  });

  return () => unsubscribe();
}, []);
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
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
