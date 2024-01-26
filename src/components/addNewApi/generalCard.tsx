"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FormLabel } from "../ui/form";
import { Input } from "../ui/input";

export default function AddNewApiForm() {
  return (
    <Card className="w-1/2">
      <CardHeader className="space-y-1">
        <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />

        <CardTitle className="text-2xl">Add New Api</CardTitle>
        <CardDescription>
          Creat your own api and share it with the world
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">Github</Button>
          <Button variant="outline">Google</Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter>
    </Card>
  );
}
