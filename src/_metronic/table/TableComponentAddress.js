import React from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

function TableComponentAddress({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns: columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
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
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps({
                                style: {
                                  minWidth: column.minWidth,
                                  width: column.width,
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
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="pl-0 py-3 font-size-sm"
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
  );
}

export default TableComponentAddress;
