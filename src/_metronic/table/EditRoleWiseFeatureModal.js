import React from "react";
import swal from "sweetalert";
import Axios from "axios";
import { Field, Formik } from "formik";
import { Modal, Form } from "react-bootstrap";

function EditRoleWiseFeatureModal(props) {
  const {
    showEdit,
    setShowEdit,
    fetchUser,
    url,
    selectedUser,
    setSelectedUser,
    accessToken,
    refreshToken,
    systemFeature,
    roles,
  } = props;

  const handleSubmitEdit = async (values) => {
    try {
      const { data } = await Axios.patch(
        `${process.env.REACT_APP_API_URL}/${url}/${selectedUser.id}`,
        {
          user_role_id: values.user_role_id,
          system_feature_id: values.system_feature_id,
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
              <h4>Edit Role Wise Feature</h4>
            </Modal.Header>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>User Role</label>
                    <Field
                      name="user_role_id"
                      as="select"
                      className="form-control"
                    >
                      {roles.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="col-lg-6">
                    <label>Features</label>
                    <Field
                      name="system_feature_id"
                      as="select"
                      className="form-control"
                    >
                      {systemFeature.map(({ id, feature_name }) => (
                        <option key={id} value={id}>
                          {feature_name}
                        </option>
                      ))}
                    </Field>
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

export default EditRoleWiseFeatureModal;
