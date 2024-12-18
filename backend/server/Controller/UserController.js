const User = require("../models/User");

// Controller function to update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    // If user does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    // Save the updated user
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

// Controller function to delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);

    // If user does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

// Controller function to fetch users with filters and pagination
const fetchUsers = async (req, res) => {
  const { name, role, page = 1, limit = 10 } = req.query;

  // Build the query object based on filters
  const query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (role) {
    query.role = role;
  }

  try {
    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Fetch users with filters, limit, and skip
    const users = await User.find(query).skip(skip).limit(Number(limit));

    // Fetch total count of users for pagination
    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

module.exports = { updateUser, deleteUser, fetchUsers };
