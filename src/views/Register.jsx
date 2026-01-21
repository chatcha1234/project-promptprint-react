import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      // ส่ง tokenResponse.access_token ไป backend ได้
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Please login.");
        navigate("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Register Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-18 rounded-3xl backdrop-blur-xs shadow-xl min-w-[350px]"
      >
        <h2 className="font-bold text-3xl text-center text-white">Sign up</h2>

        {error && (
          <p className="text-red-500 text-center font-bold bg-white/80 p-2 rounded">
            {error}
          </p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Enter Your Username"
          className="bg-white py-2 px-3 w-full rounded-xl"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="bg-white py-2 px-3 w-full rounded-xl"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength={8}
          maxLength={20}
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />

        <button
          type="submit"
          className="bg-blue-400 text-white font-medium py-2 rounded-xl hover:bg-blue-500 transition-colors"
        >
          Sign Up
        </button>

        <span className="text-white">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-violet-500">
            Login
          </Link>
        </span>

        <hr />

        <button
          type="button"
          onClick={() => loginWithGoogle()}
          className="flex items-center justify-center gap-2 bg-white text-black py-2 px-4 rounded-xl shadow hover:bg-gray-100"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Log In With Google
        </button>

        <Link
          to="/"
          className="bg-gray-300 text-black py-2 rounded-xl text-center hover:bg-gray-400 transition-colors"
        >
          Back to Home
        </Link>
      </form>
    </div>
  );
}
