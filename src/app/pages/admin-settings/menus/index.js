import React, { useEffect, useMemo } from "react";
import SortableTree, { addNodeUnderParent } from "react-sortable-tree";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import API from "../../../helpers/devApi";
import { Field, Form, Formik } from "formik";
import { Input } from "../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import { swalConfirm, swalError, swalSuccess } from "../../../helpers/swal";
import IconModal from "./IconModal";

const _init = {
  menu_name: "",
  menu_url: "",
  menu_icon_url: "",
  menu_order: 0,
  parent_menu: 0,
  module_id: undefined,
};

const Menus = () => {
  const { menuType, modules } = useSelector((state) => state.auth);
  const [menuData, setMenuData] = useState(_init);
  const [edit, setEdit] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [parentMenu, setParentMenu] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [selected, setSelected] = useState("");
  const [values, setValues] = useState(treeData);

  const nodeInfo = (treeNode) => {
    for (let i = 0; i < treeNode.length; i++) {
      treeNode[i].children = getRecure(treeNode[i]);
    }

    console.log({ treeNode });
  };

  // recursive
  const getRecure = (item) => {
    return (
      item.children &&
      item.children.length > 0 &&
      item.children.map((child) => {
        if (child.parent_menu != item.id) {
          child.parent_menu = item.id;
        }
        getRecure(child.children);
        return child;
      })
    );
  };

  const getMenus = async () => {
    await API.get("/sys_menus").then((res) => {
      if (res.data.success) {
        setTreeData(res.data.data.sys_menus);
      }
    });
  };

  const getParentMenus = async () => {
    await API.get(`/sys_menus/${menuType.id}/0`).then((res) => {
      if (res.data.success) {
        setParentMenu(res.data.data.sys_menus);
      }
    });
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    menu_name: Yup.string().required("Name is required"),
    menu_url: Yup.string().required("URL is required"),
    // menu_icon_url: Yup.string().required("Icon is required"),
    module_id: Yup.string().required("Module is required"),
  });

  // handle save
  const handleSave = async (values, action) => {
    const payload = {
      menu_name: values.menu_name,
      menu_url: values.menu_url,
      menu_icon_url: selected ?? values.menu_icon_url,
      menu_order: 0,
      parent_menu: values.parent_menu,
      module_id: values.module_id,
    };

    if (edit && Object.keys(selectedRow).length > 0) {
      await API.patch(`/sys_menus/${selectedRow.id}`, payload)
        .then(async (res) => {
          if (res.data.success) {
            swalSuccess();
            action.resetForm();
            await getMenus();
            setEdit(false);
            setSelectedRow({});
          } else {
            swalError("something went wrong");
          }
        })
        .catch((error) => {
          console.error(error);
          swalError("something went wrong");
        });
    } else {
      await API.post("/sys_menus", payload)
        .then(async (res) => {
          if (res.data.success) {
            swalSuccess();
            action.resetForm();
            await getMenus();
            setEdit(false);
            setSelectedRow({});
          } else {
            swalError("something went wrong");
          }
        })
        .catch((error) => {
          console.error(error);
          swalError("something went wrong");
        });
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    swalConfirm().then(async (res) => {
      if (res.isConfirmed) {
        await API.delete(`/sys_menus/${id}`)
          .then(async (res) => {
            if (res.data.success) {
              swalSuccess();
              await getMenus();
              setEdit(false);
              setSelectedRow({});
            } else {
              swalError("something went wrong");
            }
          })
          .catch((error) => {
            console.error(error);
            swalError("something went wrong");
          });
      }
    });
  };

  useEffect(() => {
    getMenus();
    getParentMenus();

    if (selectedRow && Object.keys(selectedRow).length > 0) {
      setMenuData(selectedRow);
    } else {
      setMenuData(_init);
    }
  }, [selectedRow]);

  return (
    <div className="card p-5">
      <div className="row">
        <div className="col-md-6">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark d-block">
              {edit ? "Update" : "Create"} Menu
            </span>
          </h3>
          <Formik
            enableReinitialize={true}
            initialValues={menuData}
            validationSchema={validationSchema}
            onSubmit={(values, action) => {
              handleSave(values, action);
            }}
          >
            {({ handleSubmit, errors, values, setFieldValue, touched }) => (
              <Form>
                <div className="mb-3">
                  <Field
                    name="menu_name"
                    component={Input}
                    placeholder="Enter Menu Name"
                    label="Menu Name"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name="menu_url"
                    component={Input}
                    placeholder="Enter Menu URL"
                    label="Menu URL"
                  />
                </div>
                <div className="mb-3 d-flex gap-5">
                  <div className="w-100">
                    <Field
                      name="menu_icon_url"
                      component={Input}
                      value={selected ? selected : values.menu_icon_url}
                      placeholder="Enter Menu Icon URL"
                      label="Menu Icon URL"
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      setShowDetails(true);
                    }}
                    style={{
                      height: "45px",
                      width: "45px",
                      marginTop: "25px",
                      marginLeft: "25px",
                    }}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                </div>

                <div className="mb-3">
                  <label>Select Parent Menu</label>
                  <select
                    as="select"
                    name="name"
                    value={values.parent_menu}
                    className="form-control form-control-solid"
                    onChange={(e) => {
                      setFieldValue("parent_menu", e.target.value);
                    }}
                  >
                    <option>Select Menu </option>
                    {parentMenu.length > 0 &&
                      parentMenu.map(({ id, menu_name }) => (
                        <option key={id} value={id}>
                          {menu_name}
                        </option>
                      ))}
                    {parentMenu.length < 1 && <option>No Data found</option>}
                  </select>
                </div>

                <div className="mb-3">
                  <label>Select Module</label>
                  <select
                    as="select"
                    name="name"
                    className="form-control form-control-solid"
                    value={values.module_id}
                    onChange={(e) => {
                      setFieldValue("module_id", e.target.value);
                    }}
                  >
                    <option>Select Module </option>
                    {modules.length > 0 &&
                      modules.map(({ id, module_name }) => (
                        <option key={id} value={id}>
                          {module_name}
                        </option>
                      ))}
                    {modules.length < 1 && <option>No Data found</option>}
                  </select>
                  {errors.module_id && touched.module_id && (
                    <div className="text-danger">{errors.module_id}</div>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary btn-elevate mt-5"
                  >
                    {edit ? "Update" : "Save"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-md-6">
          <div style={{ height: 450 }}>
            <SortableTree
              treeData={treeData}
              maxDepth={2}
              get
              onChange={(treeData) => {
                console.log({ treeData });
                setTreeData(treeData);
                nodeInfo(treeData);
              }}
              generateNodeProps={(row) => {
                return {
                  title: row.node.menu_name,
                  subtitle: (
                    <div style={{ lineHeight: "2em" }}>{row.node.menu_url}</div>
                  ),
                  buttons: [
                    <button
                      type="button"
                      className="btn btn-icon btn-light btn-hover-primary btn-sm mr-1"
                      style={{
                        verticalAlign: "middle",
                      }}
                      onClick={() => {
                        setEdit(true);
                        setSelectedRow(row.node);
                      }}
                    >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                        <SVG
                          title="Edit"
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Write.svg"
                          )}
                        />
                      </span>
                    </button>,
                    <button
                      type="button"
                      className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                      style={{
                        verticalAlign: "middle",
                      }}
                      onClick={() => handleDelete(row.node?.id)}
                    >
                      <span className="svg-icon svg-icon-md svg-icon-danger">
                        <SVG
                          title="Delete"
                          src={toAbsoluteUrl(
                            "/media/svg/icons/General/Trash.svg"
                          )}
                        />
                      </span>
                    </button>,
                  ],
                };
              }}
            />
          </div>
          {treeData && treeData.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                //   onClick={handleSubmit}
                className="btn btn-primary btn-elevate mt-5"
              >
                Save Tree
              </button>
            </div>
          )}
        </div>
      </div>

      <IconModal
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default Menus;
