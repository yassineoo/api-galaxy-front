import { Button } from "@/components/ui/button";
import React from "react";

const PaginationManual = ({ currentPage, totalPages, onPageChange }: any) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-6">
      <Button
        className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {totalPages <= 3 ? (
        // If there are 3 or fewer pages, display all page buttons
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            className={`px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100 ${
              currentPage === page ? "bg-black text-white" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))
      ) : (
        // For more than 3 pages, display the first 3, an ellipsis, and the last page
        <>
          {[1, 2, 3].map((page) => (
            <Button
              key={page}
              className={`px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100 ${
                currentPage === page ? "bg-black text-white" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}

          <span>...</span>

          <Button
            className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationManual;
