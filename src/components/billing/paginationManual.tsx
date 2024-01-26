import { Button } from "@/components/ui/button";
import React from "react";

const PaginationManual = ({ currentPage, totalPages, onPageChange }: any) => {
  return (
    <div className="flex items-center justify-center space-x-1 mt-6">
      <Button
        className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {[1, 2, 3].map((page) => (
        <Button
          key={page}
          className={`px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100 ${
            currentPage === page ? "bg-black text-white" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <span>...</span>

      <Button
        className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100"
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </Button>

      <Button
        className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationManual;
