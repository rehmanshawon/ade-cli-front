/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import API from "../../../../../app/helpers/devApi";
import {
  changeMenu,
  setModules,
} from "../../../../../app/modules/Auth/redux/authReducer";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";

export function LanguageSelectorDropdown() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { menuType, modules } = useSelector((state) => state.auth);

  const getModuleList = async () => {
    await API.get("/sys_modules").then((res) => {
      if (res.data.success) {
        dispatch(setModules(res.data.data.sys_modules ?? []));
      }
    });
  };

  useEffect(() => {
    getModuleList();
  }, []);

  const handleModule = (type, id, slug) => {
    dispatch(changeMenu({ type: type, id: id, slug: slug }));
    return history.push(`/dashboard/${slug}`);
  };
  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={DropdownTopbarItemToggler}
        id="dropdown-toggle-my-cart"
      >
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="language-panel-tooltip">Select Module</Tooltip>}
        >
          <div className="btn btn-dropdown btn-lg mr-1">
            {menuType.type ?? "Select Module"}
          </div>
        </OverlayTrigger>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround">
        <ul className="navi navi-hover py-4">
          {modules &&
            modules.length > 0 &&
            modules.map((item, i) => (
              <li
                className={clsx("navi-item", {
                  active: true,
                })}
                key={i}
                onClick={() =>
                  handleModule(item.module_name, item.id, item.module_url)
                }
              >
                <a className="navi-link">
                  <span className="navi-text">{item.module_name}</span>
                </a>
              </li>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
