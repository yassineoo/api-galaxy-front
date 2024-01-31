import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Search } from "../shared/search";

export default function DefinitionTab({ api }: any) {
  return (
    <div className="flex justify-start items-start gap-4 w-full ">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-start gap-4">
            <img src="/icons/add-api.svg" alt="" className="w-4 h-4 ml-2 " />
            <CardTitle className="text-2xl">Endpoints</CardTitle>
          </div>
          <CardDescription>Define your api Endpoints</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Search />
        </CardContent>
      </Card>
    </div>
  );
}
