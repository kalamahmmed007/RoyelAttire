import { useState, useMemo } from 'react';

/**
 * Custom hook for managing pagination logic
 * 
 * @param {Array} data - Array of items to paginate
 * @param {number} itemsPerPage - Number of items per page (default: 10)
 * @returns {object} - Pagination state and functions
 */
const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  // Get current page data
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // Go to specific page
  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  // Go to next page
  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  // Go to previous page
  const previousPage = () => {
    goToPage(currentPage - 1);
  };

  // Reset to first page
  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    currentData,
    goToPage,
    nextPage,
    previousPage,
    resetPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};

export default usePagination;