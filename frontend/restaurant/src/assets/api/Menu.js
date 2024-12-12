import axios from "axios";

export const createMenuItem = async (menuItemData) => {
  //   console.log(menuItemData);

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
