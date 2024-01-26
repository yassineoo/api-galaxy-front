import { useState } from "react";
import { Search } from "../../shared/search";
import { Button } from "@/components/ui/button";

export function ApiSelection() {
  const [apiList, setApiList] = useState(["Translator", "MovieAPI"]);

  const removeApi = (apiToRemove: string) => {
    setApiList(apiList.filter((api) => api !== apiToRemove));
  };

  return (
    <div className="m-auto w-4/5 ">
      <Search />
      <ul className="my-4 flex justify-start items-center gap-2">
        {apiList.map((api) => (
          <li key={api}>
            <Button onClick={() => removeApi(api)}>
              {api}{" "}
              <span className="ml-2 mr-1 text-blue-700  text-lg font-base">
                X
              </span>{" "}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
