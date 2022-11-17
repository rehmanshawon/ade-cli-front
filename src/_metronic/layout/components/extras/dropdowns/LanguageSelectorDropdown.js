/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import React, { useEffect } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getMenuByModule,
  getModuleList,
} from "../../../../../app/modules/Auth/redux/authCrud";
import { actions } from "../../../../../app/modules/Auth/redux/authRedux";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";

export function LanguageSelectorDropdown(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { modules } = useSelector((state) => state.auth);

  const menuType =
    localStorage.getItem("menuType") &&
    JSON.parse(localStorage.getItem("menuType"));

  const getModuleLists = async () => {
    await getModuleList().then((res) => {
      if (res.data.success) {
        dispatch(actions.modules(res?.data.data?.sys_modules));
      }
    });
  };

  useEffect(() => {
    getModuleLists();
    let menuType =
      localStorage.getItem("menuType") &&
      JSON.parse(localStorage.getItem("menuType"));
    if (menuType) {
      dispatch(actions.menuType(menuType));
    }
  }, []);

  const getMenu = async (menuType) => {
    if (menuType?.id) {
      await getMenuByModule(menuType.id).then((res) => {
        if (res.data.success) {
          dispatch(actions.menu(res?.data.data?.sys_menus));
        }
      });
    }
  };

  const handleModule = async (type, id, slug) => {
    const data = {
      type: type,
      id: id,
      slug: slug,
    };
    localStorage.setItem("menuType", JSON.stringify(data));
    dispatch(actions.menuType(data));
    await getMenu(data);
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
            {menuType?.type ?? "Select Module"}
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
