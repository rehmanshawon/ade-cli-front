import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { Input } from "../../../../_metronic/_partials/controls";
import API from "../../../helpers/devApi";
import slugify from "slugify";
import { useDispatch, useSelector } from "react-redux";
import { swalSuccess } from "../../../helpers/swal";
import { getMenuByModule } from "../../../modules/Auth/redux/authCrud";
import { actions } from "../../../modules/Auth/redux/authRedux";

const _init = {
  menu_name: "",
  menu_url: "",
  slug_name: "",
  slug_type: "grid",
  query_tables: [],
};

export const GridColumn = () => {
  const dispatch = useDispatch();
  const [tableList, setTableList] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableName, setTableName] = useState("");
  const { menuType } = useSelector((state) => state.auth);
  const [fieldId, setFieldId] = useState();

  // get table lists
  const getTableList = async () => {
    await API.get("/sys_tables").then((res) => {
      if (res.data?.success) {
        setTableList(res.data.data?.sys_tables);
      }
    });
  };

  // get grid data and prepared data
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
              fieldType: item?.attribute_type,
              foreignKey: item?.foreignKey == null ? false : item?.foreignKey,
              foreign_table_id: item?.foreign_table_id,
              include: true,
            };
          }),
        };
        data.push(selectedTable);
        const foreignTables = res.data?.data?.foreignTables?.map((item) => {
          return {
            tableName: item?.table_name,
            dropdownField: "",
            fieldList: item?.attributes?.map((attribute) => {
              return {
                fieldName: attribute?.attribute_name,
                columnName: attribute?.attribute_name,
                fieldType: item?.attribute_type,
                foreignKey: item?.foreignKey == null ? false : item?.foreignKey,
                foreign_table_id: item?.foreign_table_id,
                include: true,
              };
            }),
          };
        });
        foreignTables.forEach((element) => {
          data.push(element);
        });

        setFieldValue("query_tables", data);
      }
    });
  };

  // custom validation
  const validate = (values) => {
    let errors = {};

    if (!selectedTable) {
      errors.table_name = "select a table";
    }

    if (!values.menu_name || values.menu_name == "") {
      errors.menu_name = "required menu name";
    }

    if (!values.menu_url || values.menu_url == "") {
      errors.menu_url = "required menu url";
    }

    for (let i = 0; i < values?.query_tables?.length; i++) {
      if (
        (!values?.query_tables[i]?.dropdownField &&
          values?.query_tables[i]?.tableName != tableName) ||
        (values?.query_tables[i]?.dropdownField == "" &&
          values?.query_tables[i]?.tableName != tableName)
      ) {
        errors[`query_tables.${i}.dropdownField`] =
          "dropdown Label name required";
      }
      for (let j = 0; j < values?.query_tables[i]?.fieldList?.length; j++) {
        if (
          !values?.query_tables[i]?.fieldList[j]?.columnName ||
          values?.query_tables[i]?.fieldList[j]?.columnName == ""
        ) {
          errors[`query_tables.${i}.fieldList.${j}.columnName`] =
            "column name required";
        }
      }
    }

    return errors;
  };

  // handle submit grid data
  const handleSubmitData = async (values, action) => {
    const menu = {
      menu_name: values.menu_name,
      menu_url: values.menu_url,
      menu_icon_url: "",
      createMaster: true,
      module_id: menuType?.id,
    };

    // add masters data
    await API.post("/sys_masters", values).then(async (res) => {
      if (res.data?.success) {
        swalSuccess();
        // add sys menus
        await API.post("/sys_menus", menu).then(async (res) => {
          if (res.data?.success) {
            delete values.menu_name;
            delete values.menu_url;
            console.log("Menu Added");
            // callback menus
            await getMenuByModule(menuType?.id).then((res) => {
              if (res.data.success) {
                dispatch(actions.menu(res?.data?.data?.sys_menus));
              }
            });
          }
        });
        action.resetForm();
      }
    });
  };

  // initial action
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
            handleSubmitData(values, action);
          }}
        >
          {({ handleSubmit, errors, values, setFieldValue, touched }) => (
            <Form>
              <div className="row">
                <div className="col-md-4 mb-3">
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
                  {errors.table_name && (
                    <div className="text-danger">{errors.table_name}</div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <Field
                    name="menu_name"
                    component={Input}
                    placeholder="Enter Menu Name"
                    label="Menu Name"
                    value={values.menu_name ?? ""}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Field
                    name="menu_url"
                    component={Input}
                    placeholder="Enter Menu URL"
                    label="Menu URL"
                    onChange={(e) => {
                      setFieldValue("menu_url", slugify(e.target.value));
                      setFieldValue("slug_name", slugify(e.target.value));
                    }}
                    value={values.menu_url ?? ""}
                  />
                </div>
              </div>

              {values.query_tables && values.query_tables.length > 0 && (
                <Fragment>
                  {values.query_tables?.map((table, tabIndex) => (
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
                              {table?.tableName == tableName ? null : (
                                <th scope="col">Dropdown Label</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {table.fieldList &&
                              table.fieldList.length > 0 &&
                              table.fieldList.map((item, i) => (
                                <Fragment key={i}>
                                  {item?.fieldName != "id" && (
                                    <tr>
                                      <th scope="row">
                                        <Field
                                          type="checkbox"
                                          name={`query_tables.${tabIndex}.fieldList.${i}.include`}
                                        />
                                      </th>
                                      <td>{item.fieldName}</td>
                                      <td>
                                        <Field
                                          name={`query_tables.${tabIndex}.fieldList.${i}.columnName`}
                                          component={Input}
                                          placeholder="Enter Column Name"
                                          label=""
                                          value={item.columnName ?? ""}
                                        />
                                        {errors[
                                          `query_tables.${tabIndex}.fieldList.${i}.columnName`
                                        ] && (
                                          <div className="text-danger">
                                            {
                                              errors[
                                                `query_tables.${tabIndex}.fieldList.${i}.columnName`
                                              ]
                                            }
                                          </div>
                                        )}
                                      </td>

                                      {table?.tableName == tableName ? null : (
                                        <th scope="row">
                                          <label className="radio radio-rounded">
                                            <input
                                              type="radio"
                                              onClick={() => {
                                                setFieldId(i);
                                              }}
                                              onChange={(e) => {
                                                setFieldValue(
                                                  `query_tables.${tabIndex}.dropdownField`,
                                                  item?.fieldName
                                                );
                                              }}
                                              defaultChecked={
                                                table.dropdownField ==
                                                  item.fieldName && fieldId == i
                                                  ? true
                                                  : false
                                              }
                                              name={`query_tables.${tabIndex}.dropdownField`}
                                            />
                                            <span></span>
                                          </label>
                                          {errors[
                                            `query_tables.${tabIndex}.dropdownField`
                                          ] && (
                                            <div className="text-danger">
                                              {
                                                errors[
                                                  `query_tables.${tabIndex}.dropdownField`
                                                ]
                                              }
                                            </div>
                                          )}
                                        </th>
                                      )}
                                    </tr>
                                  )}
                                </Fragment>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </Fragment>
                  ))}
                </Fragment>
              )}

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

export default GridColumn;
