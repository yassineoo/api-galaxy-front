import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

export default function SearchApiInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3",
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]); // State to store filtered suggestions
  const [showSuggestions, setShowSuggestions] = useState(false); // State to control suggestion visibility

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    // Filter the suggestions based on the search term
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0); // Show suggestions only if there are results
  };
  const inputRef = useRef(null);

  const handleClickOutside = (event: any) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    // Bind the click outside listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove the listener when unmounting
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
      {showSuggestions && ( // Conditionally render suggestions only when showSuggestions is true
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-400">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
