import { Select } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import API from "../../helpers/devApi";
import { swalError, swalSuccess } from "../../helpers/swal";

export default function UserFeature() {
  const [userRole, setUserRole] = useState([]);
  const [userModule, setUserModule] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [menus, setMenus] = useState([]);

  // role list
  const fetchUserRole = async () => {
    await API.get(`/sys_roles`).then((res) => {
      if (res.data.success) {
        setUserRole(res.data.data.sys_roles);
      }
    });
  };

  // parent module list
  const fetchParentModule = async () => {
    await API.get(`/sys_modules`).then((res) => {
      if (res.data.success) {
        setUserModule(res.data.data.sys_modules);
      } else {
        setUserModule([]);
      }
    });
  };

  const getTreeMenu = async (roleId, moduleId) => {
    setMenus([]);
    await API.get(
      `/sys_menu_priviledge/menus?role_id=${roleId}&module_id=${moduleId}`
    ).then((res) => {
      if (res.data.success) {
        setMenus(res.data.data);
      }
    });
  };

  // onchange menus order
  const nodeInfo = async (treeNode, value) => {
    for (let i = 0; i < treeNode.length; i++) {
      if (treeNode[i].id == value.id) {
        treeNode[i].granted = !value.granted;
      }
      treeNode[i].children = getRecure(treeNode[i], value);
      treeNode[i].menu_order = i;
      treeNode[i].parent_menu = 0;
    }

    setMenus(treeNode);
  };

  // recursive
  const getRecure = (item, value) => {
    return (
      item.children &&
      item.children.length > 0 &&
      item.children.map((child, i) => {
        if (child.parent_menu != item.id) {
          child.parent_menu = item.id;
        }
        if (child?.id == value?.id) {
          child.granted = !value.granted;
        }
        child.menu_order = i;
        getRecure(child);
        return child;
      })
    );
  };

  const treeView = (list = menus) => {
    return (
      <ul>
        {list &&
          list.length > 0 &&
          list.map((item, i) => (
            <Fragment key={i}>
              <li className="d-flex align-item-center my-3">
                <input
                  type="checkbox"
                  defaultChecked={item.granted}
                  onChange={(e) => {
                    nodeInfo(menus, item);
                  }}
                  className="mr-3"
                />{" "}
                <span>
                  <h6 className="m-0">{item?.menu_name}</h6>
                </span>
              </li>
              {item.children &&
                item.children.length > 0 &&
                treeView(item.children)}
            </Fragment>
          ))}
      </ul>
    );
  };

  const treeToArr = (list, arr) => {
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i]);
      if (list[i]?.children?.length > 0) {
        treeToArr(list[i]?.children);
      }
    }
  };

  const handleSavetree = async () => {
    const arr = [];
    for (let i = 0; i < menus.length; i++) {
      arr.push(menus[i]);
      if (menus[i].children?.length > 0) {
        treeToArr(menus[i].children, arr);
      }
    }

    const data = arr.filter((item) => item.granted == true);

    for (let j = 0; j < data.length; j++) {
      data[j].menu_id = data[j].id;
      data[j].role_id = roleId;
      data[j].module_id = moduleId;
      if (data[j].parent_menu != 0) {
        const obj = arr.find((item) => item.id == data[j].parent_menu);
        data.push(obj);
      }
    }

    const uniqueObjArray = [
      ...new Map(data.map((item) => [item["id"], item])).values(),
    ];

    const payload = uniqueObjArray?.map((item) => {
      return {
        menu_id: item?.menu_id,
        module_id: item?.module_id,
        role_id: item?.role_id,
      };
    });

    await API.post(`/sys_menu_priviledge/`, payload)
      .then((res) => {
        if (res.data?.success) {
          swalSuccess();
          getTreeMenu(payload[0].role_id, payload[0].module_id);
        } else {
          swalError();
        }
      })
      .catch((error) => {
        console.log(error);
        swalError();
      });
  };

  useEffect(() => {
    fetchUserRole();
    fetchParentModule();
    if (moduleId && roleId) {
      getTreeMenu(roleId, moduleId);
    }
  }, [moduleId, roleId]);

  return (
    <div className="card card-custom gutter-b example example-compact">
      <div className="card-title">
        <h3
          className="card-label"
          style={{
            marginTop: "1.5rem",
            marginBottom: "-1rem",
            marginLeft: "60px",
          }}
        >
          Role Feature Access
        </h3>
      </div>
      <div className="card-header">
        <div className="card-body">
          <Form>
            <div className="row">
              <div className="col-md-6 mb-4">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>User Role Select</Form.Label>
                  <Form.Control
                    as="select"
                    name="role_name"
                    value={roleId}
                    onChange={(e) => {
                      setRoleId(e.target.value);
                    }}
                    className="form-control form-control-solid"
                  >
                    <option>Select Role</option>
                    {userRole.length > 0 &&
                      userRole.map((data) => (
                        <option
                          key={data.sys_roles__id}
                          value={data.sys_roles__id}
                        >
                          {data.sys_roles__role_name}
                        </option>
                      ))}
                    {userRole.length < 1 && <option>NO Data Found </option>}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Select System Module</Form.Label>
                  <Form.Control
                    as="select"
                    name="name"
                    className="form-control form-control-solid"
                    onChange={(e) => setModuleId(e.target.value)}
                  >
                    <option>Select Module </option>
                    {userModule.length > 0 &&
                      userModule.map(({ id, module_name }) => (
                        <option key={id} value={id}>
                          {module_name}
                        </option>
                      ))}
                    {userModule.length < 1 && <option>No Data found</option>}
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
          </Form>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              margin: "auto",
            }}
          >
            <div className="py-5">
              {menus && menus.length > 0 && treeView()}
            </div>
            {menus && menus.length > 0 && (
              <Form.Group as={Row}>
                <Col>
                  <Button type="button" onClick={handleSavetree}>
                    Save
                  </Button>
                </Col>
              </Form.Group>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
