import React from "react";
import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen  flex flex-col">
      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AuthLayout;

{
  /* Navbar */
}
{
  /* <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MyApp
          </Link>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </nav> */
}
