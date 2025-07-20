import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { login } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createUserProfile } from "../../services/userProfile";
import { userTypes } from "../../lib/utils";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: "", password: "" });
    const [admin, setAdmin] = useState({ email: "", password: "" });
    const [provider, setProvider] = useState({ email: "", password: "" });

    const handleRegister = async (e, creds, userType) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, creds.email, creds.password);
            // make userProfile
            await createUserProfile(userCredential.user.uid, {userType})
            alert("Registration successful!");
            // Dispatch login action
            dispatch(login(userCredential.user));
            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <div className="flex gap-10 flex-wrap justify-center">
                {/* User Register */}
                <Card className="w-[360px] shadow-lg rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                User Registration
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Create a regular user account</p>
                        </div>
                        <form onSubmit={(e) => handleRegister(e, user, userTypes.STUDENT)} className="space-y-4">
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
                                Register as User
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Admin Register */}
                {/* <Card className="w-[360px] shadow-lg rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                                Admin Registration
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Create an admin account</p>
                        </div>
                        <form onSubmit={(e) => handleRegister(e, admin)} className="space-y-4">
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
                                Register as Admin
                            </Button>
                        </form>
                    </CardContent>
                </Card> */}

                {/* Provider Register */}
                <Card className="w-[360px] shadow-lg rounded-2xl">
                    <CardContent className="p-6 space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                Provider Registration
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Create a provider account</p>
                        </div>
                        <form onSubmit={(e) => handleRegister(e, provider, userTypes.PROVIDER)} className="space-y-4">
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
                                Register as Provider
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;
