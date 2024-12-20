import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useFetchOrders from "@/Hook/Order/useFetchOrders";

export default function WaiterOrderList() {
  const [orders, setOrders] = useState([]);

  const { data, isLoading, isError } = useFetchOrders();
  if (isLoading) {
    return <div> is loading</div>;
  }

  const statusColors = {
    pending: "yellow",
    InProgress: "blue",
    Served: "green",
    Canceled: "red",
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Waiter Order List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Total ($)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.table.tableNumber}</TableCell>
              <TableCell>{order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`bg-${statusColors[order.status]}-200 text-center`}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Link to={`/waiter/order/detail`}>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
