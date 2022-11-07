import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import API from "../../helpers/devApi";
import { useSelector } from "react-redux";
import { swalConfirm, swalError, swalSuccess } from "../../helpers/swal";
import { Select } from "antd";

const { Option } = Select;

export default function UserFeature() {
  const [userRole, setUserRole] = useState([]);
  const [userModule, setUserModule] = useState([]);
  const [userFeature, setUserFeature] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [systemFeatureId, setSystemFeatureId] = useState([]);
  const { menuType } = useSelector((state) => state.auth);

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
    if (menuType && Object.keys(menuType).length > 0) {
      await API.get(`/sys_menus/${menuType.id}/0`).then((res) => {
        if (res.data.success) {
          setUserModule(res.data.data);
        } else {
          setUserModule([]);
        }
      });
    }
  };

  // child list by parent id
  const handleModuleChange = async (e) => {
    const value = e.target.value;

    if (menuType && Object.keys(menuType).length > 0) {
      await API.get(`/sys_menus/${menuType.id}/${value}`).then((res) => {
        if (res.data.success) {
          setUserFeature(res.data.data);
        }
      });
    }
  };

  // const requiredUserRoleFields = ["id", "user_role_id", "system_feature_id"];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(menuType).length > 0) {
      const payload = {
        role_id: roleId,
        menus: systemFeatureId,
        accessible: true,
      };
      await API.post("/sys_role_menu", payload)
        .then((res) => {
          if (res.data.success) {
            swalSuccess("Successfully Added");
          } else {
            swalError("something went wrong");
          }
        })
        .catch((error) => {
          console.error(error);
          swalError("something went wrong");
        });
    } else {
      swalError("Select Module First");
    }
  };

  useEffect(() => {
    fetchUserRole();
    fetchParentModule();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
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
                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4 mb-4">
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
                              <option key={data.id} value={data.id}>
                                {data.role_name}
                              </option>
                            ))}
                          {userRole.length < 1 && (
                            <option>NO Data Found </option>
                          )}
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-md-4 mb-4">
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select System Module</Form.Label>
                        <Form.Control
                          as="select"
                          name="name"
                          className="form-control form-control-solid"
                          onChange={(e) => handleModuleChange(e)}
                        >
                          <option>Select Module </option>
                          {userModule.length > 0 &&
                            userModule.map(({ id, menu_name }) => (
                              <option key={id} value={id}>
                                {menu_name}
                              </option>
                            ))}
                          {userModule.length < 1 && (
                            <option>No Data found</option>
                          )}
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-md-4 mb-4">
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select System Features</Form.Label>

                        <Select
                          mode="multiple"
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Please select"
                          value={systemFeatureId}
                          onChange={(value) => setSystemFeatureId(value)}
                        >
                          {userFeature.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.menu_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group as={Row}>
                    <Col>
                      <Button type="submit">Save</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
