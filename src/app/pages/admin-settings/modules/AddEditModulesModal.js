import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Input } from "../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import API from "../../../helpers/devApi";
import { swalError, swalSuccess } from "../../../helpers/swal";

const _init = {
  module_name: "",
  module_url: "",
  module_icon_url: "",
};

export const AddEditModulesModal = ({
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
    module_name: Yup.string().required("Module Name is required"),
    module_url: Yup.string().required("Module URL is required"),
    module_icon_url: Yup.string().required("Module Icon is required"),
  });

  const handleAddRole = async (values, action) => {
    if (edit) {
      await API.patch(`/sys_modules/${selectedRow?.id}`, values)
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
      await API.post("/sys_modules", values)
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
        module_name: selectedRow.module_name,
        module_url: selectedRow.module_url,
        module_icon_url: selectedRow.module_icon_url,
      }));
    } else {
      setRole(_init);
    }
  }, [
    edit,
    selectedRow.module_name,
    selectedRow.module_url,
    selectedRow.module_icon_url,
  ]);

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
              {edit ? "Update" : "Create"} Module
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
                name="module_name"
                component={Input}
                placeholder="Enter Module Name"
                label="Module Name"
                value={values.module_name ?? ""}
              />
              <Field
                name="module_url"
                component={Input}
                placeholder="Enter Module URL"
                label="Module URL"
                value={values.module_url ?? ""}
              />
              <Field
                name="module_icon_url"
                component={Input}
                placeholder="Enter Module Icon URL"
                label="Module Icon URL"
                value={values.module_icon_url ?? ""}
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

export default AddEditModulesModal;
