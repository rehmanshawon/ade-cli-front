import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { checkIsActive } from "../../_helpers";

export default function ProfileSidebar() {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? `active` : "";
  };
  return (
    <div className="flex-row-auto offcanvas-mobile w-250px w-xxl-350px">
      <div className="card card-custom card-stretch">
        <div className="card-body pt-4">
          <div></div>
          <div></div>
          <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
            <div className="navi-item mb-2">
              <Link
                to="/profile/personal-info"
                className={`navi-link py-4 ${getMenuItemActive(
                  "/personal-info"
                )}`}
              >
                Profile Overview
              </Link>
            </div>
            <div className="navi-item mb-2">
              <Link
                to="/profile/change-password"
                className={`navi-link py-4 ${getMenuItemActive(
                  "/change-password"
                )}`}
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
