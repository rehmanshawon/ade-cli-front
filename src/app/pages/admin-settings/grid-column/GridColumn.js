import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { Input } from "../../../../_metronic/_partials/controls";
import API from "../../../helpers/devApi";

const _init = {
  queryTables: [],
};

export const GridColumn = () => {
  const [tableList, setTableList] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableName, setTableName] = useState("");

  const getTableList = async () => {
    await API.get("/sys_tables").then((res) => {
      if (res.data?.success) {
        setTableList(res.data.data?.sys_tables);
      }
    });
  };

  const getMasterGridData = async (id, setFieldValue) => {
    await API.get(`/sys_attributes/${id}`).then((res) => {
      if (res.data.success) {
        let data = [];
        const table = tableList.find((item) => item.id == id);
        setTableName(table.table_name);
        const selectedTable = {
          tableName: table?.table_name,
          fieldList: res.data?.data?.thisTable?.map((item) => {
            return {
              fieldName: item?.attribute_name,
              columnName: item?.attribute_name,
              check: false,
            };
          }),
        };
        data.push(selectedTable);
        const foreignTables = res.data?.data?.foreignTables?.map((item) => {
          return {
            tableName: item?.table_name,
            fieldList: item?.attributes?.map((attribute) => {
              return {
                fieldName: attribute?.attribute_name,
                columnName: attribute?.attribute_name,
                check: false,
              };
            }),
          };
        });
        foreignTables.forEach((element) => {
          data.push(element);
        });

        setFieldValue("queryTables", data);
      }
    });
  };

  // custom validation
  const validate = (values) => {
    let errors = {};

    for (let i = 0; i < values?.queryTables?.length; i++) {
      for (let j = 0; j < values?.queryTables[i]?.fieldList?.length; j++) {
        if (
          !values?.queryTables[i]?.fieldList[j]?.columnName ||
          values?.queryTables[i]?.fieldList[j]?.columnName == ""
        ) {
          errors[`queryTables.${i}.fieldList.${j}.columnName`] =
            "column name required";
        }
      }
    }

    return errors;
  };

  useEffect(() => {
    getTableList();
  }, []);

  return (
    <div className="card p-5">
      <div className="card-header border-0">
        <h3 className="">Grid Column</h3>
      </div>
      <div className="card-body">
        <Formik
          enableReinitialize={true}
          initialValues={_init}
          validate={validate}
          onSubmit={(values, action) => {
            // handleSubmitTable(values, action);
          }}
        >
          {({ handleSubmit, errors, values, setFieldValue, touched }) => (
            <Form>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>Select Table</label>
                  <select
                    className="form-control form-control-solid"
                    value={selectedTable ?? ""}
                    onChange={(e) => {
                      setSelectedTable(e.target.value);
                      getMasterGridData(e.target.value, setFieldValue);
                    }}
                  >
                    <option>Select</option>
                    {tableList &&
                      tableList.length > 0 &&
                      tableList.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.table_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {values.queryTables && values.queryTables.length > 0 && (
                <Fragment>
                  {values.queryTables?.map((table, tabIndex) => (
                    <Fragment key={tabIndex}>
                      <h4>
                        {table?.tableName == tableName
                          ? "This Table"
                          : table?.tableName}
                      </h4>
                      <div className="table-responsive">
                        <table className="table table-border">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Field</th>
                              <th scope="col">Column Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.fieldList &&
                              table.fieldList.length > 0 &&
                              table.fieldList.map((item, i) => (
                                <tr key={i}>
                                  <th scope="row">
                                    <Field
                                      type="checkbox"
                                      name={`queryTables.${tabIndex}.fieldList.${i}.check`}
                                    />
                                  </th>
                                  <td>{item.fieldName}</td>
                                  <td>
                                    <Field
                                      name={`queryTables.${tabIndex}.fieldList.${i}.columnName`}
                                      component={Input}
                                      placeholder="Enter Column Name"
                                      label=""
                                      value={item.columnName ?? ""}
                                    />
                                    {errors[
                                      `queryTables.${tabIndex}.fieldList.${i}.columnName`
                                    ] && (
                                      <div className="text-danger">
                                        {
                                          errors[
                                            `queryTables.${tabIndex}.fieldList.${i}.columnName`
                                          ]
                                        }
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GridColumn;
