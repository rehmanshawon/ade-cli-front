/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import { Dropdown } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../_helpers";
import { useHtmlClassService } from "../../../layout";
import { DropdownMenu2 } from "../../dropdowns";
import { useSelector } from "react-redux";
import Axios from "axios";

export function MixedWidget2({ className }) {
  const {
    user: { accessToken, refreshToken },
  } = useSelector((state) => state.auth);

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_API_URL}/dashboard/adminPanelDashboardData`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          refreshToken: refreshToken,
        },
      }
    );

    if (!data.error) {
      setData(data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <>loading...</>;
  }

  return (
    <div className="row">
      <div className="col-xl-4">
        <div
          class="card card-custom bgi-no-repeat card-stretch gutter-b"
          style={{ backgroundColor: "#4AB58E" }}
        >
          <div class="card-body">
            <div className="d-flex justify-content-between">
              <span class="svg-icon svg-icon-4x svg-icon-white">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Media/Equalizer.svg")}
                ></SVG>
              </span>
              <span className="text-white font-size-h2 font-size-h2">
                Orders
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.number_of_user.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Total Orders
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div class="card card-custom bg-info bgi-no-repeat card-stretch gutter-b">
          <div class="card-body">
            <div className="d-flex justify-content-between">
              <span class="svg-icon svg-icon-4x svg-icon-white">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Group.svg"
                  )}
                ></SVG>
              </span>
              <span className="text-white font-size-h2">Customers</span>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.number_of_customer.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Total Customers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div class="card card-custom bgi-no-repeat bg-warning card-stretch gutter-b">
          <div class="card-body">
            <div className="d-flex justify-content-between">
              <span class="svg-icon svg-icon-4x svg-icon-white">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Media/Equalizer.svg")}
                ></SVG>
              </span>
              <span class="font-weight-bold text-white font-size-h2">
                Runnig Wholesale
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.running_wholesale.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Runnig
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4">
        <div class="card card-custom bgi-no-repeat bg-danger card-stretch gutter-b">
          <div class="card-body">
            <div className="d-flex justify-content-between">
              <span class="svg-icon svg-icon-4x svg-icon-white">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}
                ></SVG>
              </span>
              <span class="font-weight-bold text-white font-size-h2">
                Pending Orders
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.pending_order.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4">
        <div class="card card-custom bgi-no-repeat bg-success card-stretch gutter-b">
          <div class="card-body">
            <div className="d-flex justify-content-between">
              <span class="svg-icon svg-icon-4x svg-icon-white">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Code/Done-circle.svg")}
                ></SVG>
              </span>
              <span class="font-weight-bold text-white font-size-h2">
                Completed Wholesale
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.completed_wholesale.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4">
        <div
          class="card card-custom bgi-no-repeat card-stretch gutter-b"
          style={{ backgroundColor: "#4ab54b" }}
        >
          <div class="card-body">
            <div className="d-flex justify-content-between">
              <span class="svg-icon svg-icon-4x svg-icon-white">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Code/Error-circle.svg")}
                ></SVG>
              </span>
              <span class="font-weight-bold text-white font-size-h2">
                Completed Bulk Purchase
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.completed_bulk_purchase.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Bulk Purchase
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
