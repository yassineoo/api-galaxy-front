import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useSearchApiList } from "@/hooks/apis/api.queries";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

export default function SearchApiInput() {
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = useSearchApiList({ search: searchTerm });
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]); // State to store filtered suggestions
  const [showSuggestions, setShowSuggestions] = useState(false); // State to control suggestion visibility

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    // console.log("searchTerm", searchTerm, suggestions, searchResults.data);

    // Filter the suggestions based on the search term
    /* 
    const filteredSuggestions = suggestions?.filter((suggestion) =>
      suggestion?.toLowerCase()?.includes(event.target.value.toLowerCase())
    );
    */
    // setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0); // Show suggestions only if there are results
  };
  const inputRef = useRef(null);

  const handleClickOutside = (event: any) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };
  useEffect(() => {
    console.log(
      "searchResults.isSuccess",
      searchResults.isSuccess,
      searchResults.data
    );
    if (searchResults.isSuccess) {
      setFilteredSuggestions(searchResults.data.data.slice(0, 5));
    }
  }, [searchResults.isSuccess]);

  useEffect(() => {
    // Bind the click outside listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove the listener when unmounting
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const router = useRouter();

  return (
    <div className="relative w-full max-w-md" ref={inputRef}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Image
          src="/assets/magnifying-glass.png"
          alt="API GALAXY"
          width={20}
          height={20}
          priority
        />
      </div>
      <Input
        className="block w-full p-4 pl-10 pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="search"
        placeholder="Search..."
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        type="button"
        onClick={() => setSearchTerm("")} // Clear the search term
      >
        {/* Your close icon */}X
      </button>

      {true && ( // Conditionally render suggestions only when showSuggestions is true
        <div
          className={`absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 suggestion-list ${
            showSuggestions ? "opacity-100 visible" : "opacity-0 invisible"
          } transition-opacity duration-700 ease-in-out`}
        >
          {" "}
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-400">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className=" cursor-pointer flex justify-start items-center  gap-8 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-black"
                onClick={() => {
                  router.push(`/api/${suggestion.ID}`);
                }}
              >
                <CldImage
                  src={suggestion.ImagePath}
                  alt="Card Image"
                  width={45}
                  height={45}
                ></CldImage>
                {suggestion.Name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
