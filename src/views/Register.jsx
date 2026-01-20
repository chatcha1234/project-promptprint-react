import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function Register() {
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      // ส่ง tokenResponse.access_token ไป backend ได้
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <form className="flex flex-col gap-4 p-18 rounded-3xl backdrop-blur-xs shadow-xl min-w-[350px]">
        <h2 className="font-bold text-3xl text-center text-white">Sign up</h2>

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
          placeholder="Confirm Password"
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />

        <button
          type="submit"
          className="bg-blue-400 text-white font-medium py-2 rounded-xl"
        >
          Sign Up
        </button>

        <span className="text-white">
          Already have an account?{" "}
          <Link to="/Login" className="underline hover:text-violet-500">
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
