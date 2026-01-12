import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <form className="flex flex-col gap-4 p-18 rounded-3xl backdrop-blur-xs shadow-xl">
        <h2 className="font-bold text-3xl text-center">Sign up</h2>
        <input
          type="text"
          placeholder="Enter Your Username"
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />
        <input
          type="password"
          placeholder="Password"
          minlength={8}
          maxlength={20}
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />
        <input
          type="password"
          placeholder="Comfirm Password"
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />
        <button
          type="submit"
          className="bg-blue-400 text-white font-medium py-2 rounded-xl hover:cursor-pointer"
        >
          Sign Up
        </button>
        <span className="text-white">
          Already have an account?
          <Link
            to="/Login"
            className="text-white underline hover:text-violet-500"
          >
            Login
          </Link>
        </span>
        <hr />
        <button className="flex justify-center items-center bg-amber-300 font-medium gap-2 hover:cursor-pointer">
          <img
            src="google.png"
            alt="Google logo"
            width={25}
            className="py-2 rounded-xl "
          />
          Login with google
        </button>
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