import React from "react";
import FoodCard from "@/Design/User/FoodCard";
import { OrderSideBar } from "@/Design/User/OrderSideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Home = () => {
  const foodItems = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with real images
      name: "Delicious Pizza",
      price: 9.99,
      isAvailable: true,
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Cheesy Burger",
      price: 7.49,
      isAvailable: false,
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Spicy Tacos",
      price: 5.99,
      isAvailable: true,
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Fresh Salad",
      price: 4.99,
      isAvailable: true,
    },
  ];
  return (
    <div className="flex flex-row bg-[#f3f4f6] justify-between items-start">
      <div className="flex flex-row justify-center items-center flex-wrap gap-6 p-6 bg-gray-100">
        {foodItems.map((item) => (
          <FoodCard
            key={item.id} // Use a unique key for React rendering
            image={item.image}
            name={item.name}
            price={item.price}
            isAvailable={item.isAvailable}
            onAddToCart={() => console.log(`${item.name} added to cart!`)}
          />
        ))}
      </div>
      <OrderSideBar />
    </div>
  );
};

export default Home;
