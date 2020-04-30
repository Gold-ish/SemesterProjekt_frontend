import React from "react";
import Pagination from "react-js-pagination";
 
function pageHandler ({activePage, setPage, changePage, totalItemsCount}) {

  function handlePageChange(pageNumber) {
    setPage(pageNumber);
    changePage(pageNumber);
  }
 
    return (
      <div className="pagination">
        <Pagination
          activePage={activePage}
          totalItemsCount={totalItemsCount}
          itemsCountPerPage={10}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
    );
}
 
export default pageHandler;