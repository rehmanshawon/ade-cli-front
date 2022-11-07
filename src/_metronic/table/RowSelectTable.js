import React, { useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import TablePagination from "./TablePagination";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../_helpers";

function RowSelectTable({
  columns,
  data,
  setShowAddDataModal,
  title,
  lists,
  hideAddButton,
  setOrderSelected,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    setOrderSelected(selectedFlatRows);
  }, [selectedFlatRows]);
  return (
    <div
      className="card card-custom mt-5 pt-4"
      style={{ border: "1px solid #d6d6d6" }}
    >
      <div className="card-header mb-0 pb-0 border-0 d-flex justify-content-between">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark d-block">
            {title}
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Total {lists.length}
          </span>
        </h3>
        <div className="card-toolbar">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>

      <div className="card-body py-0">
        <div className="tab-content">
          <div className="table-responsive">
            <table
              {...getTableProps()}
              className="table table-head-custom table-head-bg table-borderless table-vertical-center"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps({
                            style: {
                              minWidth: column.minWidth,
                              width: index === 0 ? "50px" : column.width,
                              paddingLeft: column.paddingLeft,
                            },
                          })
                        )}
                        className="datatable-cell datatable-cell-sort datatable-cell-sorted"
                      >
                        <span className="text-dark-75">
                          {column.render("Header")}
                        </span>
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <i
                                className="flaticon2-arrow-up"
                                style={{
                                  color: "#3699FF",
                                  fontSize: ".6rem",
                                  marginLeft: "10px",
                                }}
                              ></i>
                            ) : (
                              <i
                                className="flaticon2-arrow-down"
                                style={{
                                  color: "#3699FF",
                                  fontSize: ".6rem",
                                  marginLeft: "10px",
                                }}
                              ></i>
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="text-dark-75 mb-1"
                      style={{ borderBottom: "1px dashed #EBEDF3" }}
                    >
                      {row.cells.map((cell, index) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className={`${
                              index === 0
                                ? "pl-2 py-3 font-size-sm"
                                : "pl-0 py-3 font-size-sm"
                            }`}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TablePagination
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageCount={pageCount}
      />
    </div>
  );
}

const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <label className="checkbox">
        <input
          type="checkbox"
          style={{ width: "50px" }}
          ref={resolvedRef}
          {...rest}
        />
        <span></span>
      </label>
    </>
  );
});

export default RowSelectTable;
