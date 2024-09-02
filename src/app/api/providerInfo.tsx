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
import { useProviderInfo } from "@/hooks/apis/api.queries";
import { RingLoader } from "react-spinners";

export default function ProviderInfo({
  providerId,
  category,
}: {
  providerId: string;
  category: string;
}) {
  const { data, error, isLoading } = useProviderInfo(providerId);

  if (isLoading) {
    <div className="w-full h-full flex justify-center items-center">
      <RingLoader size="78" speedMultiplier={0.5} color="blue" />
    </div>;
  }

  if (error) {
    return <div className="text-red-500">Error fetching provider info</div>;
  }

  return (
    <Card className="w-full max-w-sm border-0 shadow">
      <CardHeader className="bg-primary text-primary-foreground px-6 py-4">
        <h3 className="text-2xl font-bold">Provider Info</h3>
        <div className="text-sm text-muted-foreground">API creator</div>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={data?.avatarUrl || "/placeholder-user.jpg"}
              alt={data?.name}
            />
            <AvatarFallback>{data?.initials || "N/A"}</AvatarFallback>
          </Avatar>
          <div>by {data?.name}</div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>Subscribers</div>
          <div className="font-medium">{data?.subscribers}</div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>Category</div>
          <div className="font-medium">{category}</div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 flex gap-2">
        <Button variant="outline">Contact Provider</Button>
        <Button>Get Notifications</Button>
      </CardFooter>
    </Card>
  );
}
