import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByToken,
  updateProfile,
} from "../../modules/Auth/redux/authCrud";
import { swalError, swalSuccess } from "../../helpers/swal";
import { actions } from "../../modules/Auth/redux/authRedux";

const _init = {
  user_name: "",
  email: "",
};

const EditProfile = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(_init);
  const { user } = useSelector((state) => state.auth);

  // Validation schema
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("Name is required"),
  });

  const handleUpdate = async (values) => {
    delete values.email;
    await updateProfile(user.id, values)
      .then(async (res) => {
        if (res.data.success) {
          const { data } = await getUserByToken(user.id);

          if (data.success) {
            localStorage.setItem("user", JSON.stringify(data?.data));
            dispatch(actions.fulfillUser(data?.data));
          }
          swalSuccess("Profile Updated");
        } else {
          swalError("something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user && user !== undefined && Object.keys(user).length > 0) {
      setUserData(() => ({
        user_name: user.user_name,
        email: user.email,
      }));
    }
  }, [user]);

  return (
    <div className="card border-0">
      <div className="card-body border-0">
        <Formik
          enableReinitialize={true}
          initialValues={userData}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdate(values);
          }}
        >
          {({ handleSubmit, errors, values, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <Field
                    name="user_name"
                    component={Input}
                    placeholder="Enter User Name"
                    label="User Name"
                    value={values.user_name ?? ""}
                  />
                </div>
                <div className="col-md-8 mb-3">
                  <Field
                    name="email"
                    component={Input}
                    disabled
                    placeholder="Enter Email"
                    label="Email"
                    value={values.email ?? ""}
                  />
                </div>
              </div>

              <div className="card-footer m-0 mt-5 p-0 pt-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary btn-elevate"
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
