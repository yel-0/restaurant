import axiosInstance from "./axiosInstance";
// Function to log in a user
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/user/login", credentials);
  return response.data;
};

// Function to register a new user
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/user/register", userData);
  return response.data;
};

// Function to update a user
export const updateUser = async ({ id, userData }) => {
  const response = await axiosInstance.put(`/user/update/${id}`, userData);
  return response.data;
};

// Function to delete a user
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/user/delete/${id}`);
  return response.data;
};

// Function to fetch users with filters and pagination
export const fetchUsers = async ({ queryKey }) => {
  const [_key, { name, role, status, page, limit }] = queryKey;

  const response = await axiosInstance.get("/user/users", {
    params: { name, role, status, page, limit },
  });
  return response.data;
};
