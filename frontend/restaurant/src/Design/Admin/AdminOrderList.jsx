"use client";

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

// Fake data with 10 entries

const statusColors = {
  Pending: "yellow",
  Shipped: "blue",
  Delivered: "green",
  Canceled: "red",
};

export function AdminOrderList() {
  const { data, isLoading, isError } = useFetchOrders();

  if (isLoading) {
    return <div> is loading</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Order List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Table</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total ($)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell>Table {order.table.tableNumber}</TableCell>{" "}
              {/* Table number column */}
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>{order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`bg-${
                    statusColors[order.status]
                  }-200 w-[80px] text-center`}
                >
                  <div className="w-full">{order.status}</div>
                </Badge>
              </TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>
                <Link to={`/admin/order/detail/${order._id}`}>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination UI */}
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" className="bg-primary text-white">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
}
