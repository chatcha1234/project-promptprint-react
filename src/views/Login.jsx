import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);
        alert("Login Successful");
        navigate("/");
        window.location.reload();
      } else {
        alert(data.error || "Login Failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/60"></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 flex flex-col gap-4 p-12 rounded-xl bg-white shadow-xl min-w-[360px]"
      >
        <h2 className="font-bold text-3xl text-center text-gray-900">Login</h2>

        <input
          type="text"
          name="email"
          placeholder="Enter Your Email or Username"
          className="bg-gray-50 py-3 px-4 w-full rounded-lg outline-none border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength={6}
          className="bg-gray-50 py-3 px-4 w-full rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-teal-500 text-white font-medium py-3 rounded-lg hover:bg-teal-600 transition-all"
        >
          Login
        </button>

        <span className="text-gray-600 text-center">
          Not have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-500 hover:text-teal-600 font-medium"
          >
            Sign Up Here
          </Link>
        </span>

        <Link
          to="/"
          className="bg-gray-100 text-gray-700 py-3 rounded-lg text-center hover:bg-gray-200 transition-colors font-medium"
        >
          Back to Home
        </Link>
      </form>
    </div>
  );
}
