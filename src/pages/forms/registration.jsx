import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { login } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserProfile } from "../../services/userProfile";
import { userTypes } from "../../lib/utils";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [provider, setProvider] = useState({ email: "", password: "" });

  const handleRegister = async (e, creds, userType) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        creds.email,
        creds.password
      );
      await createUserProfile(userCredential.user.uid, { userType });
      dispatch(login(userCredential.user));
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#4a3e2c] text-white px-4 py-12 flex flex-col items-center justify-center space-y-16">
      <section className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Register</h1>

        {/* Student Registration */}
        <form
          onSubmit={(e) => handleRegister(e, user, userTypes.STUDENT)}
          className="w-full space-y-4 mb-12"
        >
          <h2 className="text-2xl font-semibold">Student Registration</h2>
          <Input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="bg-[#3d3326] border-none text-white"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="bg-[#3d3326] border-none text-white"
            required
          />
          <Button
            type="submit"
            className="bg-[#7a6642] hover:bg-[#8b734f] text-white w-full"
          >
            Register as Student
          </Button>
        </form>

        {/* Provider Registration */}
        <form
          onSubmit={(e) => handleRegister(e, provider, userTypes.PROVIDER)}
          className="w-full space-y-4"
        >
          <h2 className="text-2xl font-semibold">Provider Registration</h2>
          <Input
            type="email"
            placeholder="Email"
            value={provider.email}
            onChange={(e) => setProvider({ ...provider, email: e.target.value })}
            className="bg-[#3d3326] border-none text-white"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={provider.password}
            onChange={(e) => setProvider({ ...provider, password: e.target.value })}
            className="bg-[#3d3326] border-none text-white"
            required
          />
          <Button
            type="submit"
            className="bg-[#7a6642] hover:bg-[#8b734f] text-white w-full"
          >
            Register as Provider
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Register;
