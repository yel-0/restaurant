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

export default function WaiterOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static data for orders
  useEffect(() => {
    const fetchOrders = () => {
      const staticOrders = [
        {
          id: "1234",
          table: 5,
          total: 45.5,
          status: "Pending",
        },
        {
          id: "5678",
          table: 3,
          total: 32.2,
          status: "InProgress",
        },
        {
          id: "91011",
          table: 8,
          total: 50.0,
          status: "Served",
        },
        {
          id: "1213",
          table: 2,
          total: 40.7,
          status: "Canceled",
        },
      ];
      setOrders(staticOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const statusColors = {
    Pending: "yellow",
    InProgress: "blue",
    Served: "green",
    Canceled: "red",
  };

  if (loading) return <div>Loading...</div>;

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
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.table}</TableCell>
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
