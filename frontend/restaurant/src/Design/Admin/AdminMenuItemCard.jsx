import React from "react";
import { Link } from "react-router-dom";
import { DeleteMenuItemDialog } from "./DeleteMenuItemDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const AdminMenuItemCard = ({ item }) => {
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
        <Link to={`/admin/menu/update/${item._id}`}>
          <Button className="bg-white shadow-none flex flex-row justify-center items-center border-black border text-black hover:text-gray-700">
            Edit <Pencil />
          </Button>
        </Link>
        <DeleteMenuItemDialog item={item} />
      </CardFooter>
    </Card>
  );
};

export default AdminMenuItemCard;
