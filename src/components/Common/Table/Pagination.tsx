import React from "react";

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
  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Generate page numbers (show 5 at a time)
  const pageNumbers = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center py-2">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className={`p-2 text-sm font-medium ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-dark"
        }`}
      >
        Previous
      </button>
      <div className="flex space-x-2 mx-4">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`p-2 px-4 text-sm font-medium rounded-md ${
              page === currentPage ? "bg-dark text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className={`p-2 text-sm font-medium ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-dark"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
