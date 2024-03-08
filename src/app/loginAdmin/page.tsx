import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "react-toastify";

const Logo = ({ toggleMenu, isMenuOpen }: any) => {
  return (
    <div
      className={`flex items-center w-32 gap-4 justify-between mt-4 px-4 ${"transform"}`}
    >
      <img className="w-16" src="/logos/logo.svg" />
      <h2 className="flex justify-center items-center font-bold text-white text-lg">
        Api <br /> Galaxy
      </h2>
    </div>
  );
};

export default function Page() {
  return (
    <div className="h-[100vh] w-full flex flex-col justify-start gap-8 items-center  bg-transparent">
      <img
        src="/images/loginAdmin.jpg"
        className="absolute w-full h-full  -z-10 bg-cover object-cover"
      />
      <Logo />

      <Card className="px-12">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your email below to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
