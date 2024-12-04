import { Link } from "react-router-dom";

const Navbar = () => {
  const user = { role: "admin" };
  return (
    <nav className="bg-blue-800 text-white shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-2xl font-bold">
          <Link to="/">Restaurant</Link>
        </div>
        <div className="space-x-6">
          {user.role === "admin" && (
            <Link to="/admin" className="hover:text-gray-400">
              Admin Dashboard
            </Link>
          )}
          {user.role === "waiter" && (
            <Link to="/waiter" className="hover:text-gray-400">
              Waiter Orders
            </Link>
          )}
          {user.role === "cook" && (
            <Link to="/cook" className="hover:text-gray-400">
              Cook Dashboard
            </Link>
          )}
          <Link to="/" className="hover:text-gray-400">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
