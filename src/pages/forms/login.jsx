import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Form = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const isAuth = useSelector((state) => state.auth.isAuth);

    const [email, setEmail] = useState("");
    const [pass, setpass] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(dispatch(login({ name: email.split("@")[0], email })));
    };

    useEffect(() => {
        if (isAuth) {
            nav("/");
        }
    }, [isAuth, nav]);

    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <Card className="w-[380px] shadow-lg rounded-2xl animate-fade-in-up transition-all duration-500">
                <CardContent className="p-6 space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Login to Your Account
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Please enter your credentials to continue
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={pass}
                            onChange={(e) => setpass(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        >
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Form;
