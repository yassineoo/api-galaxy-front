import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useSearchApiList } from "@/hooks/apis/api.queries";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useAuthSession } from "../auth-provider";


export default function SearchApiInput() {
  const [searchTerm, setSearchTerm] = useState("");


  // const { data: session, status } = useSession();
  const { session } = useAuthSession();

  const searchResults = useSearchApiList({
    search: searchTerm,
    authToken: session?.token ?? "",
  });

  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]); // State to store filtered suggestions



  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const {
    data: filteredSuggestions,
    isLoading,
    refetch,

  } = useSearchApiList({ search: searchTerm , authToken: session?.token ?? "" });


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    refetch();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !(inputRef.current as any).contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {

    setShowSuggestions(searchTerm.length > 0);
  }, [searchTerm, filteredSuggestions]);


  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md flex items-center" ref={inputRef}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none w-full">
        <Image
          src="/assets/magnifying-glass.png"
          alt="API GALAXY"
          width={20}
          height={20}
          priority
        />
      </div>
      <Input
        className="block flex-1 p-4 pl-10 pr-6 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-lg   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        id="search"
        placeholder="Search..."
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <button
        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        type="button"
        onClick={() => setSearchTerm("")}
      >
        <span className="text-gray-500">×</span>
      </button>

      {showSuggestions && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 suggestion-list transition-opacity duration-700 ease-in-out">
          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredSuggestions && filteredSuggestions.length > 0 ? (
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-400">
              {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer flex justify-start items-center gap-8 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-black"
                  onClick={() => {
                    router.push(`/api/${suggestion.ID}`);
                  }}
                >
                  <CldImage
                    src={suggestion.ImagePath}
                    alt="Card Image"
                    width={45}
                    height={45}
                  />
                  {suggestion.Name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center p-4 text-gray-500 dark:text-gray-400">
              Not Found
            </div>
          )}

        </div>
      )}
    </div>
  );
}
