import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { menu } from "../../../../../menu";

function copy() {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };
  return (
    <div>
      <>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive("/my-page", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/my-page">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">My Page</span>
          </NavLink>
        </li> */}
        {/*end::1 Level*/}

        {/*Users Start*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/users",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/users">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Communication/Group.svg")}
              />
            </span>
            <span className="menu-text">Users</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Users</span>
                </span>
              </li>

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/users/users-list"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/users/users-list">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Users List</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/users/user-type-list"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/users/user-type-list">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">User Type List</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive("/users/add-user")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/users/add-user">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Add User</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/users/user-roles"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/users/user-roles">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">User Roles</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}
            </ul>
          </div>
        </li>
        {/*Users End*/}

        {/*Customer Start*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/customer",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/customer">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Communication/Group.svg")}
              />
            </span>
            <span className="menu-text">Customer</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/customer/customer-list"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/customer/customer-list">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Customer list</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              {/* Retail corporate customer menu hidi */}
              {/* <li
                                className={`menu-item ${getMenuItemActive(
                                    "/customer/customer-add"
                                )}`}
                                aria-haspopup="true"
                            >
                                <NavLink className="menu-link" to="/customer/customer-add">
                                    <i className="menu-bullet menu-bullet-dot">
                                        <span />
                                    </i>
                                    <span className="menu-text">
                                        Retail corporate customer add
                                    </span>
                                </NavLink>
                            </li> */}
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/customer/customer-add-corporate"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/customer/customer-add-corporate"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Customer add</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive("/customer/limit")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/customer/limit">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Limit setting</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/customer/limit-approval"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/customer/limit-approval">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Limit approval</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}
            </ul>
          </div>
        </li>
        {/*Customer End*/}

        {/*Wholesale Start*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/wholesale",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/wholesale">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Position.svg")} />
            </span>
            <span className="menu-text">Wholesale</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Wholesale</span>
                </span>
              </li>

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/wholesale/wholesale-create"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/wholesale/wholesale-create">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Create Wholesale</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/wholesale/wholesale-list"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/wholesale/wholesale-list">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Wholesale Lists</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}
              {/*begin::3 Level*/}

              <li
                className={`menu-item ${getMenuItemActive(
                  "/wholesale/unprocessed-order"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/wholesale/unprocessed-order"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>

                  <span className="menu-text">Unprocessed Orders</span>
                </NavLink>
              </li>

              {/*end::3 Level*/}
            </ul>
          </div>
        </li>
        {/*Wholesale End*/}

        {/*Bulk purchase Start*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/bulk-purchase",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/bulk-purchase">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Position.svg")} />
            </span>
            <span className="menu-text">Bulk Purchase</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Bulk Purchase</span>
                </span>
              </li>

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/bulk-purchase/create"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/bulk-purchase/create">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Create Bulk Purchase</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/bulk-purchase/list"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/bulk-purchase/list">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Bulk Purchase Lists</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}
            </ul>
          </div>
        </li>
        {/*Wholesale End*/}

        {/*Setting Start*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/user-setting",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/user-setting">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Shopping/Settings.svg")}
              />
            </span>
            <span className="menu-text">User Setting</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">User Setting</span>
                </span>
              </li>

              {/*begin::1 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/user-setting/user-type"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/user-setting/user-type">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">User Type</span>
                </NavLink>
              </li>
              {/*end::1 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/user-setting/user-role"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/user-setting/user-role">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">User Role</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::3 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/user-setting/user-feature"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/user-setting/user-feature">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Role-Feature access</span>
                </NavLink>
              </li>
              {/*end::3 Level*/}
              {/*begin::3 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/user-setting/user-feature"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/user-setting/user-test">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">test</span>
                </NavLink>
              </li>
              {/*end::3 Level*/}
              {/*begin::3 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/user-setting/role-wise-features"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/user-setting/role-wise-features"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">User Role Wise Features</span>
                </NavLink>
              </li>
              {/*end::3 Level*/}
              {/*begin::3 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/user-setting/role-wise-feature-list"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/user-setting/role-wise-feature-list"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">User Role Feature List</span>
                </NavLink>
              </li>
              {/*end::3 Level*/}
            </ul>
          </div>
        </li>
        {/*Setting End*/}

        {/*Admin Setting Start*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/admin-setting",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/admin-setting">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")}
              />
            </span>
            <span className="menu-text">Admin Setting</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Admin Setting</span>
                </span>
              </li>
              {/*begin::1 Level*/}
              {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/admin-setting/policy"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin-setting/policy">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Policy</span>
                </NavLink>
              </li> */}
              {/*end::1 Level*/}
              {/*begin::1 Level*/}
              {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/admin-setting/service-type"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin-setting/service-type">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Service Type</span>
                </NavLink>
              </li> */}
              {/*end::1 Level*/}
              {/*begin::1 Level*/}
              {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/admin-setting/store"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin-setting/store">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Store</span>
                </NavLink>
              </li> */}
              {/*end::1 Level*/}
              {/*begin::1 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/admin-setting/store"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin-setting/store">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Store</span>
                </NavLink>
              </li>
              {/*end::1 Level*/}
              {/*begin::1 Level*/}
              {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/admin-setting/hub"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin-setting/hub">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Hub</span>
                </NavLink>
              </li> */}
              {/*end::1 Level*/}
              {/*begin::1 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/admin-setting/unit"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin-setting/unit">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Unit</span>
                </NavLink>
              </li>
              {/*end::1 Level*/}

              {/*begin::1 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/admin-setting/designation"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin-setting/designation">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Designation</span>
                </NavLink>
              </li>
              {/*end::1 Level*/}

              {/*begin::1 Level*/}
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/admin-setting/wastage",
                  true
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink
                  className="menu-link menu-toggle"
                  to="/admin-setting/wastage"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Wastage</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu ">
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">
                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item  ${getMenuItemActive(
                        "/admin-setting/wastage/master"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink
                        className="menu-link"
                        to="/admin-setting/wastage/master"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Wastage Master</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/admin-setting/wastage/price-setting"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink
                        className="menu-link"
                        to="/admin-setting/wastage/price-setting"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Price Setting</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}
                  </ul>
                </div>
              </li>
              {/*end::1 Level*/}
              {/*begin::1 Level*/}
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/admin-setting/zone",
                  true
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink
                  className="menu-link menu-toggle"
                  to="/admin-setting/zone"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Zone</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu ">
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">
                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item  ${getMenuItemActive(
                        "/admin-setting/zone/zone-list"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink
                        className="menu-link"
                        to="/admin-setting/zone/zone-list"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Zone Master</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/admin-setting/zone/zone-wise-upazilla-list"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink
                        className="menu-link"
                        to="/admin-setting/zone/zone-wise-upazilla-list"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Zone Wise Upazilla</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}
                  </ul>
                </div>
              </li>
              {/*end::1 Level*/}
              {/*begin::1 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/admin-setting/location"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin-setting/location">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Location</span>
                </NavLink>
              </li>
              {/*end::1 Level*/}

              {/*Delivery Start*/}
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/admin-setting/delivery",
                  true
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink
                  className="menu-link menu-toggle"
                  to="/admin-setting/delivery"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Delivery</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu ">
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">
                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/admin-setting/delivery-charge"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink
                        className="menu-link"
                        to="/admin-setting/delivery-charge"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Delivery Charge</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/admin-setting/delivery-man"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink
                        className="menu-link"
                        to="/admin-setting/delivery-man"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Delivery Man</span>
                      </NavLink>
                    </li>

                    <li
                      className={`menu-item ${getMenuItemActive(
                        '/admin-setting/delivery-settings'
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink
                        className="menu-link"
                        to="/admin-setting/delivery-settings"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">
                          Delivery Settings
                        </span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}
                  </ul>
                </div>
              </li>
              {/*Delivery End*/}

              {/*begin::1 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/admin-setting/vehicle"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/admin-setting/vehicle">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Vehicle</span>
                </NavLink>
              </li>
              {/*end::1 Level*/}

              {/* Packagin setting Start */}
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/admin-setting/packaging",
                  true
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink
                  className="menu-link menu-toggle"
                  to="/admin-setting/packaging"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Packaging</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu ">
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">
                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/admin-setting/carton"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink className="menu-link" to="/admin-setting/carton">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Carton</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/admin-setting/packet"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink className="menu-link" to="/admin-setting/packet">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Packet</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}
                  </ul>
                </div>
              </li>
              {/* Packagin setting end */}

              {/* Inputs */}
              {/*begin::2 Level*/}
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/admin-setting/fabrication",
                  true
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink
                  className="menu-link menu-toggle"
                  to="/admin-setting/fabrication"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Fabrication</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu ">
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">
                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item  ${getMenuItemActive(
                        "/admin-setting/fabrication/fabrication-attribute"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink
                        className="menu-link"
                        to="/admin-setting/fabrication/fabrication-attribute"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Fabrication Attribute</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/admin-setting/fabrication/fabrication-model"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink
                        className="menu-link"
                        to="/admin-setting/fabrication/fabrication-model"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Fabrication Model</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/admin-setting/fabrication/model-attribute-fabrication"
                      )}`}
                      aria-haspopup="true"
                    >
                      <NavLink
                        className="menu-link"
                        to="/admin-setting/fabrication/model-attribute-fabrication"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">
                          Fabrication Model Attribute
                        </span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}
                  </ul>
                </div>
              </li>
              {/*end::2 Level*/}

              <li
                className={`menu-item ${getMenuItemActive(
                  "/admin-setting/paymentgateway"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/admin-setting/paymentgateway"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Select Payment Gateway</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        {/*Admin Setting End*/}

        {/*Order Start*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/orders",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/orders">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Position.svg")} />
            </span>
            <span className="menu-text">Orders</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Orders</span>
                </span>
              </li>

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/orders/orders-history"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/orders/orders-history">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Orders History</span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${getMenuItemActive(
                  "/orders/orders-historyb2c"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/orders/orders-historyb2c">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Orders History B2C</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/orders/date-change-request"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/orders/date-change-request">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Date Change Request</span>
                </NavLink>
              </li>

              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/orders/address-change-request"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/orders/address-change-request"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Address Change Request</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}
            </ul>
          </div>
        </li>
        {/*Order End*/}

        {/*Delivery Start*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/delivery-process",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/delivery-process">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Position.svg")} />
            </span>
            <span className="menu-text">Delivery Process</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Delivery Process</span>
                </span>
              </li>

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/delivery-process/create"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/delivery-process/create">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Create Delivery</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/delivery-process/release-delivery"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/delivery-process/release-delivery"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Create Delivery 2</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}
              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/delivery-process/received-by-secondary"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/delivery-process/received-by-secondary"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Received by secondary</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}
              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/delivery-process/distribution"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/delivery-process/distribution"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Create Shipment</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}
              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/delivery-process/shipped-batch-list"
                )}`}
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link"
                  to="/delivery-process/shipped-batch-list"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Shipped batch list</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              {/* <li
                className={`menu-item ${getMenuItemActive(
                  "/wholesale/wholesale-list"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/wholesale/wholesale-list">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Wholesale Lists</span>
                </NavLink>
              </li> */}
              {/*end::2 Level*/}
            </ul>
          </div>
        </li>
        {/*Delivery End*/}
      </>
    </div>
  );
}
