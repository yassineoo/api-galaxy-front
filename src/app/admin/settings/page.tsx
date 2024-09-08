"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { QuillNoSSRWrapper } from "@/components/addNewApi/docs/docsTab";
import { formats, modules } from "@/utils/reactQuill";
import { RingLoader } from "react-spinners";

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
  const { session } = useAuthSession();

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
      queryClient.refetchQueries({ queryKey: ["inactiveAPI"] });
      setSuccess4(true);
      setTimeout(() => setSuccess4(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tabs defaultValue="earning">
      {/* Tabs List */}
      <TabsList className="mb-6 flex justify-center space-x-6">
        <TabsTrigger value="earning" className="px-4 py-2 text-lg font-medium">
          General Setting
        </TabsTrigger>
        <TabsTrigger value="terms" className="px-4 py-2 text-lg font-medium">
          Terms & Conditions
        </TabsTrigger>
        <TabsTrigger value="privacy" className="px-4 py-2 text-lg font-medium">
          Privacy Policy
        </TabsTrigger>
      </TabsList>

      {/* Earning Percentage Tab */}
      <TabsContent value="earning">
        <Card className="shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Update Earning Percentage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="earning-percentage" className="text-lg">
                Earning Percentage (%)
              </Label>
              {loading ? (
                <div className="flex justify-center items-center w-full">
                  <RingLoader size="78" speedMultiplier={0.5} color="blue" />
                </div>
              ) : (
                <Input
                  id="earning-percentage"
                  value={earningPercentage}
                  type="number"
                  className="w-40"
                  placeholder="Enter percentage"
                  onChange={(e) => setEarningPercentage(+e.target.value)}
                />
              )}
              <Button onClick={handleEarning} className="ml-4">
                Update
              </Button>
            </div>
            {success1 && (
              <span className="text-green-500 font-semibold">
                Earning percentage updated successfully!
              </span>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Terms and Conditions Tab */}
      <TabsContent value="terms">
        <Card className="shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Update Terms and Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="terms-conditions" className="text-lg">
              Terms and Conditions
            </Label>
            {loading ? (
              <div className="flex justify-center items-center w-full">
                <RingLoader size="78" speedMultiplier={0.5} color="blue" />
              </div>
            ) : (
              <div className="py-6">
                <QuillNoSSRWrapper
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  value={termsAndConditions}
                  onChange={setTermsAndConditions}
                />
              </div>
            )}
            <Button onClick={handleTermsAndConditions} className="mt-4">
              Update
            </Button>
            {success2 && (
              <span className="text-green-500 font-semibold">
                Terms and conditions updated successfully!
              </span>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Privacy Policy Tab */}
      <TabsContent value="privacy">
        <Card className="shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Update Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="privacy-policy" className="text-lg">
              Privacy Policy
            </Label>
            {loading ? (
              <div className="flex justify-center items-center w-full">
                <RingLoader size="78" speedMultiplier={0.5} color="blue" />
              </div>
            ) : (
              <div className="py-6">
                <QuillNoSSRWrapper
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  value={privacyAndPolicy}
                  onChange={setPrivacyAndPolicy}
                />
              </div>
            )}
            <Button onClick={handlePrivacyAndPolicy} className="mt-4">
              Update
            </Button>
            {success3 && (
              <span className="text-green-500 font-semibold">
                Privacy policy updated successfully!
              </span>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
