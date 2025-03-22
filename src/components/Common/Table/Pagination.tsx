import React, { useEffect, useState } from "react";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const pages: number[] = [];
    
    if (totalPages <= 6) {
      // Show all pages if they are less than or equal to 6
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        // Show first 5 pages and last page
        pages.push(1, 2, 3, 4, 5, totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show first page and last 5 pages
        pages.push(1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first page, current page neighbors, and last page
        pages.push(1, currentPage - 1, currentPage, currentPage + 1, totalPages);
      }
    }

    setPageNumbers(pages);
  }, [totalPages, currentPage]);

  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-end items-center py-2">
      <div className="flex justify-between items-center space-x-2">
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className="p-2 text-sm font-medium text-gray-500"
        >
          Previous
        </button>
        {pageNumbers.map((page, index) => (
          <React.Fragment key={page}>
            {index > 0 && pageNumbers[index - 1] !== page - 1 && (
              <span className="px-2">...</span>
            )}
            <button
              onClick={() => onPageChange(page)}
              className={`p-2 px-4 text-sm font-medium rounded-md ${
                page === currentPage ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          </React.Fragment>
        ))}
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className="p-2 text-sm font-medium text-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
