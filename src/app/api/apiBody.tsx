import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApiGraph from "./apiDoc";
import CodeSnippet from "./codeSnippet";
export function ApiTabs() {
  const codeString = `function add(a, b) {
        return a + b;
      }`;
  return (
    <Tabs defaultValue="endpoints" className="  ">
      <TabsList className="grid  grid-cols-4 w-[400px] ml-8 my-2">
        <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="discussion">Discussion</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
      </TabsList>
      <TabsContent
        value="endpoints"
        className="w-full bg-slate-900 flex flex-col justify-center h-[100vh]"
      >
        <ApiGraph />
        <CodeSnippet codeString={codeString} language="javascript" />
      </TabsContent>
      <TabsContent value="about">about</TabsContent>
    </Tabs>
  );
}
