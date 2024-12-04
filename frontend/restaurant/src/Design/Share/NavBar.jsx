import { Link } from "react-router-dom";

const Navbar = () => {
  const user = { role: "cook" }; // Replace with real authentication logic later

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white">
            Restaurant
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link to="/admin" className="text-white">
            Admin Dashboard
          </Link>

          <Link to="/waiter" className="text-white">
            Waiter Orders
          </Link>

          <Link to="/cook" className="text-white">
            Cook Dashboard
          </Link>

          <Link to="/" className="text-white">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
