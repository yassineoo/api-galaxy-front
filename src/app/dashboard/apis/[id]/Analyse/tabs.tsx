/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Coep6yR804m
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";

export default function Component() {
  return (
    <Tabs className="max-w-md" defaultValue="calls">
      <TabsList className="flex space-x-2">
        <TabsTrigger className="flex flex-col" value="calls">
          <div className="text-lg font-bold">Calls</div>
          <div className="text-sm text-gray-500">1,234</div>
        </TabsTrigger>
        <TabsTrigger className="flex flex-col" value="errors">
          <div className="text-lg font-bold">Errors</div>
          <div className="text-sm text-gray-500">567</div>
        </TabsTrigger>
        <TabsTrigger className="flex flex-col" value="latency">
          <div className="text-lg font-bold">Latency</div>
          <div className="text-sm text-gray-500">890 ms</div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="calls">Calls content will go here.</TabsContent>
      <TabsContent value="errors">Errors content will go here.</TabsContent>
      <TabsContent value="latency">Latency content will go here.</TabsContent>
      <div>
        <p>i said under</p>
      </div>
    </Tabs>
  );
}
