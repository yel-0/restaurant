// src/components/Navbar.js
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // Lucide icon
import { useOrderCart } from "@/context/OrderCartContext";
const Navbar = () => {
  const { cartItems } = useOrderCart(); // Access cart items from the context

  return (
    <nav className="bg-white border-b text-black shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-black">
            Restaurant
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link to="/admin" className="text-black">
            Admin Dashboard
          </Link>

          <Link to="/waiter/order" className="text-black">
            Waiter Orders
          </Link>

          <Link to="/cook" className="text-black">
            Cook Dashboard
          </Link>

          <Link to="/" className="text-black">
            Logout
          </Link>

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
