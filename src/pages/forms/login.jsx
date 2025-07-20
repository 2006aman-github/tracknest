import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
            dispatch(login({user:plainUser, userProfile: {...userProfile,  createdAt: userProfile.createdAt?.toDate?.().toISOString?.() || null,}}));
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        if (isAuth) navigate("/");
    }, [isAuth, navigate]);

    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <div className="flex gap-10 flex-wrap justify-center">
                {/* User Login */}
                <Card className="w-[360px] shadow-lg rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                User Login
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Login as a regular user</p>
                        </div>
                        <form onSubmit={(e) => handleLogin(e, user)} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="User Email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                            />
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                                Login as User
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Admin Login */}
                <Card className="w-[360px] shadow-lg rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                                Admin Login
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Login as an admin</p>
                        </div>
                        <form onSubmit={(e) => handleLogin(e, admin)} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Admin Email"
                                value={admin.email}
                                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={admin.password}
                                onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
                                required
                            />
                            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
                                Login as Admin
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Provider Login */}
                <Card className="w-[360px] shadow-lg rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                Provider Login
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Login as a provider</p>
                        </div>
                        <form onSubmit={(e) => handleLogin(e, provider)} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Provider Email"
                                value={provider.email}
                                onChange={(e) => setProvider({ ...provider, email: e.target.value })}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={provider.password}
                                onChange={(e) => setProvider({ ...provider, password: e.target.value })}
                                required
                            />
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                                Login as Provider
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
