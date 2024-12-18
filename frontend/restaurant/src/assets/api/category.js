import axiosInstance from "./axiosInstance";
// Function to create a new category
export const createCategory = async (categoryData) => {
  const response = await axiosInstance.post("/category/create", categoryData);
  return response.data;
};

// Function to delete a category
export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/category/delete/${id}`);
  return response.data;
};

// Function to fetch all categories
export const fetchCategories = async () => {
  const response = await axiosInstance.get("/category/categories");
  return response.data;
};

// Function to update a category
export const updateCategory = async ({ id, name }) => {
  const response = await axiosInstance.put(`/category/update/${id}`, { name });
  return response.data;
};
