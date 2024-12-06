import React from "react";

const OverviewCards = () => {
  const data = [
    {
      title: "Total Sales Today",
      value: "$2,500",
      description: "Compared to $2,300 yesterday",
      icon: "💰",
      bg: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    {
      title: "Pending Orders",
      value: "15",
      description: "5 more than yesterday",
      icon: "🕒",
      bg: "bg-gradient-to-r from-yellow-500 to-yellow-700",
    },
    {
      title: "Top-Selling Item",
      value: " Pizza",
      description: "Sold 50 units today",
      icon: "🍕",
      bg: "bg-gradient-to-r from-green-500 to-green-700",
    },
    {
      title: "Low Stock Alerts",
      value: "3 Items",
      description: "Needs restocking",
      icon: "⚠️",
      bg: "bg-gradient-to-r from-red-500 to-red-700",
    },
    {
      title: "Total Staff",
      value: "12",
      description: "4 on leave today",
      icon: "👥",
      bg: "bg-gradient-to-r from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-6">
      {data.map((card, index) => (
        <div
          key={index}
          className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Icon Section */}
          <div
            className={`flex items-center justify-center ${card.bg} rounded-t-xl h-20 text-3xl text-white`}
          >
            {card.icon}
          </div>

          {/* Content Section */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              {card.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
