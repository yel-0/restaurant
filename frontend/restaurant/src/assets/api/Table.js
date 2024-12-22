import axiosInstance from "./axiosInstance";

// Function to create a new table
export const createTable = async (tableData) => {
  const response = await axiosInstance.post("/tables/create", tableData);
  return response.data;
};

// Function to delete a table
export const deleteTable = async (tableId) => {
  const response = await axiosInstance.delete(`/tables/delete/${tableId}`);
  return response.data;
};

export const fetchTables = async (page = 1, limit = 10, search = "") => {
  const response = await axiosInstance.get(
    `/tables?page=${page}&limit=${limit}&search=${search}`
  );
  return response.data;
};

// Function to update a table
export const updateTable = async ({ tableId, updatedData }) => {
  const response = await axiosInstance.put(`/tables/${tableId}`, updatedData);
  return response.data;
};
