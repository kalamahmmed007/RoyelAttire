import { useState, useMemo } from 'react';

export const usePagination = (items, itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Get current items
    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return items.slice(indexOfFirstItem, indexOfLastItem);
    }, [items, currentPage, itemsPerPage]);

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

    // Go to first page
    const firstPage = () => {
        goToPage(1);
    };

    // Go to last page
    const lastPage = () => {
        goToPage(totalPages);
    };

    // Check if on first page
    const isFirstPage = currentPage === 1;

    // Check if on last page
    const isLastPage = currentPage === totalPages;

    // Get page numbers for pagination display
    const getPageNumbers = (maxVisible = 5) => {
        const pages = [];
        const half = Math.floor(maxVisible / 2);

        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return {
        currentPage,
        totalPages,
        currentItems,
        goToPage,
        nextPage,
        previousPage,
        firstPage,
        lastPage,
        isFirstPage,
        isLastPage,
        getPageNumbers,
    };
};

export default usePagination;