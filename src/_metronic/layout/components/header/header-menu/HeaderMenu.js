/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/dashboard"
          )}`}
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="menu-text">Dashboard</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
          className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
            "/location"
          )}`}
        >
          <NavLink className="menu-link menu-toggle" to="/location">
            <span className="menu-text">Location</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="menu-submenu menu-submenu-classic menu-submenu-left">
            <ul className="menu-subnav">
              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/location/location-list"
                )}`}
              >
                <NavLink className="menu-link" to="/location/location-list">
                  <span className="menu-text">Location List</span>
                </NavLink>
              </li>
              {/*end::3 Level*/}
              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/location/add-location"
                )}`}
              >
                <NavLink className="menu-link" to="/location/add-location">
                  <span className="menu-text">Add Location</span>
                </NavLink>
              </li>
              {/*end::3 Level*/}
            </ul>
          </div>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
          className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
            "/users"
          )}`}
        >
          <NavLink className="menu-link menu-toggle" to="/users">
            <span className="menu-text">Users</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="menu-submenu menu-submenu-classic menu-submenu-left">
            <ul className="menu-subnav">
              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/users/users-list"
                )}`}
              >
                <NavLink className="menu-link" to="/users/users-list">
                  <span className="menu-text">Users List</span>
                </NavLink>
              </li>
              {/*end::3 Level*/}
              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive(
                  "/users/user-type-list"
                )}`}
              >
                <NavLink className="menu-link" to="/users/user-type-list">
                  <span className="menu-text">User Type List</span>
                </NavLink>
              </li>
              {/*end::3 Level*/}
              {/*begin::2 Level*/}
              <li
                className={`menu-item ${getMenuItemActive("/users/add-user")}`}
              >
                <NavLink className="menu-link" to="/users/add-user">
                  <span className="menu-text">Add User</span>
                </NavLink>
              </li>
              <li
                className={`menu-item ${getMenuItemActive(
                  "/users/user-roles"
                )}`}
              >
                <NavLink className="menu-link" to="/users/user-roles">
                  <span className="menu-text">User Roles</span>
                </NavLink>
              </li>
              {/*end::3 Level*/}
            </ul>
          </div>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
          className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
            "/documents"
          )}`}
        >
          <NavLink className="menu-link menu-toggle" to="/documents">
            <span className="menu-text">Documents Verification</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="menu-submenu menu-submenu-classic menu-submenu-left">
            <ul className="menu-subnav">
              <li
                className={`menu-item ${getMenuItemActive(
                  "/documents/documents-list"
                )}`}
              >
                <NavLink className="menu-link" to="/documents/documents-list">
                  <span className="menu-text">Documents List</span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${getMenuItemActive(
                  "/documents/verification-unit"
                )}`}
              >
                <NavLink
                  className="menu-link"
                  to="/documents/verification-unit"
                >
                  <span className="menu-text">Add Verification Unit</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
          className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
            "/orders"
          )}`}
        >
          <NavLink className="menu-link menu-toggle" to="/orders">
            <span className="menu-text">Orders</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="menu-submenu menu-submenu-classic menu-submenu-left">
            <ul className="menu-subnav">
              <li
                className={`menu-item ${getMenuItemActive(
                  "/orders/order-list"
                )}`}
              >
                <NavLink className="menu-link" to="/orders/order-list">
                  <span className="menu-text">Order List</span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${getMenuItemActive(
                  "/orders/add-custom-order"
                )}`}
              >
                <NavLink className="menu-link" to="/orders/add-custom-order">
                  <span className="menu-text">Add Custom Order</span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${getMenuItemActive(
                  "/orders/payment-gateway"
                )}`}
              >
                <NavLink className="menu-link" to="/orders/payment-gateway">
                  <span className="menu-text">Payment Gateway</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
          className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
            "/products"
          )}`}
        >
          <NavLink className="menu-link menu-toggle" to="/products">
            <span className="menu-text">Products</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="menu-submenu menu-submenu-classic menu-submenu-left">
            <ul className="menu-subnav">
              <li
                className={`menu-item ${getMenuItemActive(
                  "/products/products-list"
                )}`}
              >
                <NavLink className="menu-link" to="/products/products-list">
                  <span className="menu-text">Products List</span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${getMenuItemActive(
                  "/products/add-product"
                )}`}
              >
                <NavLink className="menu-link" to="/products/add-product">
                  <span className="menu-text">Add Product</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
          className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
            "/bidding"
          )}`}
        >
          <NavLink className="menu-link menu-toggle" to="/bidding">
            <span className="menu-text">Bidding</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="menu-submenu menu-submenu-classic menu-submenu-left">
            <ul className="menu-subnav">
              <li
                className={`menu-item ${getMenuItemActive(
                  "/bidding/bid-campaign"
                )}`}
              >
                <NavLink className="menu-link" to="/bidding/bid-campaign">
                  <span className="menu-text">Bid Campaign</span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${getMenuItemActive(
                  "/bidding/create-campaign"
                )}`}
              >
                <NavLink className="menu-link" to="/bidding/create-campaign">
                  <span className="menu-text">Create Campaign</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
          className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
            "/delivery"
          )}`}
        >
          <NavLink className="menu-link menu-toggle" to="/delivery">
            <span className="menu-text">Delivery</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="menu-submenu menu-submenu-classic menu-submenu-left">
            <ul className="menu-subnav">
              <li
                className={`menu-item ${getMenuItemActive(
                  "/delivery/delivery-list"
                )}`}
              >
                <NavLink className="menu-link" to="/delivery/delivery-list">
                  <span className="menu-text">Delivery List</span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${getMenuItemActive(
                  "/delivery/add-delivery"
                )}`}
              >
                <NavLink className="menu-link" to="/delivery/add-delivery">
                  <span className="menu-text">Add New Delivery</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        {/*end::1 Level*/}
      </ul>
      {/*end::Header Nav*/}
    </div>
  );
}
