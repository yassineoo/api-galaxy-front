"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/dashboard/header";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useApiByUserId, useFollowingApis } from "@/hooks/apis/api.queries";
import ReviewSkeleton from "@/components/HubXs/ReviewSkeleton";
import { useAuthSession } from "@/components/auth-provider";

export default function ProfilePage({ params }: any) {
  const { session, isAuthenticated } = useAuthSession();

  console.log("session", session);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");

  //console.log("session",session)
  const myApis = useApiByUserId(session?.userId as number);
  const myFollowingApis = useFollowingApis(session?.userId as number);

  useEffect(() => {
    setName(session?.user?.name || "");
  }, [session?.user?.name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSave = () => {
    // Logic to save the updated name (e.g., send it to the server)
    setIsEditing(false);
  };
  const idx = session?.userId;

  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState(session?.apiKey || "");

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      alert("API Key copied to clipboard!");
    });
  };

  return (
    <div className="">
      {isAuthenticated ? (
        <>
          <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full h-full overflow-scroll ">
            <div className="w-full max-w-4xl mx-auto mt-10">
              <div className="overflow-visible relative h-48 bg-gradient-to-r from-[#1877F2] to-[#2196F3] rounded-t-lg">
                <Image
                  src="/images/cover.jpeg"
                  alt="Cover image"
                  width="1024"
                  height="192"
                  className="object-cover w-full h-full"
                  style={{ aspectRatio: "1024/192", objectFit: "cover" }}
                />
                <div className="absolute bottom-0 left-0 flex items-center -mb-12 ml-6 z-30">
                  {session?.user?.image && (
                    <Avatar className="w-24 h-24 border-4 border-white">
                      <AvatarImage src={session.user.image} alt="User Avatar" />
                      <AvatarFallback>
                        {session?.user?.name?.charAt(0) || "User Avatar"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
              <div className="bg-background rounded-b-lg p-6 pt-20">
                <div className="flex items-center gap-6">
                  {isEditing ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="text-2xl font-bold border p-2 rounded"
                      />
                      <Button
                        className="py-2 px-8"
                        size="icon"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        className="py-2 px-8"
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold">{name}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                      >
                        <FilePenIcon className="w-5 h-5" />
                        <span className="sr-only">Edit profile</span>
                      </Button>
                    </div>
                  )}
                </div>

                {/* New API Key section */}
                <div className="mt-4 p-4 border rounded-md">
                  <h3 className="text-lg font-semibold mb-2">API Key</h3>
                  <div className="flex items-center gap-2">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      readOnly
                      className="flex-grow p-2 border rounded"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleApiKeyVisibility}
                    >
                      {showApiKey ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={copyApiKey}>
                      <CopyIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="published" className="mt-4">
                  <TabsList>
                    <TabsTrigger value="published">Published APIs</TabsTrigger>
                    <TabsTrigger value="following">API Following</TabsTrigger>
                  </TabsList>
                  <TabsContent value="published" className="mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                      {myApis.isLoading ? (
                        <ReviewSkeleton />
                      ) : myApis.isSuccess && myApis.data.length ? (
                        myApis.data.map((api: any, index: number) => (
                          <Card key={index}>
                            <CardContent className="flex flex-col gap-2">
                              <div className="text-lg font-semibold">
                                {api.name}
                              </div>
                              <div className="text-muted-foreground">
                                {api.description}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <CodeIcon className="w-4 h-4" />
                                <span>123 calls</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <p>no published api</p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="following">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                      {myFollowingApis.isLoading ? (
                        <ReviewSkeleton />
                      ) : myFollowingApis.isSuccess &&
                        myFollowingApis.data.length ? (
                        myFollowingApis.data.map((api: any, index: number) => (
                          <Card key={index}>
                            <CardContent className="flex flex-col gap-2">
                              <div className="text-lg font-semibold">
                                {api.api.name}
                              </div>
                              <div className="text-muted-foreground">
                                {api.api.description}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <CodeIcon className="w-4 h-4" />
                                <span>123 calls</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <p>no published api</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* add two factors button */}
                <ProfileTwoFactor
                  isVerified={session?.twoFactorEnabled || false}
                  userId={idx || 0}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-screen text-2xl  ">
          Not Authorized
        </div>
      )}
    </div>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function FilePenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

import Image from "next/image";
import { activeTwoFactorAuthentification } from "@/actions/auth";
import { Shield, Loader2, CopyIcon, EyeIcon, EyeOffIcon } from "lucide-react";

function ProfileTwoFactor({
  userId,
  isVerified,
}: {
  userId: number;
  isVerified: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleActivate2FA = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with a delay
      await activeTwoFactorAuthentification(userId);
      // You might want to update some state or context to reflect that 2FA is now active
    } catch (error) {
      console.error("Failed to activate 2FA:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Security</h2>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account
          </p>
        </div>
        <Button
          onClick={handleActivate2FA}
          variant="outline"
          className="ml-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Activating...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              {isVerified ? "Disable 2FA" : "Activate 2FA"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
