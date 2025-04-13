import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
  
    const result = await login(username, password); 
  
    if (result.success) {
      toast.success("Successfully logged in!");
    } else {
      toast.error(result.message || "Login failed");
    }
  };
  
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 rounded-lg shadow-lg max-w-md w-full text-center bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {user.username}!
          </h2>
          <p className="text-gray-600">
            You are successfully logged in{user.isAdmin ? " as an Admin." : "."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

