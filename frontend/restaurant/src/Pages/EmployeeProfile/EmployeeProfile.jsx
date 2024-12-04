import React from "react";
import ProfileDetails from "@/Design/Share/ProfileDetails";
import OrderList from "@/Design/User/OrderList";

const EmployeeProfile = () => {
  const employee = {
    name: "Jane Doe",
    position: "Manager",
    profileImage:
      "https://images.pexels.com/photos/3866555/pexels-photo-3866555.png?auto=compress&cs=tinysrgb&w=600",
  };

  const orders = [
    { id: 1, name: "Order #1234", status: "Completed", amount: "$25.00" },
    { id: 2, name: "Order #1235", status: "Pending", amount: "$15.00" },
    { id: 3, name: "Order #1236", status: "Cancelled", amount: "$10.00" },
  ];

  return (
    <div className="w-[100vw]  p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 ">
        <ProfileDetails employee={employee} />
        <OrderList orders={orders} />
      </div>
    </div>
  );
};

export default EmployeeProfile;
