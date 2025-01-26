import { Button } from "@/components/ui/button";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WaiterMenuItemForOrderAdd = ({ item, onAdd }) => {
  const handleAddClick = () => {
    if (onAdd) {
      onAdd(item); // Pass the item to the onAdd function
    }
  };

  return (
    <Card className="w-72 shadow-lg rounded-xl overflow-hidden  bg-white">
      <CardHeader className="relative p-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold text-gray-800">
          {item.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 mt-1 h-[100px]  overflow-y-scroll">
          {item.description}
        </CardDescription>
        <div className="mt-3 text-lg font-bold text-black">${item.price}</div>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-4 pb-4">
        <Button
          onClick={handleAddClick}
          className="w-full mt-4 bg-black text-white "
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WaiterMenuItemForOrderAdd;
