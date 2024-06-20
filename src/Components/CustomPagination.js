import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

function CustomPagination(props) {
  const [limit, setLimit] = useState(1);
  const { currentPage, totalPages, onPageChange } = props;

  useEffect(() => {
    const handleResize = () => {
      // Adjust the limit based on the window width
      if (window.innerWidth <= 576) {
        setLimit(5); // Example: reduce limit for smaller screens
      } else if (window.innerWidth <= 760) {
        setLimit(3); // Default limit for mid-sized screens
      } else {
        setLimit(1); // Default limit for larger screens
      }
    };

    // Initialize with the correct limit based on initial window width
    handleResize();

    // Listen to window resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Added an empty dependency array to run this effect only once

  useEffect(() => {
    // When limit changes, adjust current page to ensure valid pagination
    if (currentPage > Math.ceil(totalPages / limit)) {
      onPageChange(Math.ceil(totalPages / limit));
    }
  }, [limit, currentPage, totalPages, onPageChange]);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageItems = () => {
    const pageItems = [];
    const numPages = Math.ceil(totalPages / limit);

    for (let i = 1; i <= numPages; i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pageItems;
  };

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        />
        {renderPageItems()}
        <Pagination.Next
          disabled={currentPage === Math.ceil(totalPages / limit)}
          onClick={() => handlePageClick(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
}

export default CustomPagination;
