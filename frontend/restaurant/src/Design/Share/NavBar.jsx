import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // Lucide icon
import { useOrderCart } from "@/context/OrderCartContext";
import { useAuth } from "@/context/AuthContext";
import LogoutDialog from "./LogoutDialog";

const Navbar = () => {
  const { cartItems } = useOrderCart(); // Access cart items from the context
  const { user, isLoading } = useAuth();
  const location = useLocation(); // Hook to get the current location

  if (isLoading) {
    return <div>is loading</div>;
  }

  return (
    <nav className="bg-white border-b text-black shadow-md py-2">
      <div className="container h-[50px] mx-auto flex justify-between items-center px-6">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-black">
            Restaurant
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link
            to="/admin"
            className={`${
              location.pathname === "/admin" ? "font-bold" : ""
            } text-black`}
          >
            Admin Dashboard
          </Link>

          <Link
            to="/waiter/order"
            className={`${
              location.pathname === "/waiter/order" ? "font-bold" : ""
            } text-black`}
          >
            Waiter Orders
          </Link>

          <Link
            to="/cook"
            className={`${
              location.pathname === "/cook" ? "font-bold" : ""
            } text-black`}
          >
            Cook Dashboard
          </Link>

          <LogoutDialog />

          <div className="flex items-center justify-center bg-white w-[35px] h-[35px] rounded-full shadow-lg  text-center">
            {user?.name[0]}
          </div>

          {/* Add to Cart Icon with number of items */}
          <Link to="/waiter/order/summary" className="relative">
            <ShoppingCart size={24} className="text-black" />
            {/* Cart item count badge */}
            {cartItems.length > 0 && (
              <span className="absolute top-[-10px] right-[-15px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
