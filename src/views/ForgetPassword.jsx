import { Link } from "react-router-dom";

export default function ForgetPassword(){
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <form className="flex flex-col gap-4 p-18 rounded-3xl backdrop-blur-xs shadow-xl">
        <h2 className="font-bold text-3xl text-center">Forget Password</h2>
        <input
          type="email"
          placeholder="Enter Your Email"
          className="bg-white py-2 px-3 w-80 rounded-xl"
          required
        />
        <Link
          to = "/resetpassword"
          className="bg-blue-400 text-white text-center font-medium py-2 rounded-xl hover:cursor-pointer"
        >
          Reset Password
        </Link>
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