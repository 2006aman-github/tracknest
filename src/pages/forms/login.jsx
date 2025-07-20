import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { getUserProfile } from "../../services/userProfile";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [user, setUser] = useState({ email: "", password: "" });
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [provider, setProvider] = useState({ email: "", password: "" });

  const handleLogin = async (e, creds) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, creds.email, creds.password);
      const plainUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      };
      const userProfile = await getUserProfile(userCredential.user.uid);
      dispatch(
        login({
          user: plainUser,
          userProfile: {
            ...userProfile,
            createdAt: userProfile.createdAt?.toDate?.().toISOString?.() || null,
          },
        })
      );
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  return (
    <div className="min-h-screen bg-[#f8f1e5] text-[#4e3c2d] px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
        {/* User Login */}
        <div className="w-full max-w-sm space-y-5 bg-[#f3e8d9] p-6 rounded-xl shadow-md">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">User Login</h1>
            <p className="text-sm text-[#7c6a58]">Login as a regular user</p>
          </div>
          <form onSubmit={(e) => handleLogin(e, user)} className="space-y-4">
            <Input
              type="email"
              placeholder="User Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="bg-white"
            />
            <Input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="bg-white"
            />
            <Button type="submit" className="w-full bg-[#5e493c] hover:bg-[#4e3c2d] text-white">
              Login as User
            </Button>
          </form>
        </div>

        {/* Admin Login */}
        <div className="w-full max-w-sm space-y-5 bg-[#f3e8d9] p-6 rounded-xl shadow-md">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-sm text-[#7c6a58]">Login as an admin</p>
          </div>
          <form onSubmit={(e) => handleLogin(e, admin)} className="space-y-4">
            <Input
              type="email"
              placeholder="Admin Email"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              required
              className="bg-white"
            />
            <Input
              type="password"
              placeholder="Password"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              required
              className="bg-white"
            />
            <Button type="submit" className="w-full bg-[#8b3d3d] hover:bg-[#6b2d2d] text-white">
              Login as Admin
            </Button>
          </form>
        </div>

        {/* Provider Login */}
        <div className="w-full max-w-sm space-y-5 bg-[#f3e8d9] p-6 rounded-xl shadow-md">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Provider Login</h1>
            <p className="text-sm text-[#7c6a58]">Login as a provider</p>
          </div>
          <form onSubmit={(e) => handleLogin(e, provider)} className="space-y-4">
            <Input
              type="email"
              placeholder="Provider Email"
              value={provider.email}
              onChange={(e) => setProvider({ ...provider, email: e.target.value })}
              required
              className="bg-white"
            />
            <Input
              type="password"
              placeholder="Password"
              value={provider.password}
              onChange={(e) => setProvider({ ...provider, password: e.target.value })}
              required
              className="bg-white"
            />
            <Button type="submit" className="w-full bg-[#3d8b64] hover:bg-[#2e6f50] text-white">
              Login as Provider
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
