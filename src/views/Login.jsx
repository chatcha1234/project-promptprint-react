import { Link, useNavigate } from "react-router-dom";
// import { useGoogleLogin } from "@react-oauth/google";
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
        window.location.reload(); // Reload to update Navbar state
      } else {
        alert(data.error || "Login Failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // const loginWithGoogle = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     console.log("Google Login Success:", tokenResponse);
  //     // ส่ง tokenResponse.access_token ไป backend ได้
  //   },
  //   onError: () => {
  //     console.log("Google Login Failed");
  //   },
  // });

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-18 rounded-3xl backdrop-blur-xs shadow-xl min-w-87.5"
      >
        <h2 className="font-bold text-3xl text-center text-white">Login</h2>

        <input
          type="text"
          name="email"
          placeholder="Enter Your Email or Username"
          className="bg-white py-2 px-3 w-full rounded-xl outline-none"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength={6}
          className="bg-white py-2 px-3 w-full rounded-xl"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <Link
          to="/Forgetpassword"
          className="text-white underline hover:text-violet-500"
        >
          Forget Password?
        </Link> */}

        <button
          type="submit"
          className="bg-blue-400 text-white font-medium py-2 rounded-xl"
        >
          Login
        </button>

        <span className="text-white">
          Not have an account?{" "}
          <Link to="/signup" className="underline hover:text-violet-500">
            Sign Up Here
          </Link>
        </span>

        {/* <button
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
        </button> */}

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
