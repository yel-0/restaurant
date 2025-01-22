import React from "react";
import UpdateCategoryDialog from "@/Design/Admin/UpdateCategoryDialog";
import DeleteCategoryConfirmationDialog from "@/Design/Admin/DeleteCategoryConfirmationDialog";
import useFetchCategories from "@/Hook/Category/useFetchCategories";
import CreateCategoryDialog from "@/Design/Admin/CreateCategoryDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming table components are reusable

const AdminCategory = () => {
  const { data: categories, isLoading, isError, error } = useFetchCategories();

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div>
      {/* Create Category Button */}
      <div className="mb-4">
        <CreateCategoryDialog />
      </div>

      {/* Categories Table */}
      <Table>
        <TableCaption>A list of all categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category._id}>
              <TableCell>
                {/* Capitalize the first letter of the category name */}
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center items-center space-x-3">
                  <UpdateCategoryDialog
                    category={category}
                  ></UpdateCategoryDialog>
                  <DeleteCategoryConfirmationDialog
                    category={category}
                  ></DeleteCategoryConfirmationDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCategory;
