import axiosInstance from "./axiosInstance";

export const createMenuItem = async (menuItemData) => {
  try {
    const response = await axiosInstance.post("/api/menu-items", menuItemData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getMenuItems = async ({
  category,
  name,
  limit = 10,
  page = 1,
}) => {
  try {
    const response = await axiosInstance.get("/api/menu-items", {
      params: { category, name, limit, page },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteMenuItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/menu-items/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Fetch a single menu item by ID
export const getMenuItemById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/menu-items/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
