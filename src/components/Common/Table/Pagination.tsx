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
    if (totalPages > 0) {
      const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      setPageNumbers(pages);
    }
  }, [totalPages]);

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
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`p-2 px-4 text-sm font-medium rounded-md ${
              page === currentPage ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
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
