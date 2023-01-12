import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Input } from "../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import API from "../../../helpers/devApi";
import { swalError, swalSuccess } from "../../../helpers/swal";

const _init = {
  role_name: "",
};

export const AddEditRoleModal = ({
  showDetails,
  setShowDetails,
  getEntityList,
  edit,
  setEdit,
  selectedRow,
  setSelectedRow,
}) => {
  const [role, setRole] = useState(_init);

  // Validation schema
  const validationSchema = Yup.object().shape({
    role_name: Yup.string().required("Role Name is required"),
  });

  const handleAddRole = async (values, action) => {
    if (edit) {
      await API.patch(`/sys_roles/${selectedRow?.id}`, values)
        .then(async (res) => {
          if (!res.data?.error) {
            action.resetForm();
            await getEntityList();
            setShowDetails(false);
            setSelectedRow({});
            setEdit(false);
            swalSuccess(res.data?.message);
          } else {
            swalError("something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
          swalError("something went wrong");
        });
    } else {
      await API.post("/sys_roles", values)
        .then(async (res) => {
          if (!res.data?.error) {
            action.resetForm();
            swalSuccess(res.data?.message);
            await getEntityList();
            setShowDetails(false);
            setSelectedRow({});
          } else {
            swalError("something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
          swalError("something went wrong");
        });
    }
  };

  useEffect(() => {
    if (edit) {
      setRole(() => ({
        role_name: selectedRow.role_name,
      }));
    } else {
      setRole(_init);
    }
  }, [edit, selectedRow.role_name]);

  return (
    <Modal
      show={showDetails}
      onHide={() => {
        setShowDetails(false);
        setEdit(false);
        setSelectedRow({});
      }}
      size="md"
      aria-labelledby="example-modal-sizes-title-lg"
      centered={false}
    >
      {/* Base Products */}
      <div className="card card-custom">
        <div className="card-header border-0 py-5 d-flex justify-content-between">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark d-block">
              {edit ? "Update" : "Create"} User Role
            </span>
          </h3>
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={role}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          handleAddRole(values, action);
        }}
      >
        {({ handleSubmit, errors, values }) => (
          <Form>
            <Modal.Body>
              <Field
                name="role_name"
                component={Input}
                placeholder="Enter Role Name"
                label="Role Name"
                value={values.role_name ?? ""}
              />
            </Modal.Body>

            <Modal.Footer className="border-0">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setShowDetails(false);
                    setEdit(false);
                    setSelectedRow({});
                  }}
                  className="btn btn-secendary btn-elevate"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary btn-elevate"
                >
                  {edit ? "Update" : "Save"}
                </button>
              </div>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddEditRoleModal;
