import axios from "axios";

export const createMenuItem = async (menuItemData) => {
  try {
    const response = await axios.post(
      "http://localhost:3005/api/menu-items",
      menuItemData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
    const response = await axios.get("http://localhost:3005/api/menu-items", {
      params: { category, name, limit, page },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteMenuItem = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3005/api/menu-items/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
