import { useState } from "react";
import { Link } from "react-router-dom";
import registerImage from "../assets/register.webp";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="flex">
      {/* Left hand side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Ecommerce</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
          <p className="text-center mb-6">
            Enter your username and password to login
          </p>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>
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

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
          <p className="mt-6 text-center text-sm">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-semibold ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right hand side */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={registerImage}
            alt="Register"
            className="w-full h-[700px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
