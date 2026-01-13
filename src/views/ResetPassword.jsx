import { Link } from "react-router-dom";

export default function ResetPassword(){
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <form className="flex flex-col gap-4 p-18 rounded-3xl backdrop-blur-xs shadow-xl">
        <h2 className="font-bold text-3xl text-center">Reset Password</h2>
        <label className="font-bold">New Password</label>
        <input
          type="password"
          placeholder="New Password"
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />
        <label className="font-bold">Password Confirm</label>
        <input
          type="password"
          placeholder="Password Confirm"
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />
        <button
          type="submit"
          className="bg-blue-400 text-white text-center font-medium py-2 rounded-xl hover:cursor-pointer"
        >
          Change Password
        </button>
        <Link
          to="/login"
          className="bg-gray-300 text-black py-2 rounded-xl text-center"
        >
          Back to Log in
        </Link>
        <hr />
        <Link
          to="/"
          className="bg-gray-300 text-black py-2 rounded-xl text-center"
        >
          Back to Home
        </Link>
      </form>
    </div>
  )
}