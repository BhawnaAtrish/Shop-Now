"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState(""); // For signup only
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (mode === "signup") {
      if (!username || !password || !rePassword) {
        setMessage("Please fill in all fields.");
        return;
      }

      if (password !== rePassword) {
        setMessage("Passwords do not match.");
        return;
      }

      if (users[username]) {
        setMessage("User already exists.");
      } else {
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        setMessage("Signup successful.");
        setTimeout(() => router.push("/login"), 1500);
      }
    } else {
      if (users[username] === password) {
        setMessage(`Welcome, ${username}!`);
        setTimeout(() => router.push("/landing-page"), 1000);
      } else {
        setMessage("Invalid credentials.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
      <div className="bg-[#FAF0DC] p-10 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#E58E27] mb-6 text-center">
          ShopNow
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Re-enter Password only for signup */}
        {mode === "signup" && (
          <input
            type="password"
            placeholder="Re-enter Password"
            className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none text-black"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        )}

        {/* Button */}
        <button
          className="w-full p-3 bg-[#E58E27] text-white font-semibold rounded-full hover:opacity-90 transition"
          onClick={handleSubmit}
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        {/* Toggle Link */}
        <p className="mt-4 text-center text-sm text-[#A1A1AA]">
          {mode === "login" ? "Don't have an account?" : "Already registered?"}{" "}
          <a
            href={mode === "login" ? "/signup" : "/login"}
            className="text-[#E58E27] font-medium"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </a>
        </p>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm font-semibold text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
