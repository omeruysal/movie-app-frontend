import React, { useEffect, useState } from 'react';

const Pagination = ({ currentPage, lastPage, loadMore }) => {
  return (
    <>
      {currentPage !== lastPage && lastPage !== 0 && (
        <div className="d-flex justify-content-center m-5">
          <button className="btn btn-primary" onClick={(e) => loadMore((pr) => pr + 1)}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
