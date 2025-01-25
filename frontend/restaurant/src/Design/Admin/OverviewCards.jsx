import React from "react";
import {
  CircleDollarSign,
  Clock12,
  ChefHat,
  Users,
  TrendingUp,
  TrendingDown, // TrendingDown icon for decrease
} from "lucide-react";

const OverviewCards = () => {
  const data = [
    {
      title: "Total Sales",
      value: "$2,500",
      description: "Compared to $2,300 yesterday",
      icon: <CircleDollarSign />,
      bg: "bg-gradient-to-r from-blue-500 to-blue-700",
      today: 2500,
      yesterday: 2300,
    },
    {
      title: "Pending Orders",
      value: "15",
      description: "5 more than yesterday",
      icon: <Clock12 />,
      bg: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      today: 15,
      yesterday: 10,
    },
    {
      title: "Top-Selling Item",
      value: "Pizza",
      description: "Sold 50 units today",
      icon: <ChefHat />,
      bg: "bg-gradient-to-r from-green-500 to-green-700",
      today: 50,
      yesterday: 60,
    },

    {
      title: "Total Staff",
      value: "12",
      description: "4 on leave today",
      icon: <Users />,
      bg: "bg-gradient-to-r from-purple-500 to-purple-700",
      today: 12,
      yesterday: 13,
    },
  ];

  return (
    <div className="flex flex-row justify-between items-center">
      {data.map((card, index) => {
        const isBetter = card.today > card.yesterday;
        const isWorse = card.today < card.yesterday;
        return (
          <div
            key={index}
            className="flex flex-col p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Icon Section */}
            <div className="flex flex-row p-3 w-[280px] gap-3">
              <div
                className={`w-[60px] flex flex-row justify-center items-center bg-black text-white p-4 rounded-xl`}
              >
                {card.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  {card.title}
                </h3>
                <p className="text-2xl font-semibold text-gray-800 mt-2">
                  {card.value}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex items-center border-t-2 border-gray-100">
              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
              {isBetter && (
                <div className="ml-2 text-green-500">
                  <TrendingUp size={16} />
                </div>
              )}
              {isWorse && (
                <div className="ml-2 text-red-500">
                  <TrendingDown size={16} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewCards;
