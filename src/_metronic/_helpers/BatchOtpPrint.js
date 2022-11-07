import React, { useRef } from "react";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";
import { Empty } from "antd";

export default function BatchOtpPrint({ otpData, batchCode, title }) {
  const Styles = styled.div`
    padding: 1rem;
    padding-left: 0;
    padding-right: 0;

    table {
      width: 100%;
      border-spacing: 0;

      tr td {
        border: 1px solid black;
      }

      tr.noBorder td {
        border: 0;
      }

      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        border: 1px solid black;
      }
    }
  `;

  // print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className="card px-5 pb-5">
        <div className="container">
          {otpData.length ? (
            <div className="row">
              <button
                className="btn btn-warning"
                onClick={handlePrint}
                style={{
                  position: "absolute",
                  right: "40px",
                  top: "40px",
                  zIndex: "5",
                }}
              >
                <i className="fas fa-print"></i> Print This Page
              </button>
              <div className="col-12" ref={componentRef}>
                <div className="mt-5" style={{ position: "relative" }}>
                  <img
                    id="logo_bengal"
                    src="/media/logos/apsis-logo.png"
                    className="img-fluid"
                    style={{ position: "absolute", height: "100px" }}
                    alt="logo"
                  />
                  <h1
                    style={{ textAlign: "center", paddingTop: "15px" }}
                    className=" align-items-start flex-column"
                  >
                    <b>{title}</b>
                  </h1>
                </div>
                <h3
                  style={{ textAlign: "center" }}
                  className="card-title align-items-start flex-column mb-5"
                >
                  <b>(Batch Code: {batchCode})</b>
                </h3>

                {
                  <div className="card-body p-0">
                    <div className="tab-content mt-5 pt-5">
                      <div className="table-responsive">
                        <div className="table-div">
                          <Styles>
                            <table>
                              <thead>
                                <tr>
                                  <th>Order Code</th>
                                  <th>OTP</th>
                                  <th>Customer Name</th>
                                  <th>Phone</th>
                                  <th>Order Time</th>
                                  <th>Address</th>
                                  {/* <th>Net Payable Amount (BDT)</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {otpData.length
                                  ? otpData.map((data) => (
                                      <tr>
                                        <td>{data.order_code}</td>
                                        <td>{data.otp}</td>
                                        <td>{data.customer_name}</td>
                                        <td>{data.customer_phone}</td>
                                        <td>
                                          {new Date(
                                            data.order_at
                                          ).toLocaleDateString()}
                                        </td>
                                        <td>
                                          {data.shippingAddress.house_no},{" "}
                                          {data.shippingAddress.road_no},{" "}
                                          {data.shippingAddress.area},{" "}
                                          {data.shippingAddress.city},{" "}
                                          {data.shippingAddress.postcode}
                                        </td>
                                      </tr>
                                    ))
                                  : ""}
                              </tbody>
                            </table>
                          </Styles>
                        </div>
                      </div>
                    </div>
                  </div>
                }

                <div className="">
                  <div style={{ paddingTop: "5%", float: "left" }}>
                    <p>__________________________</p>
                    <tag style={{ textAlign: "centre" }}>
                      Authorized Signature
                    </tag>{" "}
                  </div>

                  <div style={{ paddingTop: "5%", float: "right" }}>
                    {" "}
                    <p>__________________________</p>
                    <tag style={{ textAlign: "centre" }}>
                      Customer Signature
                    </tag>{" "}
                  </div>
                </div>
                <br />
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
}
