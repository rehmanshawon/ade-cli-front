/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";

export function MixedWidget1({ className, data }) {
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
                  {data.totalOrder.quantity.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Total Orders
                </span>
              </div>
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.totalOrder.orderItemQty.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Total Products
                </span>
              </div>
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  TK {Math.round(data.totalOrder.amount).toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Total Amount
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
                  {data.numberOfCustomer.toLocaleString()}
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
                Pending Orders
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.pendingOrder.quantity.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Pending
                </span>
              </div>
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  TK {Math.round(data.pendingOrder.amount).toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Pending Amount
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4">
        <div class="card card-custom bgi-no-repeat bg-dark card-stretch gutter-b">
          <div class="card-body">
            <div className="d-flex justify-content-between">
              <span class="svg-icon svg-icon-4x svg-icon-white">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}
                ></SVG>
              </span>
              <span class="font-weight-bold text-white font-size-h2">
                Shipped Orders
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.shippedOrder.quantity.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Shipped
                </span>
              </div>
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  TK {Math.round(data.shippedOrder.amount).toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Shipped Amount
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
                Delivered Orders
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.deliveredOrder.quantity.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Delivered
                </span>
              </div>
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  TK {Math.round(data.deliveredOrder.amount).toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Delivered Amount
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
                  src={toAbsoluteUrl("/media/svg/icons/Code/Error-circle.svg")}
                ></SVG>
              </span>
              <span class="font-weight-bold text-white font-size-h2">
                Cancelled Orders
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  {data.canceledOrder.quantity.toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Cancelled
                </span>
              </div>
              <div>
                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">
                  TK {Math.round(data.canceledOrder.amount).toLocaleString()}
                </span>
                <span class="font-weight-bold text-white font-size-sm">
                  Cancelled Amount
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
