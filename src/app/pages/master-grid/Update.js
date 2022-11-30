import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Input } from "../../../_metronic/_partials/controls";
import SelectForMasterCreate from "../../components/SelectForMasterCreate";
import API from "../../helpers/devApi";
import { swalError, swalSuccess } from "../../helpers/swal";
import * as Yup from "yup";

const Update = ({ slug_name, slug_type, id }) => {
  const [loading, setLoading] = useState(false);
  const [createAPI, setCreateAPI] = useState("");
  const [formsData, setFormsData] = useState([]);
  const [entityData, setEntityData] = useState({});

  console.log({ createAPI });

  // Validation schema
  const validationSchema = Yup.object().shape({
    role_name: Yup.string().required("Role Name is required"),
  });

  const getGridFindOne = async (getAPI, id) => {
    const res = await API.get(`${getAPI}/${id}`);
    if (res.data?.success) {
      return res.data?.data;
    }
  };

  const getGridData = async (slug_name, slug_type) => {
    setLoading(true);
    if (slug_name && slug_type) {
      await API.get(
        `/sys_masters?slug_name=${slug_name}&slug_type=${slug_type}`
      )
        .then(async (res) => {
          if (res.data?.success) {
            let createAPI = res.data?.data?.update_api?.split("v1")[1];
            let formData = res.data?.data?.update_params
              ? JSON.parse(res.data?.data?.update_params)
              : [];

            let values;
            await getGridFindOne(createAPI, id).then((res) => {
              values = res;
            });
            setFormsData(formData);

            let payload = {};
            formData.forEach((element, index) => {
              payload[element?.fieldName] = values[element?.fieldName];
            });

            setEntityData(payload);
            setCreateAPI(createAPI);
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

  const handleUpdateForm = async (values) => {
    await API.patch(`${createAPI}/${id}`, values)
      .then((res) => {
        if (res.data?.success) {
          swalSuccess(res.data?.message);
        } else {
          swalError("something went wrong");
        }
      })
      .catch((error) => {
        swalError("someting went wrong");
      });
  };

  useEffect(() => {
    getGridData(slug_name, slug_type);
  }, [slug_name, slug_type, id]);

  return (
    <div className="card p-5">
      <div className="card-header border-0 p-0 d-flex justify-content-between">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark d-block text-capitalize">
            {slug_name?.split("_")?.map((item, i) => (
              <span key={i}>{item} Update</span>
            ))}
          </span>
        </h3>
      </div>
      <div className="card-body">
        <Formik
          enableReinitialize={true}
          initialValues={entityData}
          // validationSchema={validationSchema}
          onSubmit={(values, action) => {
            handleUpdateForm(values);
          }}
        >
          {({ handleSubmit, errors, values }) => (
            <Form>
              <div className="row mb-5">
                {formsData &&
                  formsData.length > 0 &&
                  formsData.map((item, i) => (
                    <div className="col-md-6 mb-3" key={i}>
                      {!item?.foreignKey ? (
                        <Field
                          name={item?.fieldName}
                          component={Input}
                          type={item?.fieldType == "string" ? "text" : "number"}
                          placeholder={item?.fieldLabel}
                          label={item?.fieldLabel}
                        />
                      ) : (
                        <SelectForMasterCreate
                          api={item?.fieldApi}
                          label={item?.fieldLabel}
                          fieldName={item?.fieldName}
                          fieldType={item?.fieldType}
                        />
                      )}
                    </div>
                  ))}
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary btn-elevate mt-5"
              >
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Update;
