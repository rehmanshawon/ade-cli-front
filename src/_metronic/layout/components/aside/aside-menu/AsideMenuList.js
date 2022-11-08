/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import SVG from "react-inlinesvg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import API from "../../../../../app/helpers/devApi";
import { setMenu } from "../../../../../app/modules/Auth/redux/authReducer";
import { checkIsActive, toAbsoluteUrl } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };
  const { menu, menuType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getMenu = async (menuType) => {
    await API.get(`/sys_menus?field=module_id&search=${menuType}`).then(
      (res) => {
        if (res.data.success) {
          dispatch(setMenu(res.data.data.sys_menus ?? []));
        }
      }
    );
  };

  useEffect(() => {
    getMenu(menuType.id);
  }, [menuType.id]);

  const renderMenuItem = (item) => {
    const { menu_name, menu_url, children, menu_icon_url, id, ...rest } = item;

    if (item.children.length > 0) {
      return (
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            `/${menu_url}`,
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
          key={id}
        >
          <NavLink className="menu-link menu-toggle" to={`/${menu_url}` ?? "#"}>
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl(menu_icon_url)} />
            </span>
            <span className="menu-text">{menu_name}</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">{menu_name}</span>
                </span>
              </li>

              {/*begin::2 Level*/}
              {item.children?.map((submenu) => renderMenuItem(submenu))}
              {/*end::2 Level*/}
            </ul>
          </div>
        </li>
      );
    }

    return (
      <li
        className={`menu-item ${getMenuItemActive(`/${menu_url}`, false)}`}
        aria-haspopup="true"
        key={id}
      >
        <NavLink className="menu-link" to={`/${menu_url}`}>
          <span className="svg-icon menu-icon">
            {menu_icon_url ? (
              <i className={menu_icon_url}>
                <span />
              </i>
            ) : (
              <i className="menu-bullet menu-bullet-dot">
                <span />
              </i>
            )}
          </span>
          <span className="menu-text">{menu_name}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <>
      {/* begin::Menu Nav */}

      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {menu.map((menu, i) => renderMenuItem(menu))}
      </ul>
    </>
  );
}
