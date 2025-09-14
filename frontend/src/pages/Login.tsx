import { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/login.webp";
import { loginUser } from "../redux/slices/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || loading) return;
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      // Optional: navigate or show success toast here
    } catch (_) {
      // Error is handled via Redux state; optionally handle local UI
    }
  };

  return (
    <div className="flex">
      {/* Left hand side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Ecommerce</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
          <p className="text-center mb-6">
            Enter your username and password to login
          </p>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="mb-3 text-sm text-red-600" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white p-2 rounded-lg font-semibold transition ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <p className="mt-6 text-center text-sm">
            Don't have an account?
            <Link
              to="/register"
              className="text-blue-500 hover:underline font-semibold ml-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Right hand side */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-[600px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
