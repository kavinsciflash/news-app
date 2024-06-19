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
      } else if(window.innerWidth <= 760){
        setLimit(3); // Default limit for larger screens
      }else{
        setLimit(1);
      }
    };

    // Initialize with the correct limit based on initial window width
    handleResize();

    // Listen to window resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageItems = () => {
    const pageItems = [];

    for (let i = 1; i <= Math.ceil(totalPages / limit); i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
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
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
}

export default CustomPagination;
