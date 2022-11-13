import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "../../../../_metronic/_partials/controls";
import API from "../../../helpers/devApi";
import { TagsInput } from "react-tag-input-component";
import { swalConfirm, swalSuccess } from "../../../helpers/swal";

const _init = {
  tableName: "sys_role_table",
  createCrud: false,
  fieldList: [
    {
      field: "name",
      type: "string",
      unique: true,
      optional: false,
      foreignKey: false,
    },
    {
      field: "role_id",
      type: "number",
      unique: false,
      optional: true,
      foreignKey: true,
      reference: {
        relation: "1:N",
        left_table_key: "role_id",
        right_table_key: "id",
        left_table: "sys_role_table",
        right_table: "sys_roles",
      },
    },
    {
      field: "access_type",
      type: "string",
      optional: false,
      isEnum: true,
      enum: {
        enumValues: ["All", "Create", "Read", "Update", "Delete", "None"],
        enumName: "privilege",
      },
    },
  ],
};

const CreateTable = () => {
  const [tableList, setTableList] = useState([]);

  const getTableList = async () => {
    await API.get("/sys_tables")
      .then((res) => {
        if (res.data?.success) {
          setTableList(res.data?.data?.sys_tables);
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
          // validationSchema={}
          onSubmit={(values, action) => {
            console.log({ values });
          }}
        >
          {({ handleSubmit, errors, values, setFieldValue }) => (
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
                        ) : (
                          <Field
                            name={`field`}
                            component={Input}
                            onChange={(e) => {
                              setFieldValue(
                                `fieldList.${i}.field`,
                                e.target.value
                              );
                            }}
                            placeholder="Enter Field Name"
                            label="Field Name"
                            value={field.field ?? ""}
                          />
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
                      </div>

                      <div className="col-md-12">
                        <div className="form-group pt-5">
                          <div className="checkbox-inline">
                            <label className="checkbox checkbox-rounded">
                              <input
                                type="checkbox"
                                checked={field.unique}
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
                                checked={field.optional}
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
                                checked={field.foreignKey}
                                name="foreignKey"
                                onChange={(e) => {
                                  setFieldValue(
                                    `fieldList.${i}.foreignKey`,
                                    e.target.checked
                                  );
                                }}
                              />
                              <span></span>
                              Foreign Key
                            </label>
                            <label className="checkbox checkbox-rounded">
                              <input
                                type="checkbox"
                                checked={field.isEnum}
                                name="isEnum"
                                onChange={(e) => {
                                  setFieldValue(
                                    `fieldList.${i}.isEnum`,
                                    e.target.checked
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
                                `fieldList.${i}.reference.left_table_key`,
                                `${e.target.value}_id`
                              );
                              setFieldValue(
                                `fieldList.${i}.field`,
                                `${e.target.value}_id`
                              );

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
                                <option key={i} value={item.table_name}>
                                  {item.table_name}
                                </option>
                              ))}
                          </select>
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
                        </div>
                      )}
                    </div>
                    <div className="d-flex g-3">
                      <button
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
