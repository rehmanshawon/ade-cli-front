import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "../../../../_metronic/_partials/controls";
import API from "../../../helpers/devApi";
import { TagsInput } from "react-tag-input-component";
import { swalConfirm, swalError, swalSuccess } from "../../../helpers/swal";
import isVarName from "is-var-name";

const _init = {
  tableName: "",
  createCrud: false,
  fieldList: [
    {
      field: "",
      type: "",
      unique: false,
      optional: false,
      foreignKey: false,
      isEnum: false,
      reference: {
        relation: "1:N",
        left_table_key: "",
        right_table_key: "id",
        left_table: "",
        right_table: "",
      },
      enum: {
        enumValues: [],
        enumName: "privilege",
      },
    },
  ],
};

const CreateTable = () => {
  const [tableList, setTableList] = useState([]);

  const getTableList = async () => {
    await API.get("/masterdata")
      .then((res) => {
        if (res.data?.success) {
          setTableList(res.data?.data?.tables);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (values, index, setFieldValue) => {
    swalConfirm(
      "You won't be able to revert this!",
      "Are you sure?",
      "Yes, delete it!"
    ).then((result) => {
      if (result.isConfirmed) {
        const fieldList = [...values.fieldList];
        fieldList.splice(index, 1);
        setFieldValue("fieldList", fieldList);
        swalSuccess("Your field has been deleted.");
      }
    });
  };

  // handle submit table data
  const handleSubmitTable = async (values, actions) => {
    for (let i = 0; i < values.fieldList?.length; i++) {
      if (!values?.fieldList[i]?.foreignKey) {
        delete values?.fieldList[i]?.reference;
      }
      if (!values?.fieldList[i]?.isEnum) {
        delete values?.fieldList[i]?.enum;
      }
    }

    await API.post("/masterdata", values)
      .then(async (res) => {
        if (res.data?.success) {
          await getTableList();
          actions.resetForm();
          swalSuccess("Created Table");
        } else {
          swalError("something went wrong");
        }
      })
      .catch((error) => {
        swalError("something went wrong");
      });
  };

  // custom validation
  const validate = (values) => {
    let errors = {};

    if (!values.tableName) {
      errors.tableName = "table name Cannot be blank";
    } else if (!isVarName(values.tableName)) {
      errors.tableName = "table name must be match with variable";
    }

    if (values.fieldList?.length == 0) {
      errors.fieldList = "minimum 1 field required";
    }

    for (let i = 0; i < values?.fieldList?.length; i++) {
      if (!values?.fieldList[i]?.field) {
        errors[`fieldList.${i}.field`] = "field name required";
      }
      if (!values?.fieldList[i]?.type) {
        errors[`fieldList.${i}.type`] = "field type required";
      }

      if (values?.fieldList[i]?.foreignKey) {
        if (!values?.fieldList[i]?.reference?.right_table) {
          errors[`fieldList.${i}.reference.right_table`] =
            "right table required";
        }
      }
      if (values?.fieldList[i]?.isEnum) {
        if (values?.fieldList[i]?.enum?.enumValues?.length == 0) {
          errors[`fieldList.${i}.enum.enumValues`] = "field required";
        }
      }
    }

    return errors;
  };

  useEffect(() => {
    getTableList();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="">Create Table</h3>
      </div>
      <div className="card-body">
        <Formik
          enableReinitialize={true}
          initialValues={_init}
          validate={validate}
          onSubmit={(values, action) => {
            handleSubmitTable(values, action);
          }}
        >
          {({ handleSubmit, errors, values, setFieldValue, touched }) => (
            <Form>
              <Field
                name="tableName"
                component={Input}
                placeholder="Enter Table Name"
                label="Table Name"
                value={values.tableName ?? ""}
              />

              <div className="row p-5">
                {values.fieldList?.map((field, i, row) => (
                  <div className="col-md-12 mb-5" key={i}>
                    <div className="row p-5 border mb-3">
                      <div className="col-md-6">
                        {field.foreignKey ? (
                          <div>
                            <Field
                              name={`field`}
                              component={Input}
                              disabled
                              onChange={(e) => {
                                setFieldValue(
                                  `fieldList.${i}.reference.left_table_key`,
                                  e.target.value
                                );
                              }}
                              placeholder="Enter Field Name"
                              label="Field Name"
                              value={field.reference?.left_table_key ?? ""}
                            />
                            {errors.field && (
                              <div className="text-danger">{errors.field}</div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <Field
                              name={`field`}
                              component={Input}
                              onChange={(e) => {
                                setFieldValue(
                                  `fieldList.${i}.field`,
                                  e.target.value
                                );

                                setFieldValue(
                                  `fieldList.${i}.reference.left_table`,
                                  e.target.value
                                );
                              }}
                              placeholder="Enter Field Name"
                              label="Field Name"
                              value={field.field ?? ""}
                            />
                            {errors[`fieldList.${i}.field`] && (
                              <div className="text-danger">
                                {errors[`fieldList.${i}.field`]}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Select Type</label>
                        <select
                          className="form-control form-control-solid"
                          value={field.type ?? ""}
                          onChange={(e) =>
                            setFieldValue(`fieldList.${i}.type`, e.target.value)
                          }
                        >
                          <option>Select</option>
                          {["string", "number"].map((item, i) => (
                            <option key={i} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        {errors[`fieldList.${i}.type`] && (
                          <div className="text-danger">
                            {errors[`fieldList.${i}.type`]}
                          </div>
                        )}
                      </div>

                      <div className="col-md-12">
                        <div className="form-group pt-5">
                          <div className="checkbox-inline">
                            <label className="checkbox checkbox-rounded">
                              <input
                                type="checkbox"
                                checked={field.unique ?? false}
                                name="unique"
                                onChange={(e) => {
                                  setFieldValue(
                                    `fieldList.${i}.unique`,
                                    e.target.checked
                                  );
                                }}
                              />
                              <span></span>
                              Unique
                            </label>
                            <label className="checkbox checkbox-rounded">
                              <input
                                type="checkbox"
                                checked={field.optional ?? false}
                                name="optional"
                                onChange={(e) => {
                                  setFieldValue(
                                    `fieldList.${i}.optional`,
                                    e.target.checked
                                  );
                                }}
                              />
                              <span></span>
                              Optional
                            </label>
                            <label className="checkbox checkbox-rounded">
                              <input
                                type="checkbox"
                                checked={field.foreignKey ?? false}
                                name="foreignKey"
                                onChange={(e) => {
                                  setFieldValue(
                                    `fieldList.${i}.foreignKey`,
                                    e.target.checked
                                  );

                                  setFieldValue(`fieldList.${i}.isEnum`, false);

                                  setFieldValue(
                                    `fieldList.${i}.enum.enumValues`,
                                    []
                                  );
                                }}
                              />
                              <span></span>
                              Foreign Key
                            </label>
                            <label className="checkbox checkbox-rounded">
                              <input
                                type="checkbox"
                                checked={field.isEnum ?? false}
                                name="isEnum"
                                onChange={(e) => {
                                  setFieldValue(
                                    `fieldList.${i}.isEnum`,
                                    e.target.checked
                                  );

                                  setFieldValue(
                                    `fieldList.${i}.foreignKey`,
                                    false
                                  );
                                }}
                              />
                              <span></span>
                              Enum
                            </label>
                          </div>
                        </div>
                      </div>

                      {field.foreignKey && (
                        <div className="col-md-3">
                          <label>Select Table</label>
                          <select
                            className="form-control form-control-solid"
                            value={field.reference?.right_table ?? ""}
                            onChange={(e) => {
                              setFieldValue(
                                `fieldList.${i}.reference.left_table`,
                                values.tableName
                              );

                              setFieldValue(
                                `fieldList.${i}.reference.left_table_key`,
                                `${e.target.value}_id`
                              );
                              setFieldValue(
                                `fieldList.${i}.field`,
                                `${e.target.value}_id`
                              );

                              setFieldValue(`fieldList.${i}.type`, `number`);

                              setFieldValue(
                                `fieldList.${i}.reference.right_table`,
                                e.target.value
                              );
                            }}
                          >
                            <option>Select</option>
                            {tableList &&
                              tableList.length > 0 &&
                              tableList.map((item, i) => (
                                <option key={i} value={item}>
                                  {item}
                                </option>
                              ))}
                          </select>
                          {errors[`fieldList.${i}.reference.right_table`] && (
                            <div className="text-danger">
                              {errors[`fieldList.${i}.reference.right_table`]}
                            </div>
                          )}
                        </div>
                      )}

                      {field.isEnum && (
                        <div className="col-md-12">
                          <TagsInput
                            value={field.enum?.enumValues ?? []}
                            onChange={(value) => {
                              setFieldValue(
                                `fieldList.${i}.enum.enumValues`,
                                value
                              );
                            }}
                            name="enumValues"
                            placeHolder="enter enum values"
                          />
                          <em>press enter to add new enum</em>
                          {errors[`fieldList.${i}.enum.enumValues`] && (
                            <div className="text-danger">
                              {errors[`fieldList.${i}.enum.enumValues`]}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="d-flex g-3">
                      <button
                        type="button"
                        disabled={row.length == 1 ? true : false}
                        className="btn btn-danger mr-2"
                        onClick={() => {
                          handleRemoveClick(values, i, setFieldValue);
                        }}
                      >
                        Remove
                      </button>
                      {row.length - 1 == i && (
                        <button
                          className="btn btn-success ml-2"
                          type="button"
                          onClick={() => {
                            setFieldValue(
                              `fieldList.${values.fieldList.length}`,
                              {
                                field: "",
                                type: "",
                                unique: false,
                                optional: false,
                                foreignKey: false,
                                isEnum: false,
                                reference: {
                                  relation: "1:N",
                                  left_table_key: "",
                                  right_table_key: "id",
                                  left_table: "",
                                  right_table: "",
                                },
                                enum: {
                                  enumValues: [],
                                  enumName: "privilege",
                                },
                              }
                            );
                          }}
                        >
                          Add More
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-md-12">
                <div className="form-group pt-5">
                  <div className="checkbox-inline">
                    <label className="checkbox checkbox-rounded">
                      <input
                        type="checkbox"
                        checked={values.createCrud}
                        name="createCrud"
                        onChange={(e) => {
                          setFieldValue(`createCrud`, e.target.checked);
                        }}
                      />
                      <span></span>
                      Create CRUD (Create, Read, Update, Delete)
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary btn-elevate"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTable;
