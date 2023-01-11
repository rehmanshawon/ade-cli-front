import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Input, Select } from "../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import API from "../../../helpers/devApi";
import { swalError, swalSuccess } from "../../../helpers/swal";

const _init = {
  user_name: "",
  email: "",
  password: "",
  role_id: undefined,
};

export const AddEditUserModal = ({
  showDetails,
  setShowDetails,
  getEntityList,
  edit,
  setEdit,
  selectedRow,
  setSelectedRow,
}) => {
  const [user, setUser] = useState(_init);
  const [roles, setRoles] = useState([]);

  // get list
  const getRoleList = async () => {
    await API.get("/sys_roles")
      .then((res) => {
        if (res.data.success) {
          setRoles(res.data?.data?.sys_roles);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email()
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    role_id: Yup.number().required("Role is required"),
  });

  const handleAddRole = async (values, action) => {
    await API.post("/auth/signup", values)
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
  };

  useEffect(() => {
    getRoleList();
    if (edit) {
      setUser(() => ({
        user_name: selectedRow.sys_users__user_name,
        email: selectedRow.sys_users__email,
      }));
    } else {
      setUser(_init);
    }
  }, [edit, selectedRow]);

  return (
    <Modal
      show={showDetails}
      onHide={() => {
        setShowDetails(false);
        setEdit(false);
        setSelectedRow({});
      }}
      size="xl"
      aria-labelledby="example-modal-sizes-title-lg"
      centered={true}
    >
      {/* Base Products */}
      <div className="card card-custom">
        <div className="card-header border-0 py-5 d-flex justify-content-between">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark d-block">
              {edit ? "Update" : "Create"} User
            </span>
          </h3>
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          handleAddRole(values, action);
        }}
      >
        {({ handleSubmit, errors, values, setFieldValue }) => (
          <Form>
            <Modal.Body>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Field
                    name="user_name"
                    component={Input}
                    placeholder="Enter User Name"
                    label="User Name"
                    value={values.user_name ?? ""}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <Field
                    name="email"
                    component={Input}
                    placeholder="Enter Email"
                    label="Email"
                    value={values.email ?? ""}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Field
                    name="password"
                    component={Input}
                    placeholder="Enter password"
                    label="Password"
                    value={values.password ?? ""}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Field
                    as="select"
                    name="role_id"
                    onChange={(e) => {
                      setFieldValue("role_id", e.target.value);
                    }}
                    component={Select}
                    placeholder="Select Role"
                    label="Role"
                    value={values.role_id ?? ""}
                  >
                    <option value="">Select</option>
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, i) => (
                        <option key={i} value={item?.sys_roles__id}>
                          {item?.sys_roles__role_name}
                        </option>
                      ))}
                  </Field>
                </div>
              </div>
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

export default AddEditUserModal;
