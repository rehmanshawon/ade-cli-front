import React from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";
import {
    useTable,
    useSortBy,
    usePagination,
    useGlobalFilter,
} from "react-table";
import { Select, Empty } from "antd";
import GlobalFilter from "./GlobalFilter";
import TablePagination from "./TablePagination";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../_helpers";

const dateFormat = "YYYY-MM-DD";

function RoleFeatureTable({
    columns,
    data,
    setShowAddDataModal,
    title,
    lists,
    categoryList,
    
    types,
    setTypes,
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
        state: { pageIndex, pageSize, globalFilter },
        setGlobalFilter,
    } = useTable(
        {
            columns: columns,
            data: data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { Option } = Select;

    return (
        <div className="card card-custom">
            <div className="card-header border-0 pt-5 d-flex justify-content-between">
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

            <div className="card-body mb-5">
                <div className="container px-0">
                    <div className="row">

                        <div className="col-md-3">
                            <div className="d-flex" style={{ flexDirection: "column" }}>
                                <label>Select User Role</label>
                                <Select
                                    showSearch
                                    style={{ width: "100%", marginRight: "10px" }}
                                    placeholder="Select Types"
                                    optionFilterProp="children"
                                    value={types}
                                    onChange={(value) => setTypes(value)}
                                    filterOption={(input, option) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {categoryList &&
                                        categoryList.map(({ id, name }) => (
                                            <Option key={id} value={id}>
                                                {name}
                                            </Option>
                                        ))}
                                </Select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {lists.length ? (
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
                                                            className="pl-0 py-3 font-size-sm "
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
            ) : (
                <div className="card-body py-0">
                    <Empty />
                </div>
            )}

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

export default RoleFeatureTable;
