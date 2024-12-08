import React from "react";
import WaiterMenuItemCard from "@/Design/Waiter/WaiterMenuItemCard";
import WaiterOrderSummary from "@/Design/Waiter/WaiterOrderSummary";
import CategorySelector from "@/Design/Share/CategorySelector";

// Fake data for the menu items
const fakeMenuItems = [
  {
    id: 1,
    name: "Burger",
    image: "https://via.placeholder.com/300?text=Burger",
    description: "A delicious beef burger",
    stock: 10,
    price: 8.99,
  },
  {
    id: 2,
    name: "Pizza",
    image: "https://via.placeholder.com/300?text=Pizza",
    description: "Cheese pizza with fresh toppings",
    stock: 5,
    price: 12.99,
  },
  {
    id: 3,
    name: "Pasta",
    image: "https://via.placeholder.com/300?text=Pasta",
    description: "Classic Italian pasta",
    stock: 7,
    price: 10.99,
  },
  {
    id: 4,
    name: "Fries",
    image: "https://via.placeholder.com/300?text=Fries",
    description: "Crispy golden fries",
    stock: 15,
    price: 3.99,
  },
  {
    id: 5,
    name: "Salad",
    image: "https://via.placeholder.com/300?text=Salad",
    description: "Fresh mixed salad",
    stock: 8,
    price: 5.99,
  },
  {
    id: 6,
    name: "Soda",
    image: "https://via.placeholder.com/300?text=Soda",
    description: "Refreshing soda drink",
    stock: 20,
    price: 1.99,
  },
  {
    id: 7,
    name: "Coffee",
    image: "https://via.placeholder.com/300?text=Coffee",
    description: "Hot brewed coffee",
    stock: 25,
    price: 2.99,
  },
  {
    id: 8,
    name: "Cake",
    image: "https://via.placeholder.com/300?text=Cake",
    description: "Delicious chocolate cake",
    stock: 3,
    price: 4.99,
  },
  {
    id: 9,
    name: "Ice Cream",
    image: "https://via.placeholder.com/300?text=Ice+Cream",
    description: "Cold and sweet ice cream",
    stock: 12,
    price: 3.49,
  },
  {
    id: 10,
    name: "Smoothie",
    image: "https://via.placeholder.com/300?text=Smoothie",
    description: "Fresh fruit smoothie",
    stock: 6,
    price: 5.49,
  },
];

const WaiterOrders = () => {
  return (
    <div className="p-4 max-w-[1000px] mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Menu Items</h1>

      <div className="mb-6 flex justify-start gap-4 items-center">
        <input
          type="text"
          placeholder="Search menu items..."
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-80 border rounded-lg shadow-md focus:outline-none "
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md">
          Search
        </button>
      </div>
      <CategorySelector />
      <div className="flex flex-row justify-center items-start">
        <div className="flex flex-row justify-center items-center flex-wrap gap-6 mb-6">
          {fakeMenuItems.map((item) => (
            <WaiterMenuItemCard key={item.id} item={item} />
          ))}
        </div>

        <WaiterOrderSummary />
      </div>
    </div>
  );
};

export default WaiterOrders;
