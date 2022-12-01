import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useHistory, useLocation } from "react-router-dom";
import UniTable from "../../../_metronic/table/UniTable";
import { LoadingDialog } from "../../../_metronic/_partials/controls/LoadingDialog";
import API from "../../helpers/devApi";
import { swalConfirm, swalError, swalSuccess } from "../../helpers/swal";
import pluralize from "pluralize";

const View = ({ slug_name, slug_type }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [gridColumns, setGridColumns] = useState([]);
  const [entities, setEntities] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [paginate, setPaginate] = useState({
    defaultPageSize: 10,
    current: 1,
  });
  const [selectedPropKeys, setSelectedPropsKeys] = useState();
  const [selectedPropValue, setSelectedPropsValue] = useState();
  const [headers, setHeaders] = useState([]);
  const [allData, setAllData] = useState([]);
  const [tableName, setTableName] = useState("");
  const [deleteAPi, setDeleteApi] = useState("");

  const pathname = window.location.pathname;
  const search = window.location.search;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // console.log({ gridColumns });
  // console.log({ entities });

  // handle edit button
  const handleEditButton = (row) => {
    let path = pathname?.split("/");
    path.pop();
    path.push("update");
    const base = path.join("/");
    const query = search?.split("=grid")[0];

    Object.keys(row).forEach((key, index) => {
      if (row[key] == row[tableName]) {
        history.push(`${base}${query}=update&id=${row[tableName]}`);
      }
    });
  };

  // handle delete button
  const handleDeleteButton = async (row) => {
    Object.keys(row).forEach((key, index) => {
      if (row[key] == row[tableName]) {
        swalConfirm().then(async (res) => {
          if (res.isConfirmed) {
            await API.delete(`/${deleteAPi}/${row[tableName]}`)
              .then(async (res) => {
                if (res.data?.success) {
                  swalSuccess(res.data?.message);
                } else {
                  swalError("something went wrong");
                }
                await getGridData(slug_name, slug_type);
              })
              .catch((error) => {
                console.log(error);
                swalError("something went wrong");
              });
          }
        });
      }
    });
  };

  // get grid data
  const getGridData = async (slug_name, slug_type) => {
    setLoading(true);
    if (slug_name && slug_type) {
      await API.get(
        `/sys_masters?slug_name=${slug_name}&slug_type=${slug_type}`
      )
        .then(async (res) => {
          if (res.data?.success) {
            const values = res.data?.data;
            const grid_params = values?.grid_params;
            const grid_arr = JSON.parse(grid_params);
            let arr = [];
            let headers = [];

            let data = grid_arr?.forEach((element) => {
              return element?.fieldList?.forEach((field) => {
                if (field?.include == true) {
                  arr.push(field);
                  headers.push({
                    label: field?.columnName,
                    key: field?.fieldName,
                  });
                }
              });
            });

            let gridApi = values?.grid_api?.split("v1")[1];
            let apiArr = values?.grid_api?.split("?")[0]?.split("/");
            setTableName(`${apiArr[apiArr?.length - 1]}__id`);
            setDeleteApi(`${apiArr[apiArr?.length - 1]}`);
            await getEntities(gridApi);
            await getAllData(gridApi);
            setGridColumns(arr);
            setHeaders(headers);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      setLoading(false);
    }
  };

  // entities for table
  const getEntities = async (api) => {
    await API.get(
      `${api}&size=${paginate.defaultPageSize}&page=${paginate.current}`
    )
      .then((res) => {
        if (res.data?.success) {
          setTotalPage(res.data?.data?.totalItems);
          return Object.keys(res.data?.data)?.forEach((key, index) => {
            if (typeof res.data?.data[key] == "object") {
              setEntities(res.data?.data[key]);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // list for csv download
  const getAllData = async (api) => {
    await API.get(`${api}`)
      .then((res) => {
        if (res.data?.success) {
          return Object.keys(res.data?.data)?.forEach((key, index) => {
            if (typeof res.data?.data[key] == "object") {
              setAllData(res.data?.data[key]);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // on page change
  const onPageChange = (page, pageSize) => {
    setPaginate((prev) => ({
      ...prev,
      current: page,
      defaultPageSize: pageSize,
    }));
    getGridData(slug_name, slug_type);
  };

  useEffect(() => {
    getGridData(slug_name, slug_type);
  }, [slug_name, slug_type, paginate.current, paginate.defaultPageSize]);

  return (
    <div className="card p-5">
      <div className="card-header border-0 p-0 d-flex justify-content-between">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark d-block text-capitalize">
            <span>{pluralize(tableName?.split("__id")[0])}</span>
          </span>
          <span className="text-muted font-weight-bold font-size-sm">
            Total {totalPage ?? 0}
          </span>
        </h3>
        <div className="card-toolbar">
          <CSVLink
            data={allData}
            filename={slug_name}
            headers={headers}
            className="btn btn-primary btn-lg ml-3"
          >
            Export as CSV
          </CSVLink>
        </div>
      </div>
      {loading ? (
        <LoadingDialog isLoading={loading} />
      ) : (
        <div className="table-responsive">
          <UniTable
            column={gridColumns}
            data={entities}
            onChange={onChange}
            paginate={paginate}
            onPageChange={onPageChange}
            totalPage={totalPage}
            setSelectedPropsKeys={setSelectedPropsKeys}
            setSelectedPropsValue={setSelectedPropsValue}
            handleEditButton={handleEditButton}
            handleDeleteButton={handleDeleteButton}
          />
        </div>
      )}
    </div>
  );
};

export default View;
