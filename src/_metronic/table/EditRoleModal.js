import React from "react";
import swal from "sweetalert";
import Axios from "axios";
import { Field, Formik } from "formik";
import { Modal, Form } from "react-bootstrap";
import { Input } from "../_partials/controls";

function EditRoleModal(props) {
  const {
    showEdit,
    setShowEdit,
    fetchUser,
    url,
    selectedUser,
    setSelectedUser,
    accessToken,
    refreshToken,
  } = props;

  const handleSubmitEdit = async (values) => {
    try {
      const { data } = await Axios.patch(
        `${process.env.REACT_APP_API_URL}/${url}/${selectedUser.id}`,
        {
          name: values.name,
          remark: values.remark,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            refreshToken: refreshToken,
          },
        }
      );

      if (data.error === false) {
        setSelectedUser(null);
        setShowEdit(false);

        swal({
          title: data.message,
          icon: "success",
        });

        fetchUser();
      } else {
        swal({
          title: data.message,
          icon: "error",
        });
      }
    } catch (error) {
      swal({
        title: error.response.data.message,
        icon: "error",
      });
    }
  };
  return (
    <Modal
      show={showEdit}
      onHide={() => setShowEdit(false)}
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg"
      centered
    >
      <Formik
        enableReinitialize={true}
        initialValues={selectedUser}
        onSubmit={(values) => {
          handleSubmitEdit(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Header>
              <h4>Edit User Role</h4>
            </Modal.Header>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-6">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Name"
                      label="Name"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-6">
                    <Field
                      name="remark"
                      component={Input}
                      placeholder="Remark"
                      label="Remark"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}

export default EditRoleModal;
