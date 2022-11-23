import React, { Fragment, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { v4 as uuidv4 } from "uuid";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../_helpers";

const UniTable = ({
  column,
  data,
  onChange,
  paginate,
  onPageChange,
  totalPage,
  setSelectedPropsKeys,
  setSelectedPropsValue,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSelectedPropsKeys(dataIndex);
    setSelectedPropsValue(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={close}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = column.map((item) => {
    return {
      title: item?.columnName,
      dataIndex: item?.fieldName,
      key: item?.fieldName,
      ...getColumnSearchProps(`${item?.fieldName}`),
    };
  });

  const actions = {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (_, row) => (
      <>
        <button
          onClick={() => {
            console.log({ row });
          }}
          className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              title="Edit"
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
            />
          </span>
        </button>
        <button
          onClick={() => {
            console.log({ row });
          }}
          className="btn btn-icon btn-light btn-hover-danger btn-sm mx-3"
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG
              title="Delete"
              src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
            />
          </span>
        </button>
      </>
    ),
  };

  columns.push(actions);

  return (
    <Fragment>
      <Table
        className="table table-head-custom table-head-bg table-borderless table-vertical-center"
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={false}
      />

      <div className="mt-5" style={{ float: "right" }}>
        <Pagination
          showSizeChanger
          pageSizeOptions={["10", "20", "30", "50", "100"]}
          onShowSizeChange={onPageChange}
          defaultPageSize={paginate.defaultPageSize}
          defaultCurrent={paginate.current}
          total={totalPage ?? 0}
        />
      </div>
    </Fragment>
  );
};
export default UniTable;
