import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <form className="flex flex-col gap-4 p-18 rounded-3xl backdrop-blur-xs shadow-xl">
        <h2 className="font-bold text-3xl text-center">Login</h2>
        <input
          type="email"
          placeholder="Enter Your Email"
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />
        <input
          type="password"
          placeholder="Password"
          minLength={8}
          maxLength={20}
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />
        <Link
          to="/forgetpassword"
          className=" text-white underline hover:text-violet-500"
        >
          Forget Password?
        </Link>
        <button
          type="submit"
          className="bg-blue-400 text-white font-medium py-2 rounded-xl hover:cursor-pointer"
        >
          Login
        </button>
        <span className=" text-white">
          Not have an account?{" "}
          <Link
            to="/Signup"
            className=" text-white underline hover:text-violet-500"
          >
            Sign Up Here
          </Link>
        </span>
        <Link
          to="/"
          className="bg-gray-300 text-black py-2 rounded-xl text-center"
        >
          Back to Home
        </Link>
      </form>
    </div>
  );
}
