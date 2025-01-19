import React from "react";
import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen  flex flex-col">
      <nav className="bg-white  py-4">
        <div className="container mx-auto px-16 flex justify-between items-center">
          <div className="flex flex-row justify-center items-center p-3">
            <Crown className="text-4xl mr-2" />
            <h2 className="text-2xl text-black">Iron Fork</h2>
          </div>
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
      </nav>
      {/* Main Content */}
      <main className="p-6">{children}</main>
      <footer className=" text-black py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2025 Iron Fork. All rights reserved.</p>
          <div className="mt-2">
            <Link
              to="/privacy-policy"
              className="text-blue-400 hover:text-blue-500"
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link to="/terms" className="text-blue-400 hover:text-blue-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;

{
  /* Navbar */
}
