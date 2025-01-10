// components/StatusBadge.jsx
import React from "react";

const StatusBadge = ({ status }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "in-progress":
        return "bg-blue-200 text-blue-800";
      case "completed":
        return "bg-green-200 text-green-800";
      default:
        return "bg-red-200 text-red-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClasses(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
