import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://helath-connect.onrender.com/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed! Invalid credentials.");
      }

      console.log("Login success:", data);
      toast.success("Login successful!");
      navigate("/dashboard"); 
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error during login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={input.userName}
              placeholder="Enter your username"
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={input.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Log in
          </button>
        </form>

        {/* Forgot Password & Signup Links */}
        <div className="text-center mt-4 text-sm text-gray-500"> 
          
        
          <Link to="/contact" className="hover:text-blue-600 transition">
            Sign up
          </Link> 
        </div>
      </div>
    </div>
  );
}; 

export default Login;
