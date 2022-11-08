import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import SVG from "react-inlinesvg";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../../../_metronic/table/TableComponent";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import API from "../../../helpers/devApi";
import { swalConfirm, swalError, swalSuccess } from "../../../helpers/swal";
import { setModules } from "../../../modules/Auth/redux/authReducer";
import { AddEditModulesModal } from "./AddEditModulesModal";

export const Modules = () => {
  const dispatch = useDispatch();
  const [entities, setEntities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const { menuType, modules } = useSelector((state) => state.auth);

  // get list
  const getEntityList = async () => {
    await API.get("/sys_modules")
      .then((res) => {
        if (res.data.success) {
          setEntities(res.data?.data?.sys_modules);
          //   dispatch(setModules(res.data.data.sys_modules ?? []));
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  // handle edit
  const handleEdit = async (data) => {
    setShowModal(true);
    setEdit(true);
    setSelectedRow(data);
  };

  // handle Delete
  const handleDelete = async (id) => {
    swalConfirm().then(async (res) => {
      if (res.isConfirmed) {
        await API.delete(`/sys_modules/${id}`)
          .then(async (res) => {
            if (res.data.success) {
              swalSuccess(res.data.data?.message);
              await getEntityList();
            } else {
              swalError("something went wrong");
            }
          })
          .catch((error) => {
            swalError("something went wrong");
          });
      }
    });
  };

  const data = useMemo(() => entities, [entities]);
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, index) => (
          <div className="d-flex align-items-center pl-4">
            <div>
              <h4 className="text-dark-75 font-weight-bolder mb-1 font-size-sm">
                {index + 1}
              </h4>
            </div>
          </div>
        ),
        minWidth: 50,
        width: 50,
      },
      {
        Header: "module name",
        accessor: "module_name",
        paddingLeft: "0px",
      },
      {
        Header: "module url",
        accessor: "module_url",
        paddingLeft: "0px",
      },
      {
        Header: "created at",
        accessor: (row, index) => (
          <div>{moment(row.original?.created_at).format("DD-MM-YYYY")}</div>
        ),
        paddingLeft: "0px",
      },
      {
        Header: "Status",
        accessor: "is_active",
        width: 100,
        minWidth: 100,
        paddingLeft: "0px",
        Cell: ({ row }) => (
          <span
            className={`badge ${
              row.original.is_active == true ? "badge-success" : "badge-warning"
            }`}
          >
            {row.original.is_active == true ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        Header: "Action",
        paddingLeft: "0px",
        width: 160,
        minWidth: 160,
        Cell: ({ row }) => (
          <>
            <button
              onClick={() => {
                handleEdit(row.original);
              }}
              className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
            >
              <span className="svg-icon svg-icon-md svg-icon-primary">
                <SVG
                  title="Edit"
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Write.svg"
                  )}
                />
              </span>
            </button>
            <button
              onClick={() => {
                handleDelete(row.original?.id);
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
      },
    ],
    [entities]
  );

  useEffect(() => {
    getEntityList();
  }, []);

  return (
    <div className="card">
      <TableComponent
        data={data ?? []}
        columns={columns}
        lists={entities ?? []}
        title="Module List"
        hideAddButton={false}
        setShowAddDataModal={setShowModal}
      />

      <AddEditModulesModal
        setShowDetails={setShowModal}
        showDetails={showModal}
        getEntityList={getEntityList}
        setEdit={setEdit}
        edit={edit}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />
    </div>
  );
};

export default Modules;
