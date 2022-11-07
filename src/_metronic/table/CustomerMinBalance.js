import React from "react";
import swal from "sweetalert";
import Axios from "axios";
import { Field, Formik } from "formik";
import { Modal, Form } from "react-bootstrap";
import { Input } from "../_partials/controls";

function CustomerMinBalance(props) {
  const {
    showBalanceEdit,
    setShowBalanceEdit,
    fetchUser,
    url,
    selectedUser,
    setSelectedUser,
    accessToken,
    refreshToken,
  } = props;

  // console.log(selectedUser);
  const handleSubmitEdit = async (values) => {
    try {
      const { data } = await Axios.patch(
        `${process.env.REACT_APP_API_URL}/${url}`,
        {
          min_bal_percent: values.balance,

          customer_id: selectedUser.customer_id,
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
        setShowBalanceEdit(false);

        swal({
          title: data.message,
          icon: "success",
        });

        fetchUser();
      } else {
        swal({
          title: data.message.message,
          icon: "error",
        });
      }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
      });
    }
  };
  return (
    <Modal
      show={showBalanceEdit}
      onHide={() => setShowBalanceEdit(false)}
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
              <h4> Minimum Balance Percentage </h4>
            </Modal.Header>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                {/* Email */}
                <div className="form-group row">
                  {/* IP Address */}
                  <div className="col-lg-12">
                    <Field
                      name="balance"
                      component={Input}
                      placeholder="Minimum Balance Percentage %"
                      label="Minimum Balance Percentage"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={() => setShowBalanceEdit(false)}
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

export default CustomerMinBalance;
