import React from "react";
import UpdateCategoryDialog from "@/Design/Admin/UpdateCategoryDialog";
import DeleteCategoryConfirmationDialog from "@/Design/Admin/DeleteCategoryConfirmationDialog";
import useFetchCategories from "@/Hook/Category/useFetchCategories";
import CreateCategoryDialog from "@/Design/Admin/CreateCategoryDialog";

const AdminCategory = () => {
  const { data: categories, isLoading, isError, error } = useFetchCategories();

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <CreateCategoryDialog />
      {categories?.map((category) => (
        <div
          key={category._id}
          className="p-6 bg-white shadow-md rounded-lg border border-gray-200 flex flex-col items-start"
        >
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            {category.name}
          </h3>
          <div className="flex space-x-3 self-end mt-2">
            <UpdateCategoryDialog category={category}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
                Update
              </button>
            </UpdateCategoryDialog>
            <DeleteCategoryConfirmationDialog category={category}>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm">
                Delete
              </button>
            </DeleteCategoryConfirmationDialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCategory;
