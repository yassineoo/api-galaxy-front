"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Header from "@/components/dashboard/header";

export default function ProfilePage({ params }: any) {
  const { data: session, status } = useSession();
  const { idx } = params;

  const isAuthenticated = idx == session?.userId;
  return (
    <div className="">
      {isAuthenticated ? (
        <>
          <div className="bg-dashboardBg dark:bg-transparent flex flex-col w-full h-full overflow-scroll ">
            <Header />

            <div className="w-full max-w-4xl mx-auto mt-10">
              <div className="overflow-visible relative h-48 bg-gradient-to-r from-[#1877F2] to-[#2196F3] rounded-t-lg">
                <img
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
                        {session.user.name || "User Avatar"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
              <div className="bg-background rounded-b-lg p-6 pt-20">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {" "}
                    {session?.user?.name}
                  </div>
                  <Button variant="ghost" size="icon">
                    <FilePenIcon className="w-5 h-5" />
                    <span className="sr-only">Edit profile</span>
                  </Button>
                </div>
                <Tabs defaultValue="published" className="mt-4">
                  <TabsList>
                    <TabsTrigger value="published">Published APIs</TabsTrigger>
                    <TabsTrigger value="following">API Following</TabsTrigger>
                  </TabsList>
                  <TabsContent value="published" className="mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                      <Card>
                        <CardContent className="flex flex-col gap-2">
                          <div className="text-lg font-semibold">API 1</div>
                          <div className="text-muted-foreground">
                            Description of API 1
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CodeIcon className="w-4 h-4" />
                            <span>123 calls</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="flex flex-col gap-2">
                          <div className="text-lg font-semibold">API 2</div>
                          <div className="text-muted-foreground">
                            Description of API 2
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CodeIcon className="w-4 h-4" />
                            <span>456 calls</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="flex flex-col gap-2">
                          <div className="text-lg font-semibold">API 3</div>
                          <div className="text-muted-foreground">
                            Description of API 3
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CodeIcon className="w-4 h-4" />
                            <span>789 calls</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="flex flex-col gap-2">
                          <div className="text-lg font-semibold">API 4</div>
                          <div className="text-muted-foreground">
                            Description of API 4
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CodeIcon className="w-4 h-4" />
                            <span>321 calls</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="following">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                      <Card>
                        <CardContent className="flex flex-col gap-2">
                          <div className="text-lg font-semibold">API 5</div>
                          <div className="text-muted-foreground">
                            Description of API 5
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CodeIcon className="w-4 h-4" />
                            <span>654 calls</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="flex flex-col gap-2">
                          <div className="text-lg font-semibold">API 6</div>
                          <div className="text-muted-foreground">
                            Description of API 6
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CodeIcon className="w-4 h-4" />
                            <span>987 calls</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="flex flex-col gap-2">
                          <div className="text-lg font-semibold">API 7</div>
                          <div className="text-muted-foreground">
                            Description of API 7
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CodeIcon className="w-4 h-4" />
                            <span>159 calls</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="flex flex-col gap-2">
                          <div className="text-lg font-semibold">API 8</div>
                          <div className="text-muted-foreground">
                            Description of API 8
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CodeIcon className="w-4 h-4" />
                            <span>753 calls</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
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
