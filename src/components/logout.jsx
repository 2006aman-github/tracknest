// src/components/logout.jsx
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(logout());
        navigate("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full text-left px-2 py-1.5 hover:bg-muted rounded text-sm font-medium"
        >
            Logout
        </button>
    );
}
