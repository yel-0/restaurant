import React from "react";
import { useOrderCart } from "@/context/OrderCartContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const WaiterMenuItemCard = ({ item }) => {
  const { addToCart } = useOrderCart();
  const { toast } = useToast();

  const handleAddToOrder = () => {
    addToCart(item);
    toast({
      title: "Item added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="w-70 shadow-lg border rounded-lg">
      <CardHeader className="p-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded-md"
        />
      </CardHeader>
      <CardContent className="mt-2">
        <CardTitle className="text-lg ">{item.name}</CardTitle>
        <p className="text-sm text-gray-600 mb-2 h-[100px] overflow-y-scroll">
          {item.description}
        </p>
        <span className="text-lg font-bold">${item.price}</span>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleAddToOrder}>Add to Order</Button>
      </CardFooter>
    </Card>
  );
};

export default WaiterMenuItemCard;
