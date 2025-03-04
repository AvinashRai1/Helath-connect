import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Contact = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    gender: "",
    userName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (gender) => {
    setInput({ ...input, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("Signup success:", data);
      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error during signup");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={input.firstName}
              onChange={handleChange}
              name="firstName"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={input.lastName}
              onChange={handleChange}
              name="lastName"
            />
          </div>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={handleChange}
            value={input.userName}
            name="userName"
          />

          {/* Password Fields */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={handleChange}
            value={input.password}
            name="password"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={handleChange}
            value={input.confirmPassword}
            name="confirmPassword"
          />

          {/* Gender Selection */}
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={input.gender} />

          {/* Already have an account? */}
          <Link to="/login" className="text-sm text-blue-600 hover:underline block text-center">
            Already have an account?
          </Link>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default Contact;
