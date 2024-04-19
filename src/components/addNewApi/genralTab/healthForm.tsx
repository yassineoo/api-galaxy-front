import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useApiEndpointsList } from "@/hooks/Endpoints/Endpoints.queries";
import { useHelthSendRequest } from "@/hooks/apis/api.Mutation";
import { Switch } from "@/components/ui/switch";

export default function HealthForm({
  alertEnabled,
  setAlertEnabled,
  apiID,
  EmailNotifcation,
  setEmailNotifcation,
  HealthCheckEndpointId: selectedEndpoint,
  setHealthCheckEndpointId: setSelectedEndpoint,
}: any) {
  const EndpointsList = useApiEndpointsList(apiID);

  //const [selectedEndpoint, setSelectedEndpoint] = useState(18);
  const [statusReq, setStatusReq] = useState("Not Checked");

  const {
    mutateAsync: HelthSendRequest,

    isSuccess,
    isError,
    error,
  } = useHelthSendRequest();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Call the API to check the health of the endpoint

    console.log("selectedEndpoint", selectedEndpoint);

    try {
      const res: any = await HelthSendRequest({
        EndpointID: selectedEndpoint,
        ApiID: apiID,
        // email: e.target.email.value,
      });
      const data = res.data;
      if (data.message >= 200 && data.message <= 299) {
        setStatusReq("Success");
      } else {
        setStatusReq("Failed");
      }
    } catch (error) {
      console.log(error);
      setStatusReq("Failed");
    }

    //setStatus("Success");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">API Health Check</CardTitle>
        <CardDescription>
          Test your API endpoints and receive email alerts if any issues are
          detected.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="endpoint">API Endpoint</Label>

            {EndpointsList.isLoading && <p>Loading...</p>}
            {EndpointsList.isSuccess && (
              <Select
                onValueChange={(value) => {
                  setSelectedEndpoint(Number(value));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an endpoint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {EndpointsList.data.map((endpoint: any) => (
                      <SelectItem
                        value={endpoint.ID.toString()}
                        key={endpoint.ID}
                      >
                        {endpoint.Name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Health Check Status</Label>
            {statusReq == "Not Checked" ? (
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-gray-500" />
                <span className="text-gray-500 font-medium">Not Checked</span>
              </div>
            ) : statusReq == "Success" ? (
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-green-500 font-medium">Success</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-red-500 font-medium">Failed</span>
              </div>
            )}
          </div>

          <div className="flex justify-start items-center gap-8">
            <Label htmlFor="email">Email Notification</Label>
            <Switch
              checked={alertEnabled}
              onCheckedChange={() => setAlertEnabled(!alertEnabled)}
            />
          </div>

          {alertEnabled && (
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email address"
                type="email"
                value={EmailNotifcation}
                onChange={(e) => setEmailNotifcation(e.target.value)}
              />
            </div>
          )}
          <Button type="submit">Run Health Check</Button>
        </form>
      </CardContent>
    </Card>
  );
}
