import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton loader
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming Shadcn UI components

const TableLoading = () => {
  return (
    <Table>
      <TableCaption>A list of all tables in the restaurant.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="w-[100px] h-[20px] rounded" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-[50px] h-[20px] rounded" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-[100px] h-[20px] rounded" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-[80px] h-[20px] rounded" />
          </TableHead>
          <TableHead className="text-center">
            <Skeleton className="w-[120px] h-[20px] rounded" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(5)
          .fill("")
          .map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[50px] h-[20px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[80px] h-[20px] rounded" />
              </TableCell>
              <TableCell className="text-center gap-3 flex justify-center items-center">
                <Skeleton className="w-[120px] h-[20px] rounded" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TableLoading;
