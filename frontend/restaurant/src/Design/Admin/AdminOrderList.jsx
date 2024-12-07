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

// Fake data with 10 entries
const orders = [
  {
    id: "ORD001",
    customer: "John Doe",
    items: 3,
    total: 150.75,
    status: "Pending",
    date: "2024-12-01",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    items: 5,
    total: 275.5,
    status: "Shipped",
    date: "2024-12-02",
  },
  {
    id: "ORD003",
    customer: "Michael Brown",
    items: 2,
    total: 89.99,
    status: "Delivered",
    date: "2024-12-03",
  },
  {
    id: "ORD004",
    customer: "Emily White",
    items: 1,
    total: 45.0,
    status: "Canceled",
    date: "2024-12-04",
  },
  {
    id: "ORD005",
    customer: "Chris Evans",
    items: 4,
    total: 120.99,
    status: "Pending",
    date: "2024-12-05",
  },
  {
    id: "ORD006",
    customer: "Emma Watson",
    items: 6,
    total: 300.75,
    status: "Delivered",
    date: "2024-12-06",
  },
  {
    id: "ORD007",
    customer: "Daniel Radcliffe",
    items: 7,
    total: 500.5,
    status: "Shipped",
    date: "2024-12-07",
  },
  {
    id: "ORD008",
    customer: "Scarlett Johansson",
    items: 8,
    total: 800.25,
    status: "Pending",
    date: "2024-12-08",
  },
  {
    id: "ORD009",
    customer: "Tom Holland",
    items: 2,
    total: 200.0,
    status: "Canceled",
    date: "2024-12-09",
  },
  {
    id: "ORD010",
    customer: "Zendaya",
    items: 3,
    total: 250.0,
    status: "Delivered",
    date: "2024-12-10",
  },
];

const statusColors = {
  Pending: "yellow",
  Shipped: "blue",
  Delivered: "green",
  Canceled: "red",
};

export function AdminOrderList() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Order List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total ($)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`bg-${
                    statusColors[order.status]
                  }-200 w-[80px] text-center`}
                >
                  <div className=" w-full">{order.status}</div>
                </Badge>
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  View
                </Button>
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
