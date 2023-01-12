import React, { useEffect, useMemo, useState } from "react";
import API from "../../../helpers/devApi";
import TableComponent from "../../../../_metronic/table/TableComponent";
import moment from "moment";
import { AddEditUserModal } from "./AddEditUserModal";
import SVG from "react-inlinesvg";
import { swalConfirm, swalError, swalSuccess } from "../../../helpers/swal";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export const Users = () => {
  const [entities, setEntities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  // get list
  const getEntityList = async () => {
    await API.get("/sys_users")
      .then((res) => {
        console.log({ res });
        if (res.data.success) {
          setEntities(res.data?.data?.sys_users);
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
        await API.delete(`/sys_roles/${id}`)
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
        Header: "user name",
        accessor: "sys_users__user_name",
        paddingLeft: "0px",
      },
      {
        Header: "email",
        accessor: "sys_users__email",
        paddingLeft: "0px",
      },
      {
        Header: "role",
        accessor: "sys_role__role_name",
        paddingLeft: "0px",
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
        title="User List"
        hideAddButton={false}
        setShowAddDataModal={setShowModal}
      />

      <AddEditUserModal
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

export default Users;
