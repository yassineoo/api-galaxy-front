"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useInactiveAPI } from "@/hooks/apis/api.queries";
import {
  getSettings,
  updateEarning_pourcentage,
  updatePrivacyAndPolicy,
  updateTermsAndConditions,
  publishAnAPI,
} from "@/actions/admin";
import { useAuthSession } from "@/components/auth-provider";
// import { useSession } from "next-auth/react";

export default function Settings() {
  const InactiveAPIS = useInactiveAPI();
  const queryClient = useQueryClient();
  const [earningPercentage, setEarningPercentage] = useState(0);
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [privacyAndPolicy, setPrivacyAndPolicy] = useState("");
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [success3, setSuccess3] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const [success4, setSuccess4] = useState(false);
  // const { data: session } = useSession();
  const { session } = useAuthSession();
  // handle earning update
  const handleEarning = async () => {
    try {
      await updateEarning_pourcentage(
        earningPercentage,
        session?.userId as number,
        session?.token as string
      );
      setSuccess1(true);
      setTimeout(() => setSuccess1(false), 2000);
    } catch (e) {}
  };

  // handle terms and conditions update
  const handleTermsAndConditions = async () => {
    try {
      await updateTermsAndConditions(
        termsAndConditions,
        session?.userId as number,
        session?.token as string
      );
      setSuccess2(true);
      setTimeout(() => setSuccess2(false), 2000);
    } catch (e) {}
  };

  // handle privacy and policy update
  const handlePrivacyAndPolicy = async () => {
    try {
      await updatePrivacyAndPolicy(
        privacyAndPolicy,
        session?.userId as number,
        session?.token as string
      );
      setSuccess3(true);
      setTimeout(() => setSuccess3(false), 2000);
    } catch (e) {}
  };

  const publishanAPI = async () => {
    try {
      if (!selected) return;
      await publishAnAPI(+selected);
      // revalidate userInactiveAPI to get new inactive list
      queryClient.refetchQueries({ queryKey: ["inactiveAPI"] });
      setSuccess4(true);
      setTimeout(() => setSuccess4(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getSettings()
      .then((data) => {
        setEarningPercentage(data.earning_percentage);
        setTermsAndConditions(data.termsAndConditions);
        setPrivacyAndPolicy(data.privacyAndPolicy);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <Tabs defaultValue="settings">
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Admin Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="earning-percentage">
                Update Earning Percentage
              </Label>
              <div className="flex gap-2 items-center">
                {loading ? (
                  <Skeleton />
                ) : (
                  <Input
                    id="earning-percentage"
                    value={earningPercentage}
                    type="number"
                    className="outline-none"
                    placeholder="Enter new percentage %"
                    onChange={(e) => setEarningPercentage(+e.target.value)}
                  />
                )}

                <Button onClick={handleEarning} className="">
                  update
                </Button>
                {success1 && (
                  <span className="block text-green-500 font-semibold">
                    Earning percentage will be updated soon
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="terms-conditions">
                Update Terms and Conditions
              </Label>
              {loading ? (
                <Skeleton />
              ) : (
                <Textarea
                  id="terms-conditions"
                  placeholder="Enter new terms and conditions"
                  className="min-h-[100px] outline-none"
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                />
              )}

              <Button onClick={handleTermsAndConditions}>update</Button>
              {success2 && (
                <span className="block text-green-500 font-semibold">
                  terms and conditions are updated successufully
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="privacy-policy">Update Privacy Policy</Label>
              {loading ? (
                <Skeleton />
              ) : (
                <Textarea
                  id="terms-conditions"
                  placeholder="Enter new terms and conditions"
                  className="min-h-[100px] outline-none"
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                />
              )}

              <Button onClick={handlePrivacyAndPolicy}>update</Button>
              {success3 && (
                <span className="block text-green-500 font-semibold">
                  privacy and policy rules are updated successufully
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-approval">API Approval Notification</Label>
              <Select onValueChange={(e) => setSelected(e)}>
                <SelectTrigger id="api-approval">
                  <SelectValue placeholder="Select API" />
                </SelectTrigger>
                <SelectContent>
                  {InactiveAPIS.isSuccess
                    ? InactiveAPIS.data.map((api: any) => (
                        <SelectItem key={api.id} value={api.id}>
                          {api.name}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
              {success4 && (
                <span className="block text-green-500 font-semibold">
                  your api has been successufully published{" "}
                </span>
              )}
              <Button onClick={publishanAPI}>publish</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

const Skeleton = () => {
  return <div className={"animate-pulse bg-gray-300 rounded"}></div>;
};
