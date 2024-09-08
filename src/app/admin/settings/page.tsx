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
      <TabsList className="mb-4">
        <TabsTrigger value="earning">General Setting</TabsTrigger>
        <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
      </TabsList>

      {/* Earning Percentage Tab */}
      <TabsContent value="earning">
        <Card>
          <CardHeader>
            <CardTitle>Update Earning Percentage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="earning-percentage">Earning Percentage (%)</Label>
              {loading ? (
                <Skeleton />
              ) : (
                <Input
                  id="earning-percentage"
                  value={earningPercentage}
                  type="number"
                  className="w-32"
                  placeholder="Enter percentage"
                  onChange={(e) => setEarningPercentage(+e.target.value)}
                />
              )}
              <Button onClick={handleEarning}>Update</Button>
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
        <Card>
          <CardHeader>
            <CardTitle>Update Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="terms-conditions">Terms and Conditions</Label>
            {loading ? (
              <Skeleton />
            ) : (
              <Textarea
                id="terms-conditions"
                value={termsAndConditions}
                placeholder="Enter new terms"
                className="min-h-[100px]"
                onChange={(e) => setTermsAndConditions(e.target.value)}
              />
            )}
            <Button onClick={handleTermsAndConditions}>Update</Button>
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
        <Card>
          <CardHeader>
            <CardTitle>Update Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="privacy-policy">Privacy Policy</Label>
            {loading ? (
              <Skeleton />
            ) : (
              <Textarea
                id="privacy-policy"
                value={privacyAndPolicy}
                placeholder="Enter new privacy policy"
                className="min-h-[100px]"
                onChange={(e) => setPrivacyAndPolicy(e.target.value)}
              />
            )}
            <Button onClick={handlePrivacyAndPolicy}>Update</Button>
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

const Skeleton = () => {
  return (
    <div className="animate-pulse bg-gray-300 h-10 rounded-md w-full"></div>
  );
};
