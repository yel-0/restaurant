import React from "react";

const FoodCard = ({ image, name, price, isAvailable, onAddToCart }) => (
  <div className="border rounded-lg shadow-lg bg-white max-w-sm overflow-hidden">
    {/* Image */}
    <div className="relative">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      {!isAvailable && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <p className="text-white font-bold text-lg">Sold Out</p>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-4">
      {/* Name and Price */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-lg font-semibold text-gray-600">
          ${price.toFixed(2)}
        </p>
      </div>

      {/* Availability Indicator */}
      <div className="mt-2 flex items-center">
        <span
          className={`w-3 h-3 rounded-full mr-2 ${
            isAvailable ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <p
          className={`text-sm font-medium ${
            isAvailable ? "text-green-500" : "text-red-500"
          }`}
        >
          {isAvailable ? "In Stock" : "Not Available"}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        disabled={!isAvailable}
        className={`mt-4 w-full py-2 px-4 font-semibold rounded ${
          isAvailable
            ? "bg-black text-white"
            : "bg-white text-gray-500 border border-gray-300 cursor-not-allowed"
        }`}
      >
        {isAvailable ? "Add to Cart" : "Unavailable"}
      </button>
    </div>
  </div>
);

export default FoodCard;
