// routes/CategoryRoute.js
const express = require("express");
const router = express.Router();
const categoryController = require("../Controller/CategoryController");

// Routes
router.post("/create", categoryController.createCategory);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);
router.get("/categories", categoryController.getAllCategories);

module.exports = router;
