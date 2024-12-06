"use client";

import { UserCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MotivationalCard() {
  return (
    <Card className="max-w-xs mx-auto shadow-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-bold">Admin Motivation</CardTitle>
        <CardDescription className="text-sm opacity-80">
          Keep going, your efforts are shaping success!
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center p-6">
        <div className="flex justify-center items-center">
          <UserCheck className="text-white h-12 w-12 mb-4" />
        </div>
        <h3 className="text-xl font-semibold">You're Doing Great!</h3>
        <p className="mt-2 text-lg">
          Your hard work and leadership are driving this team forward. Keep it
          up!
        </p>
      </CardContent>
      <CardFooter className="text-center py-3">
        <div className="text-lg font-semibold text-white">
          Let's make today amazing!
        </div>
      </CardFooter>
    </Card>
  );
}
