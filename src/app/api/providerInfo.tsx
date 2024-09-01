/**
 * v0 by Vercel.
 * @see https://v0.dev/t/M3h4ZDFXceo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useAuthSession } from "@/components/auth-provider";

export default function () {
  // const { data: session, status } = useSession();
  // const {session} = useAuthSession()
  return (
    <Card className="w-full max-w-sm border-0 shadow">
      <CardHeader className="bg-primary text-primary-foreground px-6 py-4">
        <h3 className="text-2xl font-bold">Provider Info</h3>
        <div className="text-sm text-muted-foreground">API creator</div>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="Google Cloud" />
            <AvatarFallback>GC</AvatarFallback>
          </Avatar>
          <div>by Google Cloud</div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>Subscribers</div>
          <div className="font-medium">52,934</div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>Category</div>
          <div className="font-medium">Chatbot</div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 flex gap-2">
        <Button variant="outline">Contact Provider</Button>
        <Button>Get Notifications</Button>
      </CardFooter>
    </Card>
  );
}
