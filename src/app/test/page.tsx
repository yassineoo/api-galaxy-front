"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeResult } from "../api/apiBody";
import CodeSnippet from "../api/codeSnippet";
import ApiDocsGraph from "../api/apiDoc";
import About from "../api/about";

export default function Testpage() {
  return (
    <div className="h-screen">
      <About />
    </div>
  );
}
