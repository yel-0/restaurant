import React from "react";

const ProfileDetails = ({ employee }) => {
  return (
    <div className="flex items-center gap-6 mb-8">
      <img
        src={employee.profileImage}
        alt={employee.name}
        className="w-24 h-24 rounded-full object-cover shadow-md"
      />
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{employee.name}</h2>
        <p className="text-gray-600">{employee.position}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
