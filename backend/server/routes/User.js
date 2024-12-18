const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  updateUser,
  deleteUser,
  fetchUsers,
} = require("../Controller/UserController");

const secretKey = process.env.SECRET_KEY; // Secret key for JWT
// const { verifyToken } = require("../middware/Auth");
// const UserController = require("../Controller/UserController");

// Update user route
router.put("/update/:id", updateUser);

// Delete user route
router.delete("/delete/:id", deleteUser);
router.get("/users", fetchUsers);

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create and return a JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      secretKey,
      {
        expiresIn: "3h",
      }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
