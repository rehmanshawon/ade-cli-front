import React from "react";

function TablePagination(props) {
  const {
    canPreviousPage,
    gotoPage,
    previousPage,
    nextPage,
    canNextPage,
    pageIndex,
    pageOptions,
    pageSize,
    setPageSize,
    pageCount,
  } = props;
  return (
    <div className="card-footer pt-2 border-0">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex flex-wrap py-2 mr-3 ">
          <button
            className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <i className="ki ki-bold-double-arrow-back icon-xs" />
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1"
          >
            <i className="ki ki-bold-arrow-back icon-xs" />
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1"
          >
            <i className="ki ki-bold-arrow-next icon-xs" />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="btn btn-icon btn-sm btn-light btn-hover-primary mr-2 my-1"
          >
            <i className="ki ki-bold-double-arrow-next icon-xs" />
          </button>
          <div className="d-flex align-items-center">
            <span className="mx-3">Go to page</span>
            <input
              type="number"
              className="form-control form-control-sm font-weight-bold mr-4 border-0 bg-light false"
              defaultValue={pageIndex + 1}
              min={1}
              max={pageOptions.length}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "60px" }}
            />
          </div>
        </div>

        <div className="d-flex align-items-center py-3">
          <span className="react-bootstrap-table-pagination-total mr-3">
            Showing Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="form-control form-control-sm font-weight-bold mr-4 border-0 bg-light false"
            style={{ width: "80px" }}
          >
            {[10, 15, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TablePagination;
