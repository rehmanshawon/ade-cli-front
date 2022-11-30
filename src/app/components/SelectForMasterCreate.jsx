import { Field } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import API from "../helpers/devApi";

const SelectForMasterCreate = ({ label, api, fieldName, fieldType }) => {
  const [lists, setLists] = useState([]);

  const getEntityList = async () => {
    const serverAPI = api?.split("v1")[1];
    await API.get(`${serverAPI}&isDropDown=true`).then((res) => {
      let payload = [];
      let obj = Object.keys(res.data?.data)?.forEach((key, index) => {
        if (typeof res.data?.data[key] == "object") {
          payload = res.data?.data[key];
        }
      });
      const data = payload.map((item) => {
        return {
          value: item?.id,
          label: item?.label,
        };
      });
      setLists(data);
    });
  };

  useEffect(() => {
    getEntityList();
  }, []);

  return (
    <div>
      <label>Select {label}</label>
      <Field
        as="select"
        name={fieldName}
        className="form-control input-group input-group-solid"
        label={label}
      >
        <option value="">Select</option>
        {lists &&
          lists.length > 0 &&
          lists.map((item, i) => (
            <option key={i} value={item?.value}>
              {item?.label}
            </option>
          ))}
      </Field>
    </div>
  );
};

export default SelectForMasterCreate;
